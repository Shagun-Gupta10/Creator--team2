from sqlalchemy import Column, Integer, String, Float, Text, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)

    creator_id = Column(
        Integer,
        ForeignKey("creator_profile.id", ondelete="CASCADE"),
        nullable=False
    )

    title = Column(String(255), nullable=False)
    platform = Column(String(50))
    content_type = Column(String(50))
    description = Column(Text)
    publish_date = Column(Date)

    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    saves = Column(Integer, default=0)
    watch_time = Column(Float, default=0)
    reach = Column(Integer, default=0)
    engagement_rate = Column(Float, default=0)

    created_at = Column(DateTime, server_default=func.now())

    creator = relationship("CreatorProfile", back_populates="contents")