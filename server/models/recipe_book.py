# models/recipe_book.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class RecipeBook(Base):
    __tablename__ = "RecipeBooks"

    BookID = Column(Integer, primary_key=True)
    AuthorID = Column(Integer, ForeignKey("RecipeAuthors.AuthorID"), nullable=False)
    BookName = Column(String, nullable=False)
    CoverArtURL = Column(String)

    author = relationship("RecipeAuthor", back_populates="books")
    recipes = relationship("Recipe", back_populates="book")
