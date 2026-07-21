from pydantic import BaseModel

class ContentCreate(BaseModel):
    title: str
    platform: str
    views: int = 0
    likes: int = 0
    comments: int = 0
    shares: int = 0
    saves: int = 0
    watch_time: float = 0
    reach: int = 0
    engagement_rate: float = 0