# schemas/meal_plan.py
from pydantic import BaseModel
from datetime import datetime, date
from typing import List, Optional

class MealPlanBase(BaseModel):
    UserID: int
    PlanName: Optional[str] = None
    StartDate: Optional[date] = None
    EndDate: Optional[date] = None

class MealPlanCreate(MealPlanBase):
    pass

class MealPlanUpdate(MealPlanBase):
    pass

class MealPlan(MealPlanBase):
    MealPlanID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode = True
