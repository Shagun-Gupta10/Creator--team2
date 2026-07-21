from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import func
from app.models.content import Content
from sqlalchemy import func

from app.auth.oauth2 import get_current_user




def create_content(content, db: Session, current_user: "User"):

    # Calculate engagement rate automatically
    if content.reach > 0:
        engagement_rate = (
            (content.likes + content.comments + content.shares)
            / content.reach
        ) * 100
    else:
        engagement_rate = 0

    new_content = Content(
        title=content.title,
        platform=content.platform,
        views=content.views,
        likes=content.likes,
        comments=content.comments,
        shares=content.shares,
        saves=content.saves,
        watch_time=content.watch_time,
        reach=content.reach,
        engagement_rate=engagement_rate,
        creator_id=current_user.id,
    )

    db.add(new_content)
    db.commit()
    db.refresh(new_content)

    return {
        "message": "Content added successfully",
        "content_id": new_content.id,
        "engagement_rate": engagement_rate,
    }


def get_all_content(db: Session, current_user: "User"):
    if current_user.role == "creator":
        return db.query(Content).filter(Content.creator_id == current_user.id).all()

    # Non-creators (agency/marketing/admin) see global content in this MVP
    return db.query(Content).all()



def delete_content(content_id, db: Session, current_user: "User"):
    content = db.query(Content).filter(Content.id == content_id).first()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    if current_user.role == "creator" and content.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this content")

    db.delete(content)
    db.commit()

    return {"message": "Content deleted successfully"}

def get_content_analytics(db: Session, current_user: "User"):

    query = db.query(Content)

    # Creators can only see their own analytics
    if current_user.role == "creator":
        query = query.filter(Content.creator_id == current_user.id)

    contents = query.all()

    total_posts = len(contents)
    total_views = sum(c.views or 0 for c in contents)
    total_likes = sum(c.likes or 0 for c in contents)
    total_comments = sum(c.comments or 0 for c in contents)
    total_shares = sum(c.shares or 0 for c in contents)
    total_reach = sum(c.reach or 0 for c in contents)

    if total_posts:
        average_engagement_rate = (
            sum(c.engagement_rate or 0 for c in contents)
            / total_posts
        )
    else:
        average_engagement_rate = 0

    return {
        "total_posts": total_posts,
        "total_views": total_views,
        "total_likes": total_likes,
        "total_comments": total_comments,
        "total_shares": total_shares,
        "total_reach": total_reach,
        "average_engagement_rate": round(average_engagement_rate, 2),
    }

def get_top_content(db: Session, current_user: "User"):

    query = db.query(Content)

    if current_user.role == "creator":
        query = query.filter(Content.creator_id == current_user.id)

    top_posts = (
        query.order_by(Content.engagement_rate.desc())
        .limit(5)
        .all()
    )

    return [
        {
            "title": post.title,
            "platform": post.platform,
            "views": post.views,
            "likes": post.likes,
            "engagement_rate": round(post.engagement_rate or 0, 2),
        }
        for post in top_posts
    ]

def get_platform_analytics(db: Session, current_user: "User"):

    query = db.query(Content)

    # Creators can only see their own content
    if current_user.role == "creator":
        query = query.filter(Content.creator_id == current_user.id)

    contents = query.all()

    platform_data = {}

    for content in contents:
        platform = content.platform

        if platform not in platform_data:
            platform_data[platform] = {
                "platform": platform,
                "posts": 0,
                "views": 0,
                "likes": 0,
                "total_engagement": 0,
            }

        platform_data[platform]["posts"] += 1
        platform_data[platform]["views"] += content.views or 0
        platform_data[platform]["likes"] += content.likes or 0
        platform_data[platform]["total_engagement"] += (
            content.engagement_rate or 0
        )

    result = []

    for platform in platform_data.values():
        avg = (
            platform["total_engagement"] / platform["posts"]
            if platform["posts"] > 0
            else 0
        )

        result.append({
            "platform": platform["platform"],
            "posts": platform["posts"],
            "views": platform["views"],
            "likes": platform["likes"],
            "average_engagement_rate": round(avg, 2),
        })

    return result

def get_content_trends(db: Session, current_user: "User"):

    query = db.query(Content)

    # Creators can only view their own data
    if current_user.role == "creator":
        query = query.filter(Content.creator_id == current_user.id)

    contents = (
        query.order_by(Content.created_at.asc())
        .all()
    )

    trends = []

    for content in contents:
        trends.append({
            "date": content.created_at.strftime("%Y-%m-%d"),
            "title": content.title,
            "platform": content.platform,
            "views": content.views,
            "likes": content.likes,
            "comments": content.comments,
            "shares": content.shares,
            "engagement_rate": round(content.engagement_rate or 0, 2)
        })

    return trends