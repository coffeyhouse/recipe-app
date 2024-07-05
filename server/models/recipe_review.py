from sqlalchemy import Column, Integer, Float, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class RecipeReview(Base):
    __tablename__ = "RecipeReviews"

    ReviewID = Column(Integer, primary_key=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    RecipeID = Column(Integer, ForeignKey("Recipes.RecipeID"), nullable=False)
    Rating = Column(Float, nullable=False)
    ReviewText = Column(String)
    CreatedAt = Column(TIMESTAMP)

    user = relationship("User", back_populates="reviews")
    recipe = relationship("Recipe", back_populates="reviews")
