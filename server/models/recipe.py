from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Recipe(Base):
    __tablename__ = "Recipes"

    RecipeID = Column(Integer, primary_key=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"))
    RecipeName = Column(String, nullable=False)
    AuthorID = Column(Integer, ForeignKey("RecipeAuthors.AuthorID"))
    BookID = Column(Integer, ForeignKey("RecipeBooks.BookID"))
    PageNumber = Column(Integer)
    OnlineURL = Column(String)
    CookTime = Column(Integer)
    Difficulty = Column(String)
    Type = Column(String)
    ImageURL = Column(String)
    Servings = Column(Integer)
    Cuisine = Column(String)
    CreatedAt = Column(TIMESTAMP)
    UpdatedAt = Column(TIMESTAMP)

    user = relationship("User", back_populates="recipes")
    author = relationship("RecipeAuthor", back_populates="recipes")
    book = relationship("RecipeBook", back_populates="recipes")
    ingredients = relationship("RecipeIngredient", back_populates="recipe")
    sections = relationship("RecipeIngredientSection", back_populates="recipe")
    reviews = relationship("RecipeReview", back_populates="recipe")
    steps = relationship("RecipeStep", back_populates="recipe")
    tags = relationship("RecipeTag", back_populates="recipe")
    meal_plan_recipes = relationship("MealPlanRecipe", back_populates="recipe")
