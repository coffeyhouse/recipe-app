from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Ingredient(Base):
    __tablename__ = "Ingredients"

    IngredientID = Column(Integer, primary_key=True)
    SubCategoryID = Column(Integer, ForeignKey("IngredientSubCategories.SubCategoryID"), nullable=False)
    IngredientName = Column(String, nullable=False)
    PurchaseUnitID = Column(Integer, ForeignKey("Units.UnitID"))
    PurchaseWeightVolume = Column(Float)
    PurchaseWeightUnitID = Column(Integer, ForeignKey("Units.UnitID"))
    CreatedAt = Column(TIMESTAMP)
    UpdatedAt = Column(TIMESTAMP)

    subcategory = relationship("IngredientSubCategory", back_populates="ingredients")
    recipes = relationship("RecipeIngredient", back_populates="ingredient")
    shopping_list_ingredients = relationship("ShoppingListIngredient", back_populates="ingredient")
