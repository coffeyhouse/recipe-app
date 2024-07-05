from sqlalchemy import create_engine, Column, Integer, String, Float, Text, ForeignKey, Date, Boolean, TIMESTAMP, CheckConstraint
from sqlalchemy.orm import relationship, sessionmaker, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'Users'
    UserID = Column(Integer, primary_key=True, autoincrement=True)
    Username = Column(String, nullable=False, unique=True)
    PasswordHash = Column(String, nullable=False)
    Email = Column(String, nullable=False, unique=True)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class IngredientCategory(Base):
    __tablename__ = 'IngredientCategories'
    CategoryID = Column(Integer, primary_key=True, autoincrement=True)
    CategoryName = Column(String, nullable=False, unique=True)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class IngredientSubCategory(Base):
    __tablename__ = 'IngredientSubCategories'
    SubCategoryID = Column(Integer, primary_key=True, autoincrement=True)
    CategoryID = Column(Integer, ForeignKey('IngredientCategories.CategoryID'), nullable=False)
    SubCategoryName = Column(String, nullable=False)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class Unit(Base):
    __tablename__ = 'Units'
    UnitID = Column(Integer, primary_key=True, autoincrement=True)
    UnitName = Column(String, nullable=False, unique=True)
    Abbreviation = Column(String, nullable=False, unique=True)

class UnitConversion(Base):
    __tablename__ = 'UnitConversions'
    FromUnitID = Column(Integer, ForeignKey('Units.UnitID'), primary_key=True)
    ToUnitID = Column(Integer, ForeignKey('Units.UnitID'), primary_key=True)
    ConversionFactor = Column(Float, nullable=False)

class Ingredient(Base):
    __tablename__ = 'Ingredients'
    IngredientID = Column(Integer, primary_key=True, autoincrement=True)
    SubCategoryID = Column(Integer, ForeignKey('IngredientSubCategories.SubCategoryID'), nullable=False)
    IngredientName = Column(String, nullable=False)
    PurchaseUnitID = Column(Integer, ForeignKey('Units.UnitID'))
    PurchaseWeightVolume = Column(Float)
    PurchaseWeightUnitID = Column(Integer, ForeignKey('Units.UnitID'))
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class RecipeAuthor(Base):
    __tablename__ = 'RecipeAuthors'
    AuthorID = Column(Integer, primary_key=True, autoincrement=True)
    AuthorName = Column(String, nullable=False)
    AuthorImageURL = Column(String)

class RecipeBook(Base):
    __tablename__ = 'RecipeBooks'
    BookID = Column(Integer, primary_key=True, autoincrement=True)
    AuthorID = Column(Integer, ForeignKey('RecipeAuthors.AuthorID'), nullable=False)
    BookName = Column(String, nullable=False)
    CoverArtURL = Column(String)

class Recipe(Base):
    __tablename__ = 'Recipes'
    RecipeID = Column(Integer, primary_key=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey('Users.UserID'))
    RecipeName = Column(String, nullable=False)
    AuthorID = Column(Integer, ForeignKey('RecipeAuthors.AuthorID'))
    BookID = Column(Integer, ForeignKey('RecipeBooks.BookID'))
    PageNumber = Column(Integer)
    OnlineURL = Column(String)
    CookTime = Column(Integer)
    Difficulty = Column(String)
    Type = Column(String)
    ImageURL = Column(String)
    Servings = Column(Integer)
    Cuisine = Column(String)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class RecipeStep(Base):
    __tablename__ = 'RecipeSteps'
    StepID = Column(Integer, primary_key=True, autoincrement=True)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    StepNumber = Column(Integer, nullable=False)
    Description = Column(Text, nullable=False)

class RecipeIngredientSection(Base):
    __tablename__ = 'RecipeIngredientSections'
    SectionID = Column(Integer, primary_key=True, autoincrement=True)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    SectionName = Column(String, nullable=False)

class RecipeIngredient(Base):
    __tablename__ = 'RecipeIngredients'
    RecipeIngredientID = Column(Integer, primary_key=True, autoincrement=True)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    IngredientID = Column(Integer, ForeignKey('Ingredients.IngredientID'), nullable=False)
    SectionID = Column(Integer, ForeignKey('RecipeIngredientSections.SectionID'))
    Quantity = Column(Float)
    UnitID = Column(Integer, ForeignKey('Units.UnitID'))

class MealPlan(Base):
    __tablename__ = 'MealPlans'
    MealPlanID = Column(Integer, primary_key=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey('Users.UserID'), nullable=False)
    PlanName = Column(String)
    StartDate = Column(Date)
    EndDate = Column(Date)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class MealPlanRecipe(Base):
    __tablename__ = 'MealPlanRecipes'
    MealPlanRecipeID = Column(Integer, primary_key=True, autoincrement=True)
    MealPlanID = Column(Integer, ForeignKey('MealPlans.MealPlanID'), nullable=False)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    MealType = Column(String)
    Date = Column(Date, nullable=False)

class ShoppingList(Base):
    __tablename__ = 'ShoppingLists'
    ShoppingListID = Column(Integer, primary_key=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey('Users.UserID'), nullable=False)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')
    UpdatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class ShoppingListIngredient(Base):
    __tablename__ = 'ShoppingListIngredients'
    ShoppingListIngredientID = Column(Integer, primary_key=True, autoincrement=True)
    ShoppingListID = Column(Integer, ForeignKey('ShoppingLists.ShoppingListID'), nullable=False)
    MealPlanRecipeID = Column(Integer, ForeignKey('MealPlanRecipes.MealPlanRecipeID'))
    IngredientID = Column(Integer, ForeignKey('Ingredients.IngredientID'), nullable=False)
    Quantity = Column(Float)
    UnitID = Column(Integer, ForeignKey('Units.UnitID'))
    IsManual = Column(Boolean, default=False)
    AlreadyHave = Column(Boolean, default=False)
    Purchased = Column(Boolean, default=False)

class Tag(Base):
    __tablename__ = 'Tags'
    TagID = Column(Integer, primary_key=True, autoincrement=True)
    TagName = Column(String, nullable=False, unique=True)

class RecipeTag(Base):
    __tablename__ = 'RecipeTags'
    RecipeTagID = Column(Integer, primary_key=True, autoincrement=True)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    TagID = Column(Integer, ForeignKey('Tags.TagID'), nullable=False)

class UserFavorite(Base):
    __tablename__ = 'UserFavorites'
    FavoriteID = Column(Integer, primary_key=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey('Users.UserID'), nullable=False)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

class RecipeReview(Base):
    __tablename__ = 'RecipeReviews'
    ReviewID = Column(Integer, primary_key=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey('Users.UserID'), nullable=False)
    RecipeID = Column(Integer, ForeignKey('Recipes.RecipeID'), nullable=False)
    Rating = Column(Float, nullable=False)
    ReviewText = Column(Text)
    CreatedAt = Column(TIMESTAMP, default='CURRENT_TIMESTAMP')

    __table_args__ = (
        CheckConstraint('Rating >= 0.5 AND Rating <= 5', name='check_rating_range'),
    )

# Define your database URI (in this case, a SQLite database)
engine = create_engine('sqlite:///mydatabase2.db')

# Create all tables
Base.metadata.create_all(engine)

# Optional: Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()
