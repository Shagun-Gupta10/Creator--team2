from pydantic import BaseModel

class ContentCreate(BaseModel):
    title: str
    platform: str
    views: int
    likes: int