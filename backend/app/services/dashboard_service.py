from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.content import Content


def get_dashboard_summary(db: Session):

    total_posts = db.query(Content).count()

    total_views = db.query(
        func.sum(Content.views)
    ).scalar() or 0

    total_likes = db.query(
        func.sum(Content.likes)
    ).scalar() or 0

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