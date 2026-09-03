from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "nirvivaad"
    allowed_origins: str = "http://localhost:5500,http://127.0.0.1:5500"
    jwt_secret_key: str = "change-this-development-only-secret-before-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]


settings = Settings()
