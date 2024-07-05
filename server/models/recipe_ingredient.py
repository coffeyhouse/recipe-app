from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class RecipeIngredient(Base):
    __tablename__ = "RecipeIngredients"

    RecipeIngredientID = Column(Integer, primary_key=True)
    RecipeID = Column(Integer, ForeignKey("Recipes.RecipeID"), nullable=False)
    IngredientID = Column(Integer, ForeignKey("Ingredients.IngredientID"), nullable=False)
    SectionID = Column(Integer, ForeignKey("RecipeIngredientSections.SectionID"))
    Quantity = Column(Float)
    UnitID = Column(Integer, ForeignKey("Units.UnitID"))

    recipe = relationship("Recipe", back_populates="ingredients")
    ingredient = relationship("Ingredient", back_populates="recipes")
    section = relationship("RecipeIngredientSection", back_populates="ingredients")
    unit = relationship("Unit", back_populates="recipe_ingredients")
