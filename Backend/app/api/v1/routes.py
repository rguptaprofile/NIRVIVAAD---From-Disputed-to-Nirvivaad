from datetime import datetime,timezone
from pathlib import Path
from uuid import uuid4
from bson import ObjectId
from fastapi import APIRouter,BackgroundTasks,Depends,File,Form,HTTPException,UploadFile
from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer
from ...core.config import settings
from ...core.security import create_access_token,decode_access_token,hash_password,verify_password
from ...db.mongo import get_database
from ...schemas import LoginRequest,RegisterRequest,VerificationDecision
from ...services import audit,now,process_document
router=APIRouter();bearer=HTTPBearer(auto_error=False)
def db():return get_database()
def serial(x):
 if isinstance(x,ObjectId):return str(x)
 if isinstance(x,datetime):return x.isoformat()
 if isinstance(x,list):return [serial(i) for i in x]
 if isinstance(x,dict):return {k:serial(v) for k,v in x.items() if k!='password_hash'}
 return x
def user(c:HTTPAuthorizationCredentials=Depends(bearer)):
 if not c:raise HTTPException(401,'Authentication required')
 try:u=db().users.find_one({'_id':ObjectId(decode_access_token(c.credentials)['sub'])})
 except Exception:raise HTTPException(401,'Invalid access token')
 if not u or not u.get('active',True):raise HTTPException(401,'User unavailable')
 return u
def role(*allowed):
 def check(u=Depends(user)):
  if u['role'] not in allowed:raise HTTPException(403,'Insufficient role permission')
  return u
 return check
@router.get('/health')
def health():
 try:db().command('ping');database='connected'
 except Exception:database='unavailable'
 return {'status':'ok','database':database}
@router.post('/auth/register',status_code=201)
def register(p:RegisterRequest):
 if db().users.find_one({'email':p.email.lower()}):raise HTTPException(409,'Email already registered')
 if p.role=='admin' and (not settings.admin_signup_code or p.admin_code!=settings.admin_signup_code):raise HTTPException(403,'A valid administrator invite code is required')
 user_role='admin' if p.role=='admin' else 'operator'
 u={'name':p.name,'email':p.email.lower(),'password_hash':hash_password(p.password),'role':user_role,'active':True,'created_at':now()};r=db().users.insert_one(u);audit(db(),str(r.inserted_id),'user_registered',str(r.inserted_id),{'role':user_role});return {'access_token':create_access_token(str(r.inserted_id)),'user':serial({**u,'_id':r.inserted_id})}
@router.post('/auth/login')
def login(p:LoginRequest):
 u=db().users.find_one({'email':p.email.lower()})
 if not u or not verify_password(p.password,u['password_hash']):raise HTTPException(401,'Incorrect email or password')
 if p.role=='admin' and u.get('role')!='admin':raise HTTPException(403,'This account does not have administrator access')
 audit(db(),str(u['_id']),'user_logged_in',str(u['_id']))
 return {'access_token':create_access_token(str(u['_id'])),'user':serial(u)}
@router.get('/auth/me')
def me(u=Depends(user)):return {'user':serial(u)}
@router.get('/admin/users')
def admin_users(u=Depends(role('admin'))):
 return serial(list(db().users.find({}, {'password_hash':0}).sort('created_at',-1).limit(200)))
@router.post('/documents/upload',status_code=201)
async def upload(background:BackgroundTasks,files:list[UploadFile]=File(...),languages:str=Form('English'),u=Depends(role('admin','officer','operator'))):
 if len(files)>20:raise HTTPException(422,'Maximum 20 files per batch')
 allowed={'.pdf','.tif','.tiff','.jpg','.jpeg','.png'};root=Path(settings.upload_dir);root.mkdir(parents=True,exist_ok=True);out=[]
 for f in files:
  ext=Path(f.filename or '').suffix.lower()
  if ext not in allowed:raise HTTPException(415,f'Unsupported file: {f.filename}')
  did='DOC-'+uuid4().hex[:12].upper();target=root/f'{did}{ext}';content=await f.read()
  if len(content)>25*1024*1024:raise HTTPException(413,'Each file must be 25 MB or smaller')
  target.write_bytes(content);doc={'document_id':did,'original_name':f.filename,'storage_path':str(target),'content_type':f.content_type,'size_bytes':len(content),'languages':[x.strip() for x in languages.split(',') if x.strip()],'status':'queued','uploaded_by':str(u['_id']),'created_at':now()};db().documents.insert_one(doc);audit(db,did,'document_uploaded',str(u['_id']),{'filename':f.filename});background.add_task(process_document,db(),did,str(u['_id']));out.append(serial(doc))
 return {'documents':out}
