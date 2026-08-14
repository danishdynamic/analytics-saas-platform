from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict, Any

class EventCreate(BaseModel):
    event_type: str
    properties: Dict[str, Any] = {}
    user_id: Optional[int] = None

class EventRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    user_id: Optional[int]
    event_type: str
    properties: Dict[str, Any]
    created_at: datetime