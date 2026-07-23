from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.rbac import require_role
from app.models.user import User

from app.schemas.content_schema import ContentCreate, ContentUpdate

from app.services.content_service import (
    create_content,
    get_all_content,
    get_content_by_id,
    update_content,
    delete_content,
    search_content,
    filter_content,
    get_paginated_content,
    dashboard,
    get_content_analytics,
    get_top_content,
    get_platform_analytics,
    get_content_trends,
    compare_content,
)

router = APIRouter()


# Create Content
@router.post("/")
def create_new_content(
    content: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return create_content(content, db, current_user)


# Get All Content
@router.get("/")
def get_all_content_api(
    platform: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    sort_by: str = "created_at",
    order: str = "desc",
    period: str = "30d",
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_all_content(
        db,
        current_user,
        platform,
        search,
        page,
        limit,
        sort_by,
        order,
        period,
    )


# Search Content
@router.get("/search/")
def search(
    title: str,
    db: Session = Depends(get_db),
):
    return search_content(title, db)


# Filter Content
@router.get("/filter/")
def filter_platform(
    platform: str,
    db: Session = Depends(get_db),
):
    return filter_content(platform, db)


# Pagination
@router.get("/page/")
def pagination(
    page: int = 1,
    limit: int = 5,
    db: Session = Depends(get_db),
):
    return get_paginated_content(page, limit, db)


# Dashboard
@router.get("/dashboard/")
def dashboard_data(
    db: Session = Depends(get_db),
):
    return dashboard(db)


# Get Content By ID
@router.get("/{content_id}")
def get_single_content(
    content_id: int,
    db: Session = Depends(get_db),
):
    return get_content_by_id(content_id, db)


# Update Content
@router.put("/{content_id}")
def update_existing_content(
    content_id: int,
    content: ContentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return update_content(content_id, content, db, current_user)


# Delete Content
@router.delete("/{content_id}")
def remove_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return delete_content(content_id, db, current_user)


# Content Analytics
@router.get("/analytics")
def content_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_content_analytics(db, current_user)


# Top Content
@router.get("/top")
def top_content(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_top_content(db, current_user)


# Platform Analytics
@router.get("/platforms")
def platform_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_platform_analytics(db, current_user)


# Content Trends
@router.get("/trends")
def content_trends(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_content_trends(db, current_user)


# Compare Content
@router.get("/compare")
def compare_two_contents(
    content1: int,
    content2: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return compare_content(db, content1, content2, current_user)