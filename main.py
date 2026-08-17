from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api_router import api_router
from app.db.session import engine, Base
from app.websockets.connection_manager import ws_manager

# Ensure tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "status": "Online",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR
    }

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket, user_id: int = None):
    await ws_manager.connect(websocket, user_id=user_id)
    try:
        while True:
            data = await websocket.receive_json()
            # Echo or process incoming socket payload
            await ws_manager.broadcast({
                "type": "TELEMETRY_UPDATE",
                "payload": data
            })
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, user_id=user_id)
