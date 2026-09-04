from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
 mongodb_uri:str='mongodb://localhost:27017'; mongodb_db_name:str='nirvivaad'; allowed_origins:str='http://localhost:5173,http://127.0.0.1:5173,https://nirvivaad.vercel.app,https://nirvivaad-from-disputed-to-nirvivaad.vercel.app'; jwt_secret_key:str='change-this-development-only-secret-before-production'; jwt_algorithm:str='HS256'; access_token_expire_minutes:int=480; upload_dir:str='uploads'; model_confidence_threshold:float=.85; bootstrap_admin_email:str=''; bootstrap_admin_password:str=''; admin_signup_code:str=''; openai_api_key:str=''
 model_config=SettingsConfigDict(env_file='.env',extra='ignore')
 @property
 def cors_origins(self): return [x.strip() for x in self.allowed_origins.split(',')]
settings=Settings()
