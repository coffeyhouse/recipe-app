# schemas/meal_plan_recipe.py
from pydantic import BaseModel
from datetime import date

class MealPlanRecipeBase(BaseModel):
    MealPlanID: int
    RecipeID: int
    MealType: str
    Date: date

class MealPlanRecipeCreate(MealPlanRecipeBase):
    pass

class MealPlanRecipeUpdate(MealPlanRecipeBase):
    pass

class MealPlanRecipe(MealPlanRecipeBase):
    MealPlanRecipeID: int

    class Config:
        orm_mode = True
