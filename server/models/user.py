from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from .base import Base

class User(Base):
    __tablename__ = 'Users'
    UserID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Username = Column(String, unique=True, index=True, nullable=False)
    PasswordHash = Column(String, nullable=False)
    Email = Column(String, unique=True, index=True, nullable=False)
    CreatedAt = Column(DateTime, default=datetime.utcnow)
    UpdatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    recipes = relationship("Recipe", back_populates="user")
    meal_plans = relationship("MealPlan", back_populates="user")
    reviews = relationship("RecipeReview", back_populates="user")
    shopping_lists = relationship("ShoppingList", back_populates="user")
