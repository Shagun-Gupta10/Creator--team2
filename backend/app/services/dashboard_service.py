from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.content import Content


def get_dashboard_summary(db: Session, current_user: "User"):
    if current_user.role == "creator":
        q = db.query(Content).filter(Content.creator_id == current_user.id)
    else:
        q = db.query(Content)

    total_posts = q.count()

    total_views = q.with_entities(func.sum(Content.views)).scalar() or 0

    total_likes = q.with_entities(func.sum(Content.likes)).scalar() or 0

    engagement_rate = 0

    if total_views > 0:
        engagement_rate = round(
            (total_likes / total_views) * 100,
            2
        )

    return {
        "total_posts": total_posts,
        "total_views": total_views,
        "total_likes": total_likes,
        "engagement_rate": engagement_rate
    }