from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    contents = relationship("Content", back_populates="creator")
    settings = relationship("UserSettings", back_populates="user", uselist=False)
    audience = relationship(
        "Audience",
        back_populates="creator",
        cascade="all, delete-orphan"
    )
    social_accounts = relationship(
        "SocialAccount",
        back_populates="creator",
        cascade="all, delete-orphan",
    )


   