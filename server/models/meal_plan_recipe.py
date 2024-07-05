from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class MealPlanRecipe(Base):
    __tablename__ = "MealPlanRecipes"

    MealPlanRecipeID = Column(Integer, primary_key=True)
    MealPlanID = Column(Integer, ForeignKey("MealPlans.MealPlanID"), nullable=False)
    RecipeID = Column(Integer, ForeignKey("Recipes.RecipeID"), nullable=False)
    MealType = Column(String)
    Date = Column(Date, nullable=False)

    meal_plan = relationship("MealPlan", back_populates="recipes")
    recipe = relationship("Recipe", back_populates="meal_plan_recipes")
    shopping_list_ingredients = relationship("ShoppingListIngredient", back_populates="meal_plan_recipe")
