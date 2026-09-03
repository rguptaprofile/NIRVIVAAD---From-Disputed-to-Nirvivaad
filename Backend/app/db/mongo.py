from pymongo import ASCENDING,DESCENDING,GEOSPHERE,MongoClient
from ..core.config import settings
client=MongoClient(settings.mongodb_uri);database=client[settings.mongodb_db_name]
def get_database():return database
def create_indexes():
 database.users.create_index('email',unique=True);database.documents.create_index([('status',ASCENDING),('created_at',DESCENDING)]);database.ocr_results.create_index([('document_id',ASCENDING),('page',ASCENDING)]);database.land_records.create_index([('status',ASCENDING),('updated_at',DESCENDING)]);database.land_records.create_index([('khasra_no',ASCENDING),('khata_no',ASCENDING),('village',ASCENDING)]);database.validations.create_index([('record_id',ASCENDING),('created_at',DESCENDING)]);database.verification_tasks.create_index([('status',ASCENDING),('created_at',ASCENDING)]);database.audit_logs.create_index([('resource_id',ASCENDING),('created_at',DESCENDING)]);database.gis_parcels.create_index([('geometry',GEOSPHERE)])
