from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.content import Content


def create_content(content, db: Session):
    new_content = Content(
        title=content.title,
        platform=content.platform,
        views=content.views,
        likes=content.likes,
        creator_id=1,
    )

    db.add(new_content)
    db.commit()
    db.refresh(new_content)

    return {"message": "Content added successfully", "content_id": new_content.id}


def get_all_content(db: Session):
    contents = db.query(Content).all()
    return contents


def delete_content(content_id, db: Session):
    content = db.query(Content).filter(Content.id == content_id).first()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    db.delete(content)
    db.commit()

    return {"message": "Content deleted successfully"}