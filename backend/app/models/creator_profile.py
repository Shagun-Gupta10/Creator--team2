from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class CreatorProfile(Base):
    __tablename__ = "creator_profile"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    channel_name = Column(String, nullable=False)
    bio = Column(String)
    category = Column(String)
    country = Column(String)
    followers = Column(Integer, default=0)