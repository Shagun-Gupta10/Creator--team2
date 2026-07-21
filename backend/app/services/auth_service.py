from app.models.user import User
from app.auth.password import hash_password,verify_password
from app.auth.jwt_handler import create_access_token
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserUpdate
from app.schemas.user_schema import ChangePassword
import re

def validate_password(password: str):
    if len(password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long"
        )

    if not re.search(r"[A-Z]", password):
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least one uppercase letter"
        )

    if not re.search(r"[a-z]", password):
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least one lowercase letter"
        )

    if not re.search(r"\d", password):
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least one digit"
        )

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least one special character"
        )
def register_user(user, db):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
    status_code=409,
    detail="Email already registered"
)
    
    allowed_roles = [
    "Creator",
    "Agency",
    "Marketing Team",
    "Administrator"
]
    if user.role not in allowed_roles:
        raise HTTPException(
            status_code=400,
            detail=f"Role must be one of {allowed_roles}"
        )
    validate_password(user.password)
    hashed_password = hash_password(user.password)
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role,
        creator_id=user.creator_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "id": new_user.id
    }

def login_user(user, db):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        raise HTTPException(
    status_code=404,
    detail="User not found"
)

    if not verify_password(user.password, existing_user.password):
        raise HTTPException(
    status_code=401,
    detail="Incorrect password"
)

    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
    
def login_oauth(form_data, db):

    existing_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        form_data.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )

    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
    
def update_profile(
    current_user: User,
    user: UserUpdate,
    db: Session
):
    # Check if another user already has this email
    existing_user = (
        db.query(User)
        .filter(User.email == user.email, User.id != current_user.id)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email is already in use by another account"
        )

    current_user.name = user.name
    current_user.email = user.email

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "role": current_user.role
        }
    }

def change_password(
    current_user: User,
    password_data: ChangePassword,
    db: Session
):
    # Verify old password
    if not verify_password(password_data.old_password, current_user.password):
        return {"message": "Old password is incorrect"}

    # Hash the new password
    validate_password(password_data.new_password)
    current_user.password = hash_password(password_data.new_password)

    db.commit()
    db.refresh(current_user)

    return {"message": "Password changed successfully"}