from fastapi import APIRouter
from app.api.endpoints import auth, emergencies, trips, hospitals, vitals, ai_services, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(emergencies.router, prefix="/emergencies", tags=["Emergencies"])
api_router.include_router(trips.router, prefix="/trips", tags=["Trips"])
api_router.include_router(hospitals.router, prefix="/hospitals", tags=["Hospitals"])
api_router.include_router(vitals.router, prefix="/vitals", tags=["Vital Signs"])
api_router.include_router(ai_services.router, prefix="/ai", tags=["AI Services"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin & Analytics"])
