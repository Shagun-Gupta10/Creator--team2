from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.content import Content


from app.auth.oauth2 import get_current_user


def create_content(content, db: Session, current_user: "User"):
    new_content = Content(
        title=content.title,
        platform=content.platform,
        views=content.views,
        likes=content.likes,
        creator_id=current_user.id,
    )

    db.add(new_content)
    db.commit()
    db.refresh(new_content)

    return {"message": "Content added successfully", "content_id": new_content.id}


def get_all_content(db: Session, current_user: "User"):
    if current_user.role == "creator":
        return db.query(Content).filter(Content.creator_id == current_user.id).all()

    # Non-creators (agency/marketing/admin) see global content in this MVP
    return db.query(Content).all()



def delete_content(content_id, db: Session, current_user: "User"):
    content = db.query(Content).filter(Content.id == content_id).first()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    if current_user.role == "creator" and content.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this content")

    db.delete(content)
    db.commit()

    return {"message": "Content deleted successfully"}
