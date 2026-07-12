from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.content_service import create_content, get_all_content
from app.database import get_db
from app.schemas.content_schema import ContentCreate
from app.auth.oauth2 import get_current_user
from app.auth.rbac import require_role
from app.models.user import User


router = APIRouter()

@router.post("/content")
def add_content(
    content: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["creator", "agency", "marketing_team", "administrator"])),
):
    return create_content(content, db, current_user)


@router.get("/content")
def get_content(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["creator", "agency", "marketing_team", "administrator"])),
):
    return get_all_content(db, current_user)


from app.services.content_service import (
    create_content,
    get_all_content,
    delete_content
)

@router.delete("/content/{content_id}")
def remove_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["creator", "agency", "marketing_team", "administrator"])),
):
    return delete_content(content_id, db, current_user)

