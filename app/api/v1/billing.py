from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.billing import Billing
from app.models.user import User

router = APIRouter()

@router.get("/status")
def get_billing_status(db: Session = Depends(get_db)):
    records = (
        db.query(Billing.plan, Billing.status, User.email)
        .join(User, Billing.user_id == User.id)
        .all()
    )

    return {
        "billing": [
            {"email": email, "plan": plan, "status": status}
            for plan, status, email in records
        ]
    }
