import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Smart Emergency Response & Ambulance System"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-change-in-production-emergency-response-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days token
    
    # Database URL with zero-config SQLite auto-fallback if Postgres is not configured
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./emergency_system.db"
    )

    class Config:
        case_sensitive = True

settings = Settings()
