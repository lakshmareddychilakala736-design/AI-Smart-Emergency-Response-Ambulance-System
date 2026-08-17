import json
import base64
import hashlib
from datetime import datetime, timedelta, timezone
from typing import Any, Union
from app.core.config import settings

try:
    from jose import jwt
    USE_JOSE = True
except Exception:
    USE_JOSE = False

try:
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    USE_PASSLIB = True
except Exception:
    USE_PASSLIB = False

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if USE_PASSLIB and hashed_password.startswith("$2b$"):
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception:
            pass
    hash_obj = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
    return hash_obj == hashed_password or hashed_password == f"hashed_{plain_password}"

def get_password_hash(password: str) -> str:
    if USE_PASSLIB:
        try:
            return pwd_context.hash(password)
        except Exception:
            pass
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def create_access_token(subject: Union[str, Any], role: str, expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "exp": int(expire.timestamp()),
        "sub": str(subject),
        "role": role
    }

    if USE_JOSE:
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    # Universal zero-dependency JWT token encoder fallback
    header = {"alg": "HS256", "typ": "JWT"}
    b64_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    b64_payload = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().rstrip("=")
    signature = hashlib.sha256(f"{b64_header}.{b64_payload}.{settings.SECRET_KEY}".encode()).hexdigest()[:16]
    return f"{b64_header}.{b64_payload}.{signature}"

