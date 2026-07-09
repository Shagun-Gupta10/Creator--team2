from datetime import timedelta
from typing import List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import models, schemas, auth, analytics
from app.database import engine, get_db, Base

# Create tables on startup (use Alembic migrations in production)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Creator Analytics Dashboard API",
    description="Authentication + role-based access + analytics dashboard backend",
    version="1.0.0",
)

# Allow the React frontend (running on a different port) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================================
# AUTH ROUTES
# ==========================================================================

@app.post("/auth/register", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED, tags=["auth"])
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.username == user_in.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(models.User).filter(models.User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=auth.get_password_hash(user_in.password),
        role=user_in.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post("/auth/login", response_model=schemas.Token, tags=["auth"])
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    OAuth2-compatible login. Send as form data: username, password.
    Returns a JWT bearer token to use in the Authorization header:
        Authorization: Bearer <token>
    """
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(
        data={"sub": user.username, "role": user.role.value},
        expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return schemas.Token(access_token=access_token, role=user.role, username=user.username)


@app.get("/auth/me", response_model=schemas.UserOut, tags=["auth"])
def read_current_user(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


# ==========================================================================
# USER MANAGEMENT (admin only)
# ==========================================================================

@app.get("/users", response_model=List[schemas.UserOut], tags=["users"])
def list_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles("admin")),
):
    return db.query(models.User).all()


# ==========================================================================
# ANALYTICS EVENT INGESTION (creator + admin)
# ==========================================================================

@app.post("/analytics/events", response_model=schemas.AnalyticsEventOut, status_code=201, tags=["analytics"])
def create_event(
    event_in: schemas.AnalyticsEventCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles("admin", "creator")),
):
    event = models.AnalyticsEvent(**event_in.model_dump(), owner_id=current_user.id)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@app.get("/analytics/events", response_model=List[schemas.AnalyticsEventOut], tags=["analytics"])
def list_my_events(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return (
        db.query(models.AnalyticsEvent)
        .filter(models.AnalyticsEvent.owner_id == current_user.id)
        .order_by(models.AnalyticsEvent.recorded_at.desc())
        .all()
    )


# ==========================================================================
# DASHBOARD ENDPOINTS
# ==========================================================================

@app.get("/dashboard/summary", response_model=schemas.DashboardSummary, tags=["dashboard"])
def my_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    """Any authenticated user sees their own analytics summary."""
    return analytics.get_creator_summary(db, current_user.id)


@app.get("/dashboard/platform-breakdown", response_model=List[schemas.PlatformBreakdown], tags=["dashboard"])
def my_platform_breakdown(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return analytics.get_platform_breakdown(db, current_user.id)


@app.get("/dashboard/creator/{creator_id}", response_model=schemas.CreatorSummary, tags=["dashboard"])
def creator_dashboard(
    creator_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    """
    A creator can view only their own dashboard. Admins can view any creator's dashboard.
    This demonstrates row-level, role-aware access control.
    """
    if current_user.role != models.RoleEnum.admin and current_user.id != creator_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this creator's dashboard")

    creator = db.query(models.User).filter(models.User.id == creator_id).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    summary = analytics.get_creator_summary(db, creator_id)
    return schemas.CreatorSummary(creator_id=creator.id, username=creator.username, summary=summary)


@app.get("/dashboard/admin/overview", response_model=schemas.DashboardSummary, tags=["dashboard"])
def admin_overview(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles("admin")),
):
    """Admin-only: platform-wide analytics across every creator."""
    return analytics.get_platform_wide_summary(db)


@app.get("/", tags=["health"])
def health_check():
    return {"status": "ok", "service": "Creator Analytics Dashboard API"}
