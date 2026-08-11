from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
def ping():
    return {"status": "healthy"}

@router.get("/ready")
def ready():
    return {"status": "ready", "services": ["db", "redis", "rabbitmq"]}