
from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import func, desc, asc
from app.models.content import Content
from app.models.user import User
from app.auth.oauth2 import get_current_user
from datetime import datetime, timedelta


def _get_period_bounds(period: str | None = None):
    if not period:
        return None, None

    key = (period or "30d").lower()
    now = datetime.utcnow()

    if key in {"7d", "7", "last7", "last7days"}:
        return now - timedelta(days=7), now
    if key in {"30d", "30", "last30", "last30days"}:
        return now - timedelta(days=30), now
    if key in {"90d", "90", "last90", "last90days"}:
        return now - timedelta(days=90), now
    if key in {"prev7d", "previous7d"}:
        return now - timedelta(days=14), now - timedelta(days=7)
    if key in {"prev30d", "previous30d"}:
        return now - timedelta(days=60), now - timedelta(days=30)
    if key in {"prev90d", "previous90d"}:
        return now - timedelta(days=180), now - timedelta(days=90)

    return None, None


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


def serialize_content(content: Content):
    return {
        "id": content.id,
        "title": content.title,
        "platform": content.platform,
        "views": content.views,
        "likes": content.likes,
        "comments": content.comments,
        "shares": content.shares,
        "saves": content.saves,
        "watch_time": content.watch_time,
        "reach": content.reach,
        "engagement_rate": content.engagement_rate,
        "created_at": content.created_at.isoformat() if content.created_at else None,
        "creator_id": content.creator_id,
    }


def get_all_content(
    db: Session,
    current_user: User,
    platform=None,
    search=None,
    page=1,
    limit=10,
    sort_by="created_at",
    order="desc",
    period="30d",
):
    query = db.query(Content)

    if current_user.role == "creator":
        query = query.filter(Content.creator_id == current_user.id)

    if platform:
        query = query.filter(Content.platform == platform)

    if search:
        query = query.filter(Content.title.ilike(f"%{search}%"))

    start_date, end_date = _get_period_bounds(period)
    if start_date:
        query = query.filter(Content.created_at >= start_date)
    if end_date:
        query = query.filter(Content.created_at < end_date)

    allowed_sort_fields = {
        "views": Content.views,
        "likes": Content.likes,
        "comments": Content.comments,
        "engagement_rate": Content.engagement_rate,
        "created_at": Content.created_at,
    }

    sort_column = allowed_sort_fields.get(
        sort_by,
        Content.created_at,
    )

    if order.lower() == "asc":
        query = query.order_by(asc(sort_column))
    else:
        query = query.order_by(desc(sort_column))

    total = query.count()

    results = (
        query.offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": [serialize_content(item) for item in results],
    }



def delete_content(content_id, db: Session, current_user: "User"):
    content = db.query(Content).filter(Content.id == content_id).first()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    if current_user.role == "creator" and content.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this content")

    db.delete(content)
    db.commit()

    return {"message": "Content deleted successfully"}

def get_content_analytics(db: Session, current_user: User):

    query = db.query(Content)

    if current_user.role == "creator":
        query = query.filter(Content.creator_id == current_user.id)

    contents = query.all()

    if not contents:
        return {
            "message": "No content available."
        }

    total_posts = len(contents)

    total_views = sum(c.views or 0 for c in contents)
    total_likes = sum(c.likes or 0 for c in contents)
    total_comments = sum(c.comments or 0 for c in contents)
    total_shares = sum(c.shares or 0 for c in contents)
    total_reach = sum(c.reach or 0 for c in contents)

    avg_views = total_views / total_posts
    avg_likes = total_likes / total_posts
    avg_comments = total_comments / total_posts

    avg_engagement = (
        sum(c.engagement_rate or 0 for c in contents)
        / total_posts
    )

    best_post = max(
        contents,
        key=lambda c: c.engagement_rate or 0
    )

    worst_post = min(
        contents,
        key=lambda c: c.engagement_rate or 0
    )

    platform_distribution = {}

    for content in contents:
        platform_distribution[content.platform] = (
            platform_distribution.get(content.platform, 0) + 1
        )

    return {
        "summary": {
            "total_posts": total_posts,
            "total_views": total_views,
            "total_likes": total_likes,
            "total_comments": total_comments,
            "total_shares": total_shares,
            "total_reach": total_reach
        },

        "averages": {
            "average_views": round(avg_views, 2),
            "average_likes": round(avg_likes, 2),
            "average_comments": round(avg_comments, 2),
            "average_engagement_rate": round(avg_engagement, 2)
        },

        "best_post": {
            "title": best_post.title,
            "platform": best_post.platform,
            "engagement_rate": round(best_post.engagement_rate, 2),
            "views": best_post.views,
            "likes": best_post.likes
        },

        "worst_post": {
            "title": worst_post.title,
            "platform": worst_post.platform,
            "engagement_rate": round(worst_post.engagement_rate, 2),
            "views": worst_post.views,
            "likes": worst_post.likes
        },

        "platform_distribution": platform_distribution
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

def compare_content(
    db: Session,
    content1: int,
    content2: int,
    current_user: "User",
):
    query = db.query(Content)

    if current_user.role == "creator":
        query = query.filter(
            Content.creator_id == current_user.id
        )

    first = query.filter(Content.id == content1).first()
    second = query.filter(Content.id == content2).first()

    if not first or not second:
        return {
            "message": "One or both content records not found."
        }

    return {
        "content_1": {
            "title": first.title,
            "views": first.views,
            "likes": first.likes,
            "comments": first.comments,
            "shares": first.shares,
            "reach": first.reach,
            "engagement_rate": first.engagement_rate,
        },
        "content_2": {
            "title": second.title,
            "views": second.views,
            "likes": second.likes,
            "comments": second.comments,
            "shares": second.shares,
            "reach": second.reach,
            "engagement_rate": second.engagement_rate,
        },
    }

def update_content(
    content_id: int,
    content_data,
    db: Session,
    current_user: User,
):
    content = db.query(Content).filter(Content.id == content_id).first()

    if not content:
        raise HTTPException(
            status_code=404,
            detail="Content not found"
        )

    if (
        current_user.role == "creator"
        and content.creator_id != current_user.id
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update this content"
        )

    update_data = content_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(content, key, value)

    if content.reach and content.reach > 0:
        content.engagement_rate = (
            (
                content.likes
                + content.comments
                + content.shares
            )
            / content.reach
        ) * 100
    else:
        content.engagement_rate = 0

    db.commit()
    db.refresh(content)

    return {
        "message": "Content updated successfully",
        "content": content
    }
