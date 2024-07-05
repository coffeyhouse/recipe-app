# schemas/shopping_list.py
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ShoppingListBase(BaseModel):
    UserID: int

class ShoppingListCreate(ShoppingListBase):
    pass

class ShoppingListUpdate(ShoppingListBase):
    pass

class ShoppingList(ShoppingListBase):
    ShoppingListID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode = True
