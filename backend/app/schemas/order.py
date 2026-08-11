from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Any
from typing import Optional

class OrderItem(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItem]
    total_amount: float

class OrderRead(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    items: List[Dict[str, Any]]
    created_at: datetime
    
    class Config:
        orm_mode = True