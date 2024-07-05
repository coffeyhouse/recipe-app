from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class RecipeIngredientSection(Base):
    __tablename__ = "RecipeIngredientSections"

    SectionID = Column(Integer, primary_key=True)
    RecipeID = Column(Integer, ForeignKey("Recipes.RecipeID"), nullable=False)
    SectionName = Column(String, nullable=False)

    recipe = relationship("Recipe", back_populates="sections")
    ingredients = relationship("RecipeIngredient", back_populates="section")
