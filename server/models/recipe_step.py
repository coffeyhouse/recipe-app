from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class RecipeStep(Base):
    __tablename__ = "RecipeSteps"

    StepID = Column(Integer, primary_key=True)
    RecipeID = Column(Integer, ForeignKey("Recipes.RecipeID"), nullable=False)
    StepNumber = Column(Integer, nullable=False)
    Description = Column(String, nullable=False)

    recipe = relationship("Recipe", back_populates="steps")
