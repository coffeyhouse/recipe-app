from sqlalchemy import Column, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class ShoppingListIngredient(Base):
    __tablename__ = "ShoppingListIngredients"

    ShoppingListIngredientID = Column(Integer, primary_key=True)
    ShoppingListID = Column(Integer, ForeignKey("ShoppingLists.ShoppingListID"), nullable=False)
    MealPlanRecipeID = Column(Integer, ForeignKey("MealPlanRecipes.MealPlanRecipeID"))
    IngredientID = Column(Integer, ForeignKey("Ingredients.IngredientID"), nullable=False)
    Quantity = Column(Float)
    UnitID = Column(Integer, ForeignKey("Units.UnitID"))
    IsManual = Column(Boolean)
    AlreadyHave = Column(Boolean)
    Purchased = Column(Boolean)

    shopping_list = relationship("ShoppingList", back_populates="ingredients")
    meal_plan_recipe = relationship("MealPlanRecipe", back_populates="shopping_list_ingredients")
    ingredient = relationship("Ingredient", back_populates="shopping_list_ingredients")
    unit = relationship("Unit", back_populates="shopping_list_ingredients")
