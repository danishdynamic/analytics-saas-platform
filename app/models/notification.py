from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    channel = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String, default="pending")

    user = relationship("User", back_populates="notifications")
