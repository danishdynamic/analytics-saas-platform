from sqlalchemy.orm import Session
from typing import List
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationRead
from app.worker.tasks.notifications import send_notification_task

class NotificationService:
    def create(self, db: Session, notification: NotificationCreate) -> Notification:
        db_notification = Notification(
            user_id=notification.user_id,
            title=notification.title,
            message=notification.message,
            channel=notification.channel,
            status="pending"
        )
        db.add(db_notification)
        db.commit()
        db.refresh(db_notification)
        
        # Queue Celery task
        send_notification_task.delay(db_notification.id)
        return db_notification
    
    def get_user_notifications(self, db: Session, user_id: int) -> List[Notification]:
        return db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.created_at.desc()).all()
    
    def mark_as_read(self, db: Session, notification_id: int, user_id: int) -> Notification:
        notification = db.query(Notification).filter(
            Notification.id == notification_id,
            Notification.user_id == user_id
        ).first()
        if not notification:
            raise ValueError("Notification not found")
        notification.status = "read"
        db.commit()
        db.refresh(notification)
        return notification