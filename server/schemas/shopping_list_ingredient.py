# schemas/shopping_list_ingredient.py
from pydantic import BaseModel
from typing import Optional

class ShoppingListIngredientBase(BaseModel):
    ShoppingListID: int
    MealPlanRecipeID: Optional[int]
    IngredientID: int
    Quantity: Optional[float]
    UnitID: Optional[int]
    IsManual: Optional[bool]
    AlreadyHave: Optional[bool]
    Purchased: Optional[bool]

class ShoppingListIngredientCreate(ShoppingListIngredientBase):
    pass

class ShoppingListIngredientUpdate(ShoppingListIngredientBase):
    pass

class ShoppingListIngredient(ShoppingListIngredientBase):
    ShoppingListIngredientID: int

    class Config:
        orm_mode = True
