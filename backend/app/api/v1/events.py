from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.event import EventCreate, EventRead
from app.services.event_service import EventService
from app.db.database import get_db
from app.core.dependencies import get_current_user_optional
from app.models.user import User

router = APIRouter()
event_service = EventService()

@router.post("/ingest", response_model=EventRead)
def ingest_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    if current_user:
        event.user_id = current_user.id
    return event_service.ingest(db, event)

@router.get("/", response_model=List[EventRead])
def get_events(
    event_type: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    user_id = current_user.id if current_user else None
    return event_service.get_events(db, user_id=user_id, event_type=event_type)