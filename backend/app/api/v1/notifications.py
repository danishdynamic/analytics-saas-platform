from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.notification import NotificationCreate, NotificationRead
from app.services.notification_service import NotificationService
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()
notification_service = NotificationService()

@router.get("/", response_model=List[NotificationRead])
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return notification_service.get_user_notifications(db, current_user.id)

@router.post("/", response_model=NotificationRead)
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return notification_service.create(db, notification)

@router.post("/{notification_id}/read", response_model=NotificationRead)
def mark_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return notification_service.mark_as_read(db, notification_id, current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))