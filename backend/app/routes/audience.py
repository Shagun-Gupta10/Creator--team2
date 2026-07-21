from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User

from app.schemas.audience_schema import (
    AudienceCreate,
)



from app.auth.rbac import require_role

from app.services.audience_service import (
    create_audience,
    get_all_audience,
    get_audience_analytics,
    get_audience_demographics,
    get_audience_growth

)


router = APIRouter(tags=["Audience"])


@router.post("/audience")
def add_audience(
    audience: AudienceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(
            ["creator", "agency", "administrator"]
        )
    ),
):
    return create_audience(
        db,
        audience,
        current_user,
    )


@router.get("/audience")
def audience_list(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(
            [
                "creator",
                "agency",
                "marketing_team",
                "administrator",
            ]
        )
    ),
):
    return get_all_audience(
        db,
        current_user,
    )

@router.get("/audience/analytics")
def audience_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(
            [
                "creator",
                "agency",
                "marketing_team",
                "administrator",
            ]
        )
    ),
):
    return get_audience_analytics(
        db,
        current_user,
    )

@router.get("/audience/demographics")
def audience_demographics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(
            [
                "creator",
                "agency",
                "marketing_team",
                "administrator",
            ]
        )
    ),
):
    return get_audience_demographics(
        db,
        current_user,
    )

@router.get("/audience/growth")
def audience_growth(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role(
            [
                "creator",
                "agency",
                "marketing_team",
                "administrator",
            ]
        )
    ),
):
    return get_audience_growth(
        db,
        current_user,
    )