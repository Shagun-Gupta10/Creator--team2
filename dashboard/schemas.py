from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field

from app.models import RoleEnum


# ---------- Auth ----------

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: RoleEnum = RoleEnum.creator


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: RoleEnum
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: RoleEnum
    username: str


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None


# ---------- Analytics ----------

class AnalyticsEventCreate(BaseModel):
    content_title: str
    platform: str = "general"
    views: int = 0
    likes: int = 0
    comments: int = 0
    shares: int = 0
    revenue: float = 0.0


class AnalyticsEventOut(AnalyticsEventCreate):
    id: int
    owner_id: int
    recorded_at: datetime

    class Config:
        from_attributes = True


class DashboardSummary(BaseModel):
    total_views: int
    total_likes: int
    total_comments: int
    total_shares: int
    total_revenue: float
    total_content_pieces: int
    engagement_rate: float  # (likes+comments+shares) / views


class CreatorSummary(BaseModel):
    creator_id: int
    username: str
    summary: DashboardSummary


class PlatformBreakdown(BaseModel):
    platform: str
    views: int
    likes: int
    revenue: float
