from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    creator_id: int | None = None

class UserUpdate(BaseModel):
    name: str
    email: str

class ChangePassword(BaseModel):
    old_password: str
    new_password: str



