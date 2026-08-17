import os
import requests
from dotenv import load_dotenv

load_dotenv()

APP_ID = os.getenv("FACEBOOK_APP_ID")
APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
REDIRECT_URI = os.getenv("FACEBOOK_REDIRECT_URI")

print("FACEBOOK_APP_ID:", APP_ID)
print("FACEBOOK_APP_SECRET:", APP_SECRET)
print("FACEBOOK_REDIRECT_URI:", REDIRECT_URI)


def exchange_code_for_token(code: str):
    url = "https://graph.facebook.com/v25.0/oauth/access_token"

    params = {
        "client_id": APP_ID,
        "client_secret": APP_SECRET,
        "redirect_uri": REDIRECT_URI,
        "code": code,
    }

    print("APP_ID:", repr(APP_ID))
    print("APP_SECRET:", repr(APP_SECRET))
    print("REDIRECT_URI:", repr(REDIRECT_URI))
    print("PARAMS:", params)

    response = requests.get(url, params=params)

    print("STATUS:", response.status_code)
    print("BODY:", response.text)

    return response.json()

def get_user_profile(access_token: str):
    url = "https://graph.facebook.com/v25.0/me"

    params = {
        "fields": "id,name,email",
        "access_token": access_token,
    }

    response = requests.get(url, params=params)
    return response.json()


def get_user_pages(access_token):

    url = "https://graph.facebook.com/v25.0/me/accounts"

    params = {
        "access_token": access_token
    }

    response = requests.get(url, params=params)

    return response.json()

def get_page_info(page_id: str, page_access_token: str):
    url = f"https://graph.facebook.com/v25.0/{page_id}"

    params = {
        "fields": "id,name,followers_count",
        "access_token": page_access_token,
    }

    response = requests.get(url, params=params)

    print("PAGE INFO STATUS:", response.status_code)
    print("PAGE INFO BODY:", response.text)

    return response.json()


def get_page_posts(page_id: str, page_access_token: str):
    url = f"https://graph.facebook.com/v25.0/{page_id}/posts"

    params = {
        "fields": "id,message,created_time,permalink_url",
        "access_token": page_access_token,
    }

    response = requests.get(url, params=params)

    print("PAGE POSTS STATUS:", response.status_code)
    print("PAGE POSTS BODY:", response.text)

    return response.json()

def get_page_insights(page_id: str, page_access_token: str):
    url = f"https://graph.facebook.com/v25.0/{page_id}/insights"

    params = {
        "metric": "page_follows,page_post_engagements",
        "access_token": page_access_token,
    }

    response = requests.get(url, params=params)

    print("PAGE INSIGHTS STATUS:", response.status_code)
    print("PAGE INSIGHTS BODY:", response.text)

    return response.json()