from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class InstagramPost(Base):
    __tablename__ = "instagram_posts"

    id = Column(Integer, primary_key=True, index=True)

    media_id = Column(String, unique=True)

    caption = Column(Text)

    media_type = Column(String)

    media_url = Column(Text)

    permalink = Column(Text)

    timestamp = Column(String)