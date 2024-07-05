from flask import Flask
from .extensions import db
from .models import IngredientCategory, Ingredient, IngredientSubCategory, MealPlanRecipe, MealPlan, RecipeAuthor, RecipeBook, RecipeIngredient, RecipeIngredientSection, RecipeReview, Recipe, RecipeStep, RecipeTag, ShoppingListIngredient, ShoppingList, Tag, UnitConversion, Unit, User
from .generic_crud import create_crud_blueprint
from sqlalchemy import inspect

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../../mydatabase2.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    with app.app_context():
        # Print all tables in the database
        inspector = inspect(db.engine)
        print(inspector.get_table_names())

    # Register blueprints
    app.register_blueprint(create_crud_blueprint(IngredientCategory, '/ingredient_categories'))
    app.register_blueprint(create_crud_blueprint(Ingredient, '/ingredients'))
    app.register_blueprint(create_crud_blueprint(IngredientSubCategory, '/ingredient_subcategories'))
    app.register_blueprint(create_crud_blueprint(MealPlanRecipe, '/meal_plan_recipes'))
    app.register_blueprint(create_crud_blueprint(MealPlan, '/meal_plans'))
    app.register_blueprint(create_crud_blueprint(RecipeAuthor, '/recipe_authors'))
    app.register_blueprint(create_crud_blueprint(RecipeBook, '/recipe_books'))
    app.register_blueprint(create_crud_blueprint(RecipeIngredient, '/recipe_ingredients'))
    app.register_blueprint(create_crud_blueprint(RecipeIngredientSection, '/recipe_ingredient_sections'))
    app.register_blueprint(create_crud_blueprint(RecipeReview, '/recipe_reviews'))
    app.register_blueprint(create_crud_blueprint(Recipe, '/recipes'))
    app.register_blueprint(create_crud_blueprint(RecipeStep, '/recipe_steps'))
    app.register_blueprint(create_crud_blueprint(RecipeTag, '/recipe_tags'))
    app.register_blueprint(create_crud_blueprint(ShoppingListIngredient, '/shopping_list_ingredients'))
    app.register_blueprint(create_crud_blueprint(ShoppingList, '/shopping_lists'))
    app.register_blueprint(create_crud_blueprint(Tag, '/tags'))
    app.register_blueprint(create_crud_blueprint(UnitConversion, '/unit_conversions'))
    app.register_blueprint(create_crud_blueprint(Unit, '/units'))
    app.register_blueprint(create_crud_blueprint(User, '/users'))

    return app
