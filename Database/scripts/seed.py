"""Seed only a local MongoDB instance with NIRVIVAAD frontend demo data."""
import sys
from pathlib import Path
from uuid import uuid4
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'Backend'))
from app.core.security import hash_password
from app.db.mongo import create_indexes, get_database
from app.services import audit, now
db=get_database();create_indexes()
user={'name':'Demo Revenue Officer','email':'officer@nirvivaad.local','password_hash':hash_password('Nirvivaad@2026'),'role':'officer','active':True,'created_at':now()}
db.users.update_one({'email':user['email']},{'$setOnInsert':user},upsert=True);officer=db.users.find_one({'email':user['email']})
samples=[('LR-2026-000001','214/2','47','Rameshwar Sah','Kanti','Muzaffarpur','Bihar','verified',.94,[]),('LR-2026-000002','88/1','12','Fatima Khatun','Bela','Muzaffarpur','Bihar','needs_review',.71,['possible_duplicate_khasra','low_confidence_owner']),('LR-2026-000003','305','204','Suresh Patil','Ojhar','Nashik','Maharashtra','verified',.92,[]),('LR-2026-000004','19/3','61','Govind Yadav','Sarairanjan','Samastipur','Bihar','needs_review',.67,['mutation_reference_mismatch','low_confidence_area']),('LR-2026-000005','142','98','Lakshmi Reddy','Yadgir','Belagavi','Karnataka','verified',.95,[])]
for rid,khasra,khata,owner,village,district,state,status,confidence,reasons in samples:
 did='DOC-'+rid[-6:];fields={k:{'value':v,'confidence':confidence if k in ('owner','khasra_no','khata_no') else max(.55,confidence-.08),'page':1,'bbox':None,'model_version':'seed-v1'} for k,v in {'owner':owner,'khasra_no':khasra,'khata_no':khata,'village':village,'district':district,'area':'0.62','classification':'Agricultural'}.items()};db.documents.update_one({'document_id':did},{'$setOnInsert':{'document_id':did,'original_name':rid+'.pdf','status':'complete' if status=='verified' else 'needs_review','languages':['Hindi'],'uploaded_by':str(officer['_id']),'created_at':now()}},upsert=True);db.land_records.update_one({'record_id':rid},{'$setOnInsert':{'record_id':rid,'document_id':did,'fields':fields,'owner':owner,'khasra_no':khasra,'khata_no':khata,'village':village,'district':district,'state':state,'confidence':confidence,'status':status,'created_at':now(),'updated_at':now()}},upsert=True);db.validations.update_one({'record_id':rid},{'$set':{'record_id':rid,'reason_codes':reasons,'confidence':confidence,'created_at':now()}},upsert=True)
 if reasons:db.verification_tasks.update_one({'record_id':rid,'status':'pending'},{'$setOnInsert':{'task_id':'VT-'+uuid4().hex[:10].upper(),'record_id':rid,'document_id':did,'status':'pending','reason_codes':reasons,'confidence':confidence,'created_at':now()}},upsert=True)
 audit(db,rid,'seeded_record',str(officer['_id']),{'document_id':did})
db.gis_parcels.update_one({'parcel_id':'PARCEL-DEMO-001'},{'$setOnInsert':{'parcel_id':'PARCEL-DEMO-001','geometry':{'type':'Point','coordinates':[85.37,26.12]},'properties':{'record_id':'LR-2026-000001','village':'Kanti'}}},upsert=True)
print('Seed complete. Login: officer@nirvivaad.local / Nirvivaad@2026')
