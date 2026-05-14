from fastapi import APIRouter
from app.services.notification_task import NotificationTask

router = APIRouter()

task = NotificationTask()

@router.post("/send")
def send_notification(payload: dict):
    task.enqueue(payload)
    return {"status": "queued"}
