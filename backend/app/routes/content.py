from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.rbac import require_role
from app.models.user import User

from app.schemas.content_schema import (
    ContentCreate,
    ContentUpdate,
)

from app.services.content_service import (
    create_content,
    get_all_content,
    delete_content,
    get_content_analytics,
    get_top_content,
    get_platform_analytics,
    get_content_trends,
    compare_content,
    update_content,
)

router = APIRouter()


@router.post("/content")
def add_content(
    content: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return create_content(content, db, current_user)


@router.get("/content")
def get_content(
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


@router.delete("/content/{content_id}")
def remove_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return delete_content(content_id, db, current_user)


@router.get("/content/analytics")
def content_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_content_analytics(db, current_user)


@router.get("/content/top")
def top_content(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_top_content(db, current_user)


@router.get("/content/platforms")
def platform_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_platform_analytics(db, current_user)


@router.get("/content/trends")
def content_trends(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return get_content_trends(db, current_user)


@router.get("/content/compare")
def compare_two_contents(
    content1: int,
    content2: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return compare_content(db, content1, content2, current_user)


@router.put("/content/{content_id}")
def edit_content(
    content_id: int,
    content: ContentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(["creator", "agency", "marketing_team", "administrator"])
    ),
):
    return update_content(content_id, content, db, current_user)