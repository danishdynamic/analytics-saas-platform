from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Billing(Base):
    __tablename__ = "billings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan = Column(String, nullable=False)
    status = Column(String, default="active")

    user = relationship("User", back_populates="billings")
