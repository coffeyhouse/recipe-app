from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class RecipeTag(Base):
    __tablename__ = "RecipeTags"

    RecipeTagID = Column(Integer, primary_key=True)
    RecipeID = Column(Integer, ForeignKey("Recipes.RecipeID"), nullable=False)
    TagID = Column(Integer, ForeignKey("Tags.TagID"), nullable=False)

    recipe = relationship("Recipe", back_populates="tags")
    tag = relationship("Tag", back_populates="recipes")
