from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship
from .base import Base
from datetime import datetime

class IngredientCategory(Base):
    __tablename__ = "IngredientCategories"

    CategoryID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    CategoryName = Column(String, nullable=False, unique=True)
    CreatedAt = Column(TIMESTAMP, default=datetime.utcnow)
    UpdatedAt = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    subcategories = relationship("IngredientSubCategory", order_by="IngredientSubCategory.SubCategoryID", back_populates="category")
