from .ingredients import router as ingredients_router
from .recipes import router as recipes_router
from .users import router as users_router
from .ingredient_categories import router as ingredient_categories_router
from .ingredient_sub_categories import router as ingredient_sub_categories_router
from .recipe_authors import router as recipe_authors_router
from .recipe_books import router as recipe_books_router
from .recipe_ingredients import router as recipe_ingredients_router
from .units import router as units_router
from .meal_plans import router as meal_plans_router
from .meal_plan_recipes import router as meal_plan_recipes_router
from .shopping_lists import router as shopping_lists_router
from .shopping_list_ingredients import router as shopping_list_ingredients_router

__all__ = [
    "ingredients_router",
    "recipes_router",
    "users_router",
    "ingredient_categories_router",
    "ingredient_sub_categories_router",
    "recipe_authors_router",
    "recipe_books_router",
    "recipe_ingredients_router",
    "units_router",
    "meal_plans_router",
    "meal_plan_recipes_router",
    "shopping_lists_router",
    "shopping_list_ingredients_router",
]
