# schemas/ingredient_sub_category.py

from pydantic import BaseModel
from datetime import datetime

class IngredientSubCategoryBase(BaseModel):
    SubCategoryName: str
    CategoryID: int

class IngredientSubCategoryCreate(IngredientSubCategoryBase):
    pass

class IngredientSubCategoryUpdate(IngredientSubCategoryBase):
    pass

class IngredientSubCategory(IngredientSubCategoryBase):
    SubCategoryID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode: True
