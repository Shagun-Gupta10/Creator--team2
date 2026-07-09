from typing import List
from sqlalchemy import func
from sqlalchemy.orm import Session

from app import models, schemas


def compute_summary(events: List[models.AnalyticsEvent]) -> schemas.DashboardSummary:
    total_views = sum(e.views for e in events)
    total_likes = sum(e.likes for e in events)
    total_comments = sum(e.comments for e in events)
    total_shares = sum(e.shares for e in events)
    total_revenue = sum(e.revenue for e in events)
    engagement = total_likes + total_comments + total_shares
    engagement_rate = round((engagement / total_views) * 100, 2) if total_views else 0.0

    return schemas.DashboardSummary(
        total_views=total_views,
        total_likes=total_likes,
        total_comments=total_comments,
        total_shares=total_shares,
        total_revenue=round(total_revenue, 2),
        total_content_pieces=len(events),
        engagement_rate=engagement_rate,
    )


def get_creator_summary(db: Session, owner_id: int) -> schemas.DashboardSummary:
    events = (
        db.query(models.AnalyticsEvent)
        .filter(models.AnalyticsEvent.owner_id == owner_id)
        .all()
    )
    return compute_summary(events)


def get_platform_breakdown(db: Session, owner_id: int) -> List[schemas.PlatformBreakdown]:
    rows = (
        db.query(
            models.AnalyticsEvent.platform,
            func.sum(models.AnalyticsEvent.views).label("views"),
            func.sum(models.AnalyticsEvent.likes).label("likes"),
            func.sum(models.AnalyticsEvent.revenue).label("revenue"),
        )
        .filter(models.AnalyticsEvent.owner_id == owner_id)
        .group_by(models.AnalyticsEvent.platform)
        .all()
    )
    return [
        schemas.PlatformBreakdown(
            platform=r.platform,
            views=r.views or 0,
            likes=r.likes or 0,
            revenue=round(r.revenue or 0.0, 2),
        )
        for r in rows
    ]


def get_platform_wide_summary(db: Session) -> schemas.DashboardSummary:
    """Admin-only: aggregate analytics across ALL creators."""
    events = db.query(models.AnalyticsEvent).all()
    return compute_summary(events)
