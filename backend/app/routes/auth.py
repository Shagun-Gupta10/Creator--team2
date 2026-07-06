from fastapi import APIRouter
from app.schemas.user_schema import UserCreate
from app.services.auth_service import register_user
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user,db)

