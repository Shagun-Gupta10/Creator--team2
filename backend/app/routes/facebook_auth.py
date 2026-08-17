import os
from urllib.parse import urlencode
from dotenv import load_dotenv
from fastapi import APIRouter
from app.services.facebook_service import (exchange_code_for_token, 
                                           get_user_profile, 
                                           get_user_pages, 
                                           get_page_info,
                                           get_page_posts,
                                           get_page_insights,
                                           )
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.creator_profile import CreatorProfile
from fastapi.responses import RedirectResponse
from jose import jwt
from app.auth.jwt_handler import SECRET_KEY, ALGORITHM
from app.auth.oauth2 import get_current_user
load_dotenv()

router = APIRouter(
    prefix="/auth/facebook",
    tags=["Facebook OAuth"]
)

APP_ID = os.getenv("FACEBOOK_APP_ID")
REDIRECT_URI = os.getenv("FACEBOOK_REDIRECT_URI")

SCOPES = [
    "public_profile",
    "pages_show_list",
    "pages_read_engagement",
]

@router.get("/login")
def facebook_login(
    current_user = Depends(get_current_user)
):
    state = jwt.encode(
        {"user_id": current_user.id},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    params = {
        "client_id": APP_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": ",".join(SCOPES),
        "response_type": "code",
        "state": state,
    }

    login_url = (
        "https://www.facebook.com/v25.0/dialog/oauth?"
        + urlencode(params)
    )

    return {"login_url": login_url}

@router.get("/callback")
def facebook_callback(
    code: str,
    state: str,
    db: Session = Depends(get_db)
):
    try:
        state_data = jwt.decode(
            state,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = state_data["user_id"]

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid OAuth state"
        )
    
    token = exchange_code_for_token(code)
    access_token = token["access_token"]

    profile = get_user_profile(access_token)

    pages = get_user_pages(access_token)

    if not pages.get("data"):
        return {
            "error": "No Facebook Pages found for this account"
        }

    page = pages["data"][0]
    page_id = page["id"]
    page_access_token = page["access_token"]

    page_info = get_page_info(
        page_id,
        page_access_token
    )

    page_posts = get_page_posts(
        page_id,
        page_access_token
    )

    page_insights = get_page_insights(
        page_id,
        page_access_token
    )

    creator_profile = db.query(CreatorProfile).filter(
        CreatorProfile.user_id == user_id
    ).first()

    if creator_profile:
        creator_profile.facebook_page_id = page_id
        creator_profile.facebook_page_name = page["name"]
        creator_profile.facebook_page_access_token = page_access_token
        creator_profile.facebook_followers = page_info.get(
            "followers_count",
            0
        )

        db.commit()
        db.refresh(creator_profile)

    return RedirectResponse(
    url="http://localhost:5173/dashboard?facebook=connected"
)
