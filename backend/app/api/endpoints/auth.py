from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import User, Patient, Doctor, HospitalAdmin, Driver, UserRole
from app.schemas.schemas import UserCreate, UserResponse, Token
from app.core.security import verify_password, get_password_hash, create_access_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        phone=user_in.phone,
        role=user_in.role or UserRole.PATIENT
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    if user.role == UserRole.PATIENT:
        patient = Patient(user_id=user.id)
        db.add(patient)
        db.commit()
    elif user.role == UserRole.DRIVER:
        driver = Driver(user_id=user.id, license_number="DL-DEFAULT-999")
        db.add(driver)
        db.commit()

    return user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(subject=user.id, role=user.role)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user_id": user.id,
        "full_name": user.full_name
    }

@router.post("/verify-otp")
def verify_otp(email: str, otp: str):
    return {"message": "OTP verified successfully", "status": True}

@router.post("/forgot-password")
def forgot_password(email: str):
    return {"message": f"Password reset link sent to {email}"}
