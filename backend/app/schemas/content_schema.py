from typing import Optional
from datetime import date
from pydantic import BaseModel, Field


# ----------------------------
# Create Content Schema
# ----------------------------
class ContentCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    platform: str = Field(..., min_length=2, max_length=50)

    creator_id: int
    description: str
    content_type: str
    publish_date: date

    views: int = Field(0, ge=0)
    likes: int = Field(0, ge=0)
    comments: int = Field(0, ge=0)
    shares: int = Field(0, ge=0)
    saves: int = Field(0, ge=0)

    watch_time: float = Field(0, ge=0)
    reach: int = Field(0, ge=0)


# ----------------------------
# Update Content Schema
# ----------------------------
class ContentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    platform: Optional[str] = Field(None, min_length=2, max_length=50)

    creator_id: Optional[int] = None
    description: Optional[str] = None
    content_type: Optional[str] = None
    publish_date: Optional[date] = None

    views: Optional[int] = Field(None, ge=0)
    likes: Optional[int] = Field(None, ge=0)
    comments: Optional[int] = Field(None, ge=0)
    shares: Optional[int] = Field(None, ge=0)
    saves: Optional[int] = Field(None, ge=0)

    watch_time: Optional[float] = Field(None, ge=0)
    reach: Optional[int] = Field(None, ge=0)