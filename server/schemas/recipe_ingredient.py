# schemas/recipe_ingredient.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RecipeIngredientBase(BaseModel):
    RecipeID: int
    IngredientID: int
    SectionID: Optional[int] = None
    Quantity: Optional[float] = None
    UnitID: Optional[int] = None

class RecipeIngredientCreate(RecipeIngredientBase):
    pass

class RecipeIngredientUpdate(RecipeIngredientBase):
    pass

class RecipeIngredient(RecipeIngredientBase):
    RecipeIngredientID: int

    class Config:
        orm_mode = True
