import enum
from datetime import datetime

from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Float
)
from sqlalchemy.orm import relationship

from app.database import Base


class RoleEnum(str, enum.Enum):
    admin = "admin"
    creator = "creator"
    viewer = "viewer"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.creator, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    analytics = relationship(
        "AnalyticsEvent", back_populates="owner", cascade="all, delete-orphan"
    )


class AnalyticsEvent(Base):
    """
    A single analytics data point for a creator's content.
    e.g. daily snapshot of views/likes/comments/revenue for a piece of content.
    """
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    content_title = Column(String(200), nullable=False)
    platform = Column(String(50), default="general")  # e.g. youtube, tiktok, blog
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    revenue = Column(Float, default=0.0)

    recorded_at = Column(DateTime, default=datetime.utcnow, index=True)

    owner = relationship("User", back_populates="analytics")
