from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from app.database import Base

class Content(Base):

    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    platform = Column(String)

    views = Column(Integer, default=0)

    likes = Column(Integer, default=0)

    comments = Column(Integer, default=0)

    shares = Column(Integer, default=0)

    saves = Column(Integer, default=0)

    watch_time = Column(Float, default=0)

    reach = Column(Integer, default=0)

    engagement_rate = Column(Float, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)

    creator_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="contents")