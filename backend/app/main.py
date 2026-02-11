from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import init_db
from .routers.subscriptions import router as subscriptions_router
from .routers.dashboard import router as dashboard_router

app = FastAPI(title="Subscription Value Analyzer API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 과제용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(subscriptions_router, prefix="/api/subscriptions", tags=["subscriptions"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/api/health")
def health():
    return {"ok": True}
