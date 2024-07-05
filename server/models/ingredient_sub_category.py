from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class IngredientSubCategory(Base):
    __tablename__ = "IngredientSubCategories"

    SubCategoryID = Column(Integer, primary_key=True)
    CategoryID = Column(Integer, ForeignKey("IngredientCategories.CategoryID"), nullable=False)
    SubCategoryName = Column(String, nullable=False)
    CreatedAt = Column(TIMESTAMP)
    UpdatedAt = Column(TIMESTAMP)

    category = relationship("IngredientCategory", back_populates="subcategories")
    ingredients = relationship("Ingredient", order_by="Ingredient.IngredientID", back_populates="subcategory")
