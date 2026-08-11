from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.billing import Billing
from app.models.user import User
from app.core.dependencies import get_current_user

router = APIRouter()

@router.get("/status")
def get_billing_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = (
        db.query(Billing.plan, Billing.status, Billing.amount, Billing.created_at)
        .filter(Billing.user_id == current_user.id)
        .all()
    )
    return {
        "billing": [
            {"plan": plan, "status": status, "amount": amount, "created_at": created_at}
            for plan, status, amount, created_at in records
        ]
    }