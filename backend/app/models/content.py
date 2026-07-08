from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)

    creator_id = Column(Integer, ForeignKey("creator_profile.id"))

    title = Column(String, nullable=False)
    platform = Column(String)
    content_type = Column(String)
    description = Column(String)

    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    saves = Column(Integer, default=0)
    watch_time = Column(Float, default=0)
    reach = Column(Integer, default=0)
    engagement_rate = Column(Float, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("CreatorProfile", back_populates="contents")