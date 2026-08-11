from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class EventCreate(BaseModel):
    event_type: str
    properties: Dict[str, Any] = {}
    user_id: Optional[int] = None

class EventRead(BaseModel):
    id: int
    user_id: Optional[int]
    event_type: str
    properties: Dict[str, Any]
    created_at: datetime
    
    class Config:
        orm_mode = True