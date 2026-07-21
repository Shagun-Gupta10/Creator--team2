from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.dashboard_service import get_dashboard_summary
from app.auth.oauth2 import get_current_user
from app.auth.rbac import require_role
from app.models.user import User
from fastapi import APIRouter
from app.services.dashboard_service import get_instagram_dashboard

router = APIRouter()
router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["creator", "agency", "marketing_team", "administrator"])),
):
    return get_dashboard_summary(db, current_user)

@router.get("/instagram")
def instagram_dashboard():
    return get_instagram_dashboard()