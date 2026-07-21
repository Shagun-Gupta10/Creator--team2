from fastapi import APIRouter
from app.services.instagram_service import (
    get_profile,
    get_posts,
)
from app.services.instagram_service import sync_posts
from app.services.instagram_service import get_saved_posts

router = APIRouter(
    prefix="/instagram",
    tags=["Instagram API"]
)


@router.get("/profile")
def profile():
    return get_profile()


@router.get("/posts")
def posts():
    return get_posts()

@router.post("/sync")
def sync():
    return sync_posts()

@router.get("/database-posts")
def database_posts():
    return get_saved_posts()