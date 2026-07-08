from fastapi import APIRouter, Depends
from app.schemas.user_schema import UserCreate
from app.schemas.login_schema import LoginRequest
from app.services.auth_service import register_user, login_user
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.oauth2 import get_current_user
from app.models.user import User
router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user,db)

@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    return login_user(user, db)
@router.get("/profile")
def profile(current_user: User = Depends(get_current_user)):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }
