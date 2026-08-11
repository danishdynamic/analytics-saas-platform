from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NotificationCreate(BaseModel):
    user_id: int
    title: str
    message: str
    channel: str = "in_app"

class NotificationRead(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    channel: str
    status: str
    created_at: datetime
    sent_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True