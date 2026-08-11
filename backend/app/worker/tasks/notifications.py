from datetime import datetime
from celery import shared_task
from sqlalchemy.orm import sessionmaker
from app.db.database import engine
from app.models.notification import Notification

@shared_task
def send_notification_task(notification_id: int):
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        notification = db.query(Notification).filter(Notification.id == notification_id).first()
        if not notification:
            return {"error": "Notification not found"}
        
        # Simulate sending (email, push, etc.)
        # In production, integrate with SendGrid, AWS SES, Firebase, etc.
        print(f"[NOTIFICATION] To user {notification.user_id}: {notification.title} - {notification.message}")
        
        notification.status = "sent"
        notification.sent_at = datetime.utcnow()
        db.commit()
        
        return {"status": "sent", "notification_id": notification_id}
    except Exception as e:
        if notification:
            notification.status = "failed"
            db.commit()
        return {"error": str(e)}
    finally:
        db.close()