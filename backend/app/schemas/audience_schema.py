from pydantic import BaseModel, Field


class AudienceCreate(BaseModel):
    country: str
    age_group: str
    gender: str

    followers: int = Field(..., ge=0)

    growth_rate: float = Field(..., ge=0)


class AudienceResponse(BaseModel):
    id: int
    country: str
    age_group: str
    gender: str
    followers: int
    growth_rate: float

    class Config:
        from_attributes = True