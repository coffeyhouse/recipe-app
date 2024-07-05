from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RecipeBase(BaseModel):
    RecipeName: str
    AuthorID: Optional[int] = None
    BookID: Optional[int] = None
    PageNumber: Optional[int] = None
    OnlineURL: Optional[str] = None
    CookTime: Optional[int] = None
    Difficulty: Optional[str] = None
    Type: Optional[str] = None
    ImageURL: Optional[str] = None
    Servings: Optional[int] = None
    Cuisine: Optional[str] = None

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    RecipeID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode = True
