from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.event_service import EventService
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()
event_service = EventService()

@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return event_service.get_dashboard_stats(db)