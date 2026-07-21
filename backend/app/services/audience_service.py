from sqlalchemy.orm import Session

from app.models.audience import Audience
from app.models.user import User

from app.schemas.audience_schema import AudienceCreate


def create_audience(
    db: Session,
    audience: AudienceCreate,
    current_user: User,
):

    new_audience = Audience(
        country=audience.country,
        age_group=audience.age_group,
        gender=audience.gender,
        followers=audience.followers,
        growth_rate=audience.growth_rate,
        creator_id=current_user.id,
    )

    db.add(new_audience)
    db.commit()
    db.refresh(new_audience)

    return new_audience


def get_all_audience(
    db: Session,
    current_user: User,
):

    query = db.query(Audience)

    if current_user.role == "creator":
        query = query.filter(
            Audience.creator_id == current_user.id
        )

    return query.all()

def get_audience_analytics(
    db: Session,
    current_user: User,
):

    query = db.query(Audience)

    if current_user.role == "creator":
        query = query.filter(
            Audience.creator_id == current_user.id
        )

    audience = query.all()

    total_records = len(audience)

    total_followers = sum(
        item.followers or 0
        for item in audience
    )

    average_growth_rate = (
        sum(item.growth_rate or 0 for item in audience)
        / total_records
        if total_records
        else 0
    )

    return {
        "total_records": total_records,
        "total_followers": total_followers,
        "average_growth_rate": round(
            average_growth_rate,
            2,
        ),
    }

def get_audience_demographics(
    db: Session,
    current_user: User,
):

    query = db.query(Audience)

    if current_user.role == "creator":
        query = query.filter(
            Audience.creator_id == current_user.id
        )

    audience = query.all()

    return [
        {
            "country": person.country,
            "age_group": person.age_group,
            "gender": person.gender,
            "followers": person.followers,
            "growth_rate": person.growth_rate,
        }
        for person in audience
    ]

def get_audience_growth(
    db: Session,
    current_user: User,
):

    query = db.query(Audience)

    if current_user.role == "creator":
        query = query.filter(
            Audience.creator_id == current_user.id
        )

    audience = (
        query.order_by(Audience.created_at.asc())
        .all()
    )

    return [
        {
            "date": item.created_at.strftime("%Y-%m-%d"),
            "followers": item.followers,
            "growth_rate": item.growth_rate,
        }
        for item in audience
    ]