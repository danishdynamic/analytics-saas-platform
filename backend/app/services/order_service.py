from sqlalchemy.orm import Session
from typing import List
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderRead
from app.services.notification_service import NotificationService
from app.schemas.notification import NotificationCreate

class OrderService:
    def __init__(self):
        self.notification_service = NotificationService()
    
    def create_order(self, db: Session, user_id: int, order: OrderCreate) -> Order:
        db_order = Order(
            user_id=user_id,
            total_amount=order.total_amount,
            items=[item.dict() for item in order.items],
            status="completed"  # Simulated payment success
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        # Create notification
        self.notification_service.create(db, NotificationCreate(
            user_id=user_id,
            title="Order Confirmed!",
            message=f"Your order #{db_order.id} for ${db_order.total_amount:.2f} has been confirmed.",
            channel="in_app"
        ))
        
        return db_order
    
    def get_user_orders(self, db: Session, user_id: int) -> List[Order]:
        return db.query(Order).filter(Order.user_id == user_id).order_by(Order.created_at.desc()).all()