import os
import requests
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.post import InstagramPost
load_dotenv()

APP_ID = os.getenv("INSTAGRAM_APP_ID")
APP_SECRET = os.getenv("INSTAGRAM_APP_SECRET")
REDIRECT_URI = os.getenv("INSTAGRAM_REDIRECT_URI")
PAGE_TOKEN = os.getenv("PAGE_ACCESS_TOKEN")
IG_ID = os.getenv("INSTAGRAM_BUSINESS_ID")

def exchange_code_for_token(code: str):
    url = "https://graph.facebook.com/v25.0/oauth/access_token"

    params = {
        "client_id": APP_ID,
        "client_secret": APP_SECRET,
        "redirect_uri": REDIRECT_URI,
        "code": code,
    }

    response = requests.get(url, params=params)

    return response.json()

def get_profile():

    url = f"https://graph.facebook.com/v25.0/{IG_ID}"

    params = {
        "fields":
        "username,name,followers_count,follows_count,media_count,profile_picture_url",

        "access_token": PAGE_TOKEN
    }

    return requests.get(url, params=params).json()

def get_posts():

    url = f"https://graph.facebook.com/v25.0/{IG_ID}/media"

    params = {
        "fields":
        "id,caption,media_type,media_url,permalink,timestamp",

        "access_token": PAGE_TOKEN
    }

    response = requests.get(url, params=params)

    return requests.get(url, params=params).json()
def sync_posts():
    db: Session = SessionLocal()

    try:
        posts = get_posts()

        if "data" not in posts:
            return posts

        saved = 0

        for post in posts["data"]:

            existing = db.query(InstagramPost).filter(
                InstagramPost.media_id == post["id"]
            ).first()

            if existing:
                continue

            new_post = InstagramPost(
                media_id=post["id"],
                caption=post.get("caption"),
                media_type=post.get("media_type"),
                media_url=post.get("media_url"),
                permalink=post.get("permalink"),
                timestamp=post.get("timestamp")
            )

            db.add(new_post)
            saved += 1

        db.commit()

        return {
            "message": "Posts synchronized successfully",
            "new_posts_saved": saved
        }

    finally:
        db.close()


def get_saved_posts():
    db = SessionLocal()

    try:
        posts = db.query(InstagramPost).all()

        return [
            {
                "media_id": p.media_id,
                "caption": p.caption,
                "media_type": p.media_type,
                "media_url": p.media_url,
                "permalink": p.permalink,
                "timestamp": p.timestamp,
            }
            for p in posts
        ]

    finally:
        db.close()