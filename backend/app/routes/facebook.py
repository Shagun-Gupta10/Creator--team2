@router.get("/dashboard")
def facebook_dashboard(
    db: Session = Depends(get_db)
):
    creator_profile = db.query(CreatorProfile).filter(
        CreatorProfile.user_id == 1
    ).first()

    if not creator_profile:
        return {
            "connected": False
        }

    return {
        "connected": bool(creator_profile.facebook_page_id),
        "page_id": creator_profile.facebook_page_id,
        "page_name": creator_profile.facebook_page_name,
        "followers": creator_profile.facebook_followers or 0,
    }