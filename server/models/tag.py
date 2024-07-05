from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Tag(Base):
    __tablename__ = "Tags"

    TagID = Column(Integer, primary_key=True)
    TagName = Column(String, nullable=False, unique=True)

    recipes = relationship("RecipeTag", back_populates="tag")
