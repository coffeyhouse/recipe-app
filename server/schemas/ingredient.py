from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class IngredientBase(BaseModel):
    IngredientName: str
    PurchaseWeightVolume: float
    PurchaseUnitID: Optional[int]
    SubCategoryID: int
    PurchaseWeightUnitID: Optional[int]

class IngredientCreate(IngredientBase):
    pass

class IngredientUpdate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    IngredientID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode = True
