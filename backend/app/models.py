from werkzeug.security import generate_password_hash, check_password_hash
from .extensions import db
from .base import TimestampMixin

class IngredientCategory(db.Model, TimestampMixin):
    __tablename__ = 'IngredientCategories'
    CategoryID = db.Column(db.Integer, primary_key=True)
    CategoryName = db.Column(db.String, unique=True, nullable=False)

    def to_dict(self):
        return {
            'CategoryID': self.CategoryID,
            'CategoryName': self.CategoryName,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class Ingredient(db.Model, TimestampMixin):
    __tablename__ = 'Ingredients'
    IngredientID = db.Column(db.Integer, primary_key=True)
    SubCategoryID = db.Column(db.Integer, db.ForeignKey('IngredientSubCategories.SubCategoryID'), nullable=False)
    IngredientName = db.Column(db.String, nullable=False)
    PurchaseUnitID = db.Column(db.Integer, db.ForeignKey('Units.UnitID'))
    PurchaseWeightVolume = db.Column(db.Float)
    PurchaseWeightUnitID = db.Column(db.Integer, db.ForeignKey('Units.UnitID'))

    def to_dict(self):
        return {
            'IngredientID': self.IngredientID,
            'SubCategoryID': self.SubCategoryID,
            'IngredientName': self.IngredientName,
            'PurchaseUnitID': self.PurchaseUnitID,
            'PurchaseWeightVolume': self.PurchaseWeightVolume,
            'PurchaseWeightUnitID': self.PurchaseWeightUnitID,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class IngredientSubCategory(db.Model, TimestampMixin):
    __tablename__ = 'IngredientSubCategories'
    SubCategoryID = db.Column(db.Integer, primary_key=True)
    CategoryID = db.Column(db.Integer, db.ForeignKey('IngredientCategories.CategoryID'), nullable=False)
    SubCategoryName = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'SubCategoryID': self.SubCategoryID,
            'CategoryID': self.CategoryID,
            'SubCategoryName': self.SubCategoryName,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class MealPlanRecipe(db.Model):
    __tablename__ = 'MealPlanRecipes'
    MealPlanRecipeID = db.Column(db.Integer, primary_key=True)
    MealPlanID = db.Column(db.Integer, db.ForeignKey('MealPlans.MealPlanID', ondelete='CASCADE'), nullable=False)
    RecipeID = db.Column(db.Integer, db.ForeignKey('Recipes.RecipeID', ondelete='CASCADE'), nullable=False)
    MealType = db.Column(db.String)
    Date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'MealPlanRecipeID': self.MealPlanRecipeID,
            'MealPlanID': self.MealPlanID,
            'RecipeID': self.RecipeID,
            'MealType': self.MealType,
            'Date': self.Date
        }

class MealPlan(db.Model, TimestampMixin):
    __tablename__ = 'MealPlans'
    MealPlanID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID', ondelete='CASCADE'), nullable=False)
    PlanName = db.Column(db.String)
    StartDate = db.Column(db.Date)
    EndDate = db.Column(db.Date)

    def to_dict(self):
        return {
            'MealPlanID': self.MealPlanID,
            'UserID': self.UserID,
            'PlanName': self.PlanName,
            'StartDate': self.StartDate,
            'EndDate': self.EndDate,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class RecipeAuthor(db.Model):
    __tablename__ = 'RecipeAuthors'
    AuthorID = db.Column(db.Integer, primary_key=True)
    AuthorName = db.Column(db.String, nullable=False)
    AuthorImageURL = db.Column(db.String)

    def to_dict(self):
        return {
            'AuthorID': self.AuthorID,
            'AuthorName': self.AuthorName,
            'AuthorImageURL': self.AuthorImageURL
        }

class RecipeBook(db.Model):
    __tablename__ = 'RecipeBooks'
    BookID = db.Column(db.Integer, primary_key=True)
    AuthorID = db.Column(db.Integer, db.ForeignKey('RecipeAuthors.AuthorID', ondelete='CASCADE'), nullable=False)
    BookName = db.Column(db.String, nullable=False)
    CoverArtURL = db.Column(db.String)

    def to_dict(self):
        return {
            'BookID': self.BookID,
            'AuthorID': self.AuthorID,
            'BookName': self.BookName,
            'CoverArtURL': self.CoverArtURL
        }

class RecipeIngredient(db.Model):
    __tablename__ = 'RecipeIngredients'
    RecipeIngredientID = db.Column(db.Integer, primary_key=True)
    RecipeID = db.Column(db.Integer, db.ForeignKey('Recipes.RecipeID', ondelete='CASCADE'), nullable=False)
    IngredientID = db.Column(db.Integer, db.ForeignKey('Ingredients.IngredientID', ondelete='CASCADE'), nullable=False)
    SectionID = db.Column(db.Integer, db.ForeignKey('RecipeIngredientSections.SectionID', ondelete='CASCADE'))
    Quantity = db.Column(db.Float)
    UnitID = db.Column(db.Integer, db.ForeignKey('Units.UnitID', ondelete='SET NULL'))

    def to_dict(self):
        return {
            'RecipeIngredientID': self.RecipeIngredientID,
            'RecipeID': self.RecipeID,
            'IngredientID': self.IngredientID,
            'SectionID': self.SectionID,
            'Quantity': self.Quantity,
            'UnitID': self.UnitID
        }

class RecipeIngredientSection(db.Model):
    __tablename__ = 'RecipeIngredientSections'
    SectionID = db.Column(db.Integer, primary_key=True)
    RecipeID = db.Column(db.Integer, db.ForeignKey('Recipes.RecipeID', ondelete='CASCADE'), nullable=False)
    SectionName = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'SectionID': self.SectionID,
            'RecipeID': self.RecipeID,
            'SectionName': self.SectionName
        }

class RecipeReview(db.Model):
    __tablename__ = 'RecipeReviews'
    ReviewID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID', ondelete='CASCADE'), nullable=False)
    RecipeID = db.Column(db.Integer, db.ForeignKey('Recipes.RecipeID', ondelete='CASCADE'), nullable=False)
    Rating = db.Column(db.Float, nullable=False)
    ReviewText = db.Column(db.String)

    def to_dict(self):
        return {
            'ReviewID': self.ReviewID,
            'UserID': self.UserID,
            'RecipeID': self.RecipeID,
            'Rating': self.Rating,
            'ReviewText': self.ReviewText
        }

class Recipe(db.Model, TimestampMixin):
    __tablename__ = 'Recipes'
    RecipeID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID', ondelete='SET NULL'))
    RecipeName = db.Column(db.String, nullable=False)
    AuthorID = db.Column(db.Integer, db.ForeignKey('RecipeAuthors.AuthorID', ondelete='SET NULL'))
    BookID = db.Column(db.Integer, db.ForeignKey('RecipeBooks.BookID', ondelete='SET NULL'))
    PageNumber = db.Column(db.Integer)
    OnlineURL = db.Column(db.String)
    CookTime = db.Column(db.Integer)
    Difficulty = db.Column(db.String)
    Type = db.Column(db.String)
    ImageURL = db.Column(db.String)
    Servings = db.Column(db.Integer)
    Cuisine = db.Column(db.String)

    def to_dict(self):
        return {
            'RecipeID': self.RecipeID,
            'UserID': self.UserID,
            'RecipeName': self.RecipeName,
            'AuthorID': self.AuthorID,
            'BookID': self.BookID,
            'PageNumber': self.PageNumber,
            'OnlineURL': self.OnlineURL,
            'CookTime': self.CookTime,
            'Difficulty': self.Difficulty,
            'Type': self.Type,
            'ImageURL': self.ImageURL,
            'Servings': self.Servings,
            'Cuisine': self.Cuisine,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class RecipeStep(db.Model):
    __tablename__ = 'RecipeSteps'
    StepID = db.Column(db.Integer, primary_key=True)
    RecipeID = db.Column(db.Integer, db.ForeignKey('Recipes.RecipeID', ondelete='CASCADE'), nullable=False)
    StepNumber = db.Column(db.Integer, nullable=False)
    Description = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'StepID': self.StepID,
            'RecipeID': self.RecipeID,
            'StepNumber': self.StepNumber,
            'Description': self.Description
        }

class RecipeTag(db.Model):
    __tablename__ = 'RecipeTags'
    RecipeTagID = db.Column(db.Integer, primary_key=True)
    RecipeID = db.Column(db.Integer, db.ForeignKey('Recipes.RecipeID', ondelete='CASCADE'), nullable=False)
    TagID = db.Column(db.Integer, db.ForeignKey('Tags.TagID', ondelete='CASCADE'), nullable=False)

    def to_dict(self):
        return {
            'RecipeTagID': self.RecipeTagID,
            'RecipeID': self.RecipeID,
            'TagID': self.TagID
        }

class ShoppingListIngredient(db.Model, TimestampMixin):
    __tablename__ = 'ShoppingListIngredients'
    ShoppingListIngredientID = db.Column(db.Integer, primary_key=True)
    ShoppingListID = db.Column(db.Integer, db.ForeignKey('ShoppingLists.ShoppingListID', ondelete='CASCADE'), nullable=False)
    MealPlanRecipeID = db.Column(db.Integer, db.ForeignKey('MealPlanRecipes.MealPlanRecipeID', ondelete='CASCADE'))
    IngredientID = db.Column(db.Integer, db.ForeignKey('Ingredients.IngredientID', ondelete='CASCADE'), nullable=False)
    Quantity = db.Column(db.Float)
    UnitID = db.Column(db.Integer, db.ForeignKey('Units.UnitID', ondelete='SET NULL'))
    IsManual = db.Column(db.Boolean)
    AlreadyHave = db.Column(db.Boolean)
    Purchased = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'ShoppingListIngredientID': self.ShoppingListIngredientID,
            'ShoppingListID': self.ShoppingListID,
            'MealPlanRecipeID': self.MealPlanRecipeID,
            'IngredientID': self.IngredientID,
            'Quantity': self.Quantity,
            'UnitID': self.UnitID,
            'IsManual': self.IsManual,
            'AlreadyHave': self.AlreadyHave,
            'Purchased': self.Purchased,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class ShoppingList(db.Model, TimestampMixin):
    __tablename__ = 'ShoppingLists'
    ShoppingListID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID', ondelete='CASCADE'), nullable=False)

    def to_dict(self):
        return {
            'ShoppingListID': self.ShoppingListID,
            'UserID': self.UserID,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }

class Tag(db.Model):
    __tablename__ = 'Tags'
    TagID = db.Column(db.Integer, primary_key=True)
    TagName = db.Column(db.String, nullable=False, unique=True)

    def to_dict(self):
        return {
            'TagID': self.TagID,
            'TagName': self.TagName
        }

class UnitConversion(db.Model):
    __tablename__ = 'UnitConversions'
    FromUnitID = db.Column(db.Integer, db.ForeignKey('Units.UnitID', ondelete='CASCADE'), primary_key=True)
    ToUnitID = db.Column(db.Integer, db.ForeignKey('Units.UnitID', ondelete='CASCADE'), primary_key=True)
    ConversionFactor = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'FromUnitID': self.FromUnitID,
            'ToUnitID': self.ToUnitID,
            'ConversionFactor': self.ConversionFactor
        }

class Unit(db.Model):
    __tablename__ = 'Units'
    UnitID = db.Column(db.Integer, primary_key=True)
    UnitName = db.Column(db.String, nullable=False, unique=True)
    Abbreviation = db.Column(db.String, nullable=False, unique=True)

    def to_dict(self):
        return {
            'UnitID': self.UnitID,
            'UnitName': self.UnitName,
            'Abbreviation': self.Abbreviation
        }

class User(db.Model, TimestampMixin):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String, nullable=False, unique=True)
    PasswordHash = db.Column(db.String, nullable=False)
    Email = db.Column(db.String, nullable=False, unique=True)

    def set_password(self, password):
        self.PasswordHash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.PasswordHash, password)

    def to_dict(self):
        return {
            'UserID': self.UserID,
            'Username': self.Username,
            'Email': self.Email,
            'CreatedAt': self.CreatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.CreatedAt else None,
            'UpdatedAt': self.UpdatedAt.strftime('%Y-%m-%d %H:%M:%S') if self.UpdatedAt else None
        }
