from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.database import Base, engine
from app.models.user import User
from app.models.content import Content
from app.models.user_settings import UserSettings
from app.models.audience import Audience
from app.models.audience_history import AudienceHistory
from app.models.post import InstagramPost
from app.models.post_insights import PostInsight
from app.models.social_account import SocialAccount
from app.models.team_member import TeamMember
from app.routes.content import router as content_router
from app.routes.dashboard import router as dashboard_router
from app.routes.settings import router as settings_router
from app.routes.team import router as team_router
from app.routes.instagram_api import router as instagram_router
from app.routes.audience import router as audience_router


# Create tables if they don't exist yet
Base.metadata.create_all(bind=engine, checkfirst=True)


app = FastAPI()

# Allow frontend dev server calls (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(content_router)
app.include_router(dashboard_router)
app.include_router(settings_router)
app.include_router(team_router)
app.include_router(instagram_router)
app.include_router(audience_router)


@app.get("/")
def home():
    return {"message": "Backend running successfully"}
