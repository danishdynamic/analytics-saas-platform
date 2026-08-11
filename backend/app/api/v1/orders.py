from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.order import OrderCreate, OrderRead
from app.services.order_service import OrderService
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()
order_service = OrderService()

@router.post("/", response_model=OrderRead)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return order_service.create_order(db, current_user.id, order)

@router.get("/", response_model=List[OrderRead])
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return order_service.get_user_orders(db, current_user.id)