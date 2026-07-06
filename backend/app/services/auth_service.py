from app.models.user import User
from app.auth.password import hash_password,verify_password
from app.auth.jwt_handler import create_access_token
def register_user(user, db):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }
    hashed_password = hash_password(user.password)
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
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
        return {
            "message": "User not found"
        }

    if not verify_password(user.password, existing_user.password):
        return {
            "message": "Incorrect password"
        }

    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
    

    