from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Unit(Base):
    __tablename__ = "Units"

    UnitID = Column(Integer, primary_key=True)
    UnitName = Column(String, nullable=False, unique=True)
    Abbreviation = Column(String, nullable=False, unique=True)
    
    recipe_ingredients = relationship("RecipeIngredient", back_populates="unit")
    shopping_list_ingredients = relationship("ShoppingListIngredient", back_populates="unit")
    unit_conversions_from = relationship("UnitConversion", foreign_keys="[UnitConversion.FromUnitID]", back_populates="from_unit")
    unit_conversions_to = relationship("UnitConversion", foreign_keys="[UnitConversion.ToUnitID]", back_populates="to_unit")
