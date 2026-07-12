from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.database import Base, engine
from app.models.user import User
from app.models.content import Content
from app.routes.content import router as content_router
from app.routes.dashboard import router as dashboard_router
from app.routes.settings import router as settings_router


# Create tables if they don't exist yet
Base.metadata.create_all(bind=engine, checkfirst=True)


app = FastAPI()

# Allow frontend dev server calls (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # Vite dev server defaults to 5173, but can change when ports are busy.
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(content_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "Backend running successfully"}


