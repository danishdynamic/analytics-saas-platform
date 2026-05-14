from fastapi import FastAPI
from app.api.v1 import auth, billing, health, notifications
from app.db.database import init_db

app = FastAPI(title="SaaS API")


@app.on_event("startup")
def on_startup():
    init_db()


app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(billing.router, prefix="/api/v1/billing", tags=["billing"])
app.include_router(health.router, prefix="/api/v1/health", tags=["health"])
app.include_router(notifications.router, prefix="/api/v1/notifications", tags=["notifications"])