@router.get('/documents/{document_id}')
def document(document_id:str,u=Depends(user)):
 d=db().documents.find_one({'document_id':document_id});
 if not d:raise HTTPException(404,'Document not found')
 return serial(d)
@router.get('/documents')
def documents(u=Depends(user)):
 q={} if u.get('role')=='admin' else {'uploaded_by':str(u['_id'])}
 return serial(list(db().documents.find(q).sort('created_at',-1).limit(100)))
@router.get('/dashboard/summary')
def summary(u=Depends(user)):
 d=db();processed=d.documents.count_documents({'status':{'$in':['complete','needs_review']}});verified=d.land_records.count_documents({'status':'verified'});pending=d.verification_tasks.count_documents({'status':'pending'});errors=d.validations.count_documents({'reason_codes':{'$ne':[]}});rate=round((verified/processed*100) if processed else 0,1);activity=list(d.audit_logs.find().sort('created_at',-1).limit(8));return {'documents_processed':processed,'verified_records':verified,'pending_tasks':pending,'error_cases':errors,'validation_pass_rate':rate,'recent_activity':serial(activity)}
@router.get('/verification/tasks')
def tasks(u=Depends(role('admin','officer','verifier'))):
 rows=[]
 for t in db().verification_tasks.find({'status':'pending'}).sort('created_at',1):
  r=db().land_records.find_one({'record_id':t['record_id']});rows.append({'id':t['task_id'],'reason_codes':t['reason_codes'],'confidence':t['confidence'],'record':serial(r)})
 return rows
@router.post('/verification/{task_id}/decision')
def decision(task_id:str,p:VerificationDecision,u=Depends(role('admin','officer','verifier'))):
 t=db().verification_tasks.find_one({'task_id':task_id,'status':'pending'});
 if not t:raise HTTPException(404,'Open verification task not found')
 r=db().land_records.find_one({'record_id':t['record_id']});old=r['fields'];new=p.fields or old;flat={k:(v.get('value','') if isinstance(v,dict) else v) for k,v in new.items()};status='verified' if p.decision=='approve' else 'rejected';db().land_records.update_one({'record_id':t['record_id']},{'$set':{'fields':new,'owner':flat.get('owner',''),'khasra_no':flat.get('khasra_no',''),'khata_no':flat.get('khata_no',''),'village':flat.get('village',''),'district':flat.get('district',''),'status':status,'updated_at':now()}});db().verification_tasks.update_one({'task_id':task_id},{'$set':{'status':p.decision,'decided_at':now(),'decided_by':str(u['_id'])}});db().feedback.insert_one({'task_id':task_id,'record_id':t['record_id'],'old_fields':old,'new_fields':new,'decision':p.decision,'reason':p.reason,'actor_id':str(u['_id']),'created_at':now()});audit(db,t['record_id'],'verification_'+p.decision,str(u['_id']),{'task_id':task_id,'reason':p.reason});return {'record_id':t['record_id'],'status':status}
@router.get('/records')
def records(search:str='',u=Depends(user)):
 q={'status':{'$ne':'rejected'}}
 if search:q['$or']=[{k:{'$regex':search,'$options':'i'}} for k in ('owner','khasra_no','khata_no','village','district')]
 return serial(list(db().land_records.find(q).sort('updated_at',-1).limit(100)))
@router.get('/audit/{resource_id}')
def audit_log(resource_id:str,u=Depends(user)):return serial(list(db().audit_logs.find({'resource_id':resource_id}).sort('created_at',-1)))
@router.get('/reports/progress')
def progress(u=Depends(user)):
 groups={}
 for record in db().land_records.find({}, {'state':1,'district':1,'status':1}):
  key=(record.get('state') or 'Unassigned',record.get('district') or 'Unassigned'); groups.setdefault(key,{'records':0,'verified':0});groups[key]['records']+=1;groups[key]['verified']+=record.get('status')=='verified'
 return [{'state':state,'district':district,'records':v['records'],'progress':round(v['verified']/v['records']*100,1)} for (state,district),v in groups.items()]
@router.get('/reports/errors')
def errors(u=Depends(user)):return serial(list(db().validations.aggregate([{'$unwind':'$reason_codes'},{'$group':{'_id':'$reason_codes','count':{'$sum':1}}},{'$project':{'_id':0,'reason_code':'$_id','count':1}},{'$sort':{'count':-1}}])))
@router.get('/gis/parcels')
def parcels(u=Depends(user)):return {'type':'FeatureCollection','features':[{'type':'Feature','id':x['parcel_id'],'geometry':x['geometry'],'properties':x.get('properties',{})} for x in db().gis_parcels.find()]}
