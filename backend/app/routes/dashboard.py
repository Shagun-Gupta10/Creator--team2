from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.creator_profile import CreatorProfile
from app.database import get_db
from app.services.dashboard_service import (
    get_dashboard_summary,
    get_instagram_dashboard,
    get_dashboard_data
)
from app.services.instagram_service import (
    sync_posts,
    get_saved_posts,
    get_analytics,
    save_audience_snapshot,
    get_audience_growth,
    get_post_trends
)
from app.auth.rbac import require_role
from app.models.user import User


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("", include_in_schema=False)
@router.get("/", include_in_schema=False)
def dashboard(
    period: str = "30d",
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role([
            "creator",
            "agency",
            "marketing_team",
            "administrator"
        ])
    ),
):
    return get_dashboard_summary(db, current_user, period)


@router.get("/instagram")
def instagram_dashboard():
    return get_instagram_dashboard()


@router.get("/data")
def dashboard_data():
    return get_dashboard_data()


@router.post("/instagram/sync")
def instagram_sync():
    return sync_posts()


@router.get("/instagram/posts")
def instagram_posts():
    return get_saved_posts()


@router.get("/instagram/analytics")
def instagram_analytics():
    return get_analytics()


@router.post("/instagram/audience/snapshot")
def instagram_audience_snapshot():
    return save_audience_snapshot()


@router.get("/instagram/audience/growth")
def instagram_audience_growth():
    return get_audience_growth()


@router.get("/instagram/trends")
def instagram_trends():
    return get_post_trends()

@router.get("/facebook")
def facebook_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role([
            "creator",
            "agency",
            "marketing_team",
            "administrator"
        ])
    ),
):
    creator_profile = db.query(CreatorProfile).filter(
        CreatorProfile.user_id == current_user.id
    ).first()

    if not creator_profile:
        return {
            "connected": False,
            "page_name": None,
            "followers": 0,
            "total_posts": 0,
        }

    return {
        "connected": bool(creator_profile.facebook_page_id),
        "page_name": creator_profile.facebook_page_name,
        "followers": creator_profile.facebook_followers or 0,
        "total_posts": 0,
    }
