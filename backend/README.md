
# Recipe App Backend

This is the backend for the Recipe App, built using Flask and SQLAlchemy. The application provides CRUD operations for various entities related to recipes, ingredients, and meal plans.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and management
- CRUD operations for recipes, ingredients, meal plans, and more
- Timestamping for creation and updates
- Integration with SQLite database
- Blueprint structure for scalability

## Requirements
- Python 3.8+
- Flask 2.0+
- Flask-SQLAlchemy

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/recipe-app-backend.git
   cd recipe-app-backend
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```sh
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

## Configuration
The configuration settings are located in `app/__init__.py`. Ensure the correct path to the SQLite database is set:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../../mydatabase2.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

## Usage
1. Run the application:
   ```sh
   python run.py
   ```

2. The application will be available at `http://127.0.0.1:5000`.

## Database Models
The following database models are used in this application:
- `User`
- `IngredientCategory`
- `Ingredient`
- `IngredientSubCategory`
- `MealPlanRecipe`
- `MealPlan`
- `RecipeAuthor`
- `RecipeBook`
- `RecipeIngredient`
- `RecipeIngredientSection`
- `RecipeReview`
- `Recipe`
- `RecipeStep`
- `RecipeTag`
- `ShoppingListIngredient`
- `ShoppingList`
- `Tag`
- `UnitConversion`
- `Unit`

## API Endpoints
The application exposes several CRUD endpoints for managing the different entities. Below is a list of the base endpoints:

- `/ingredient_categories`
- `/ingredients`
- `/ingredient_subcategories`
- `/meal_plan_recipes`
- `/meal_plans`
- `/recipe_authors`
- `/recipe_books`
- `/recipe_ingredients`
- `/recipe_ingredient_sections`
- `/recipe_reviews`
- `/recipes`
- `/recipe_steps`
- `/recipe_tags`
- `/shopping_list_ingredients`
- `/shopping_lists`
- `/tags`
- `/unit_conversions`
- `/units`
- `/users`

Each endpoint supports standard CRUD operations such as GET, POST, PUT, and DELETE.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License
This project is licensed under the MIT License.
