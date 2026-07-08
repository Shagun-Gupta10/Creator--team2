from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.database import Base, engine
from app.models.user import User
from app.models.content import Content
from app.routes.content import router as content_router
from app.routes.dashboard import router as dashboard_router
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(dashboard_router)
@app.get("/")
def home():
    return {"message": "Backend running successfully"}

