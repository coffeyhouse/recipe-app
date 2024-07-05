from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class RecipeAuthor(Base):
    __tablename__ = "RecipeAuthors"

    AuthorID = Column(Integer, primary_key=True)
    AuthorName = Column(String, nullable=False)
    AuthorImageURL = Column(String)

    books = relationship("RecipeBook", back_populates="author")
    recipes = relationship("Recipe", back_populates="author")
