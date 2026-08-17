from fastapi import APIRouter

from app.services.facebook_service import (
    get_user_profile,
    get_user_pages,
    get_page_info,
    get_page_posts,
    get_page_insights,
)

router = APIRouter(
    prefix="/facebook",
    tags=["Facebook API"],
)


def get_facebook_data():
    # TEMPORARY:
    # For now this uses the page information returned during OAuth.
    # We will move the access token/page ID to the database after
    # the dashboard flow is confirmed.

    return {
        "profile": {},
        "pages": {},
        "page_info": {},
        "page_posts": {},
        "page_insights": {},
    }


@router.get("/profile")
def facebook_profile():
    return get_facebook_data()["profile"]


@router.get("/posts")
def facebook_posts():
    return get_facebook_data()["page_posts"]


@router.get("/analytics")
def facebook_analytics():
    return get_facebook_data()["page_insights"]


@router.get("/trends")
def facebook_trends():
    return get_facebook_data()["page_insights"]