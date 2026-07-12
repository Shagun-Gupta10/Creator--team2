from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class CreatorProfile(Base):
    __tablename__ = "creator_profile"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    channel_name = Column(String(150), nullable=False)
    bio = Column(Text)
    category = Column(String(100))
    country = Column(String(100))
    followers = Column(Integer, default=0)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )