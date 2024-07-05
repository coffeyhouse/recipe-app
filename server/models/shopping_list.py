from sqlalchemy import Column, Integer, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class ShoppingList(Base):
    __tablename__ = "ShoppingLists"

    ShoppingListID = Column(Integer, primary_key=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    CreatedAt = Column(TIMESTAMP)
    UpdatedAt = Column(TIMESTAMP)

    user = relationship("User", back_populates="shopping_lists")
    ingredients = relationship("ShoppingListIngredient", back_populates="shopping_list")
