from celery import shared_task
from sqlalchemy.orm import sessionmaker
from app.db.database import engine
from app.models.event import Event

@shared_task
def process_event_batch(event_ids: list):
    """Process a batch of events (e.g., for aggregation, ML, etc.)"""
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        events = db.query(Event).filter(Event.id.in_(event_ids)).all()
        # Process events (e.g., update aggregates, trigger workflows)
        print(f"[EVENTS] Processed batch of {len(events)} events")
        return {"processed": len(events)}
    finally:
        db.close()