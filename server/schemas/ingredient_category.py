from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class IngredientCategoryBase(BaseModel):
    CategoryName: str

class IngredientCategoryCreate(IngredientCategoryBase):
    pass

class IngredientCategoryUpdate(IngredientCategoryBase):
    pass

class IngredientCategory(IngredientCategoryBase):
    CategoryID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode = True
