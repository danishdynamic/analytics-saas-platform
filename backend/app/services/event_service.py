from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime, timedelta
from app.models.event import Event
from app.schemas.event import EventCreate

class EventService:
    def ingest(self, db: Session, event: EventCreate) -> Event:
        db_event = Event(
            user_id=event.user_id,
            event_type=event.event_type,
            properties=event.properties
        )
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        return db_event
    
    def get_events(self, db: Session, user_id: int = None, event_type: str = None, limit: int = 100) -> List[Event]:
        query = db.query(Event)
        if user_id:
            query = query.filter(Event.user_id == user_id)
        if event_type:
            query = query.filter(Event.event_type == event_type)
        return query.order_by(Event.created_at.desc()).limit(limit).all()
    
    def get_dashboard_stats(self, db: Session) -> Dict[str, Any]:
        # Total events today
        today = datetime.utcnow().date()
        today_start = datetime.combine(today, datetime.min.time())
        
        total_events = db.query(Event).count()
        today_events = db.query(Event).filter(Event.created_at >= today_start).count()
        
        # Events by type
        from sqlalchemy import func
        events_by_type = db.query(Event.event_type, func.count(Event.id)).group_by(Event.event_type).all()
        
        # Events last 7 days
        week_ago = datetime.utcnow() - timedelta(days=7)
        weekly_events = db.query(Event).filter(Event.created_at >= week_ago).count()
        
        return {
            "total_events": total_events,
            "today_events": today_events,
            "weekly_events": weekly_events,
            "events_by_type": {e[0]: e[1] for e in events_by_type}
        }