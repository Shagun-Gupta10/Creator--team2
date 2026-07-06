from fastapi import APIRouter, Depends
from app.schemas.user_schema import UserCreate
from app.schemas.login_schema import LoginRequest
from app.services.auth_service import register_user, login_user
from sqlalchemy.orm import Session
from app.database import get_db
router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user,db)

@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    return login_user(user, db)