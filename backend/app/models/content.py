from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Content(Base):

    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    platform = Column(String)

    views = Column(Integer)

    likes = Column(Integer)

    creator_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="contents")