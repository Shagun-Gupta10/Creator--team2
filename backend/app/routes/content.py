from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.content_service import create_content, get_all_content
from app.database import get_db
from app.schemas.content_schema import ContentCreate
from app.services.content_service import create_content
from app.auth.oauth2 import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/content")
def add_content(
    content: ContentCreate,
    db: Session = Depends(get_db)
):
    return create_content(content, db)

@router.get("/content")
def get_content(db: Session = Depends(get_db)):
    return get_all_content(db)

from app.services.content_service import (
    create_content,
    get_all_content,
    delete_content
)

@router.delete("/content/{content_id}")
def remove_content(
    content_id: int,
    db: Session = Depends(get_db)
):
    return delete_content(content_id, db)