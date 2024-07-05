from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from database import engine
from api.routes import (
    ingredients_router,
    recipes_router,
    users_router,
    ingredient_categories_router,
    ingredient_sub_categories_router,
    recipe_authors_router,
    recipe_books_router,
    recipe_ingredients_router,
    units_router,
    meal_plans_router,
    meal_plan_recipes_router,
    shopping_lists_router,
    shopping_list_ingredients_router,  # Add these lines
)

# Create the tables
Base.metadata.create_all(bind=engine)

# FastAPI instance
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include API routes
app.include_router(ingredients_router)
app.include_router(recipes_router)
app.include_router(users_router)
app.include_router(ingredient_categories_router)
app.include_router(ingredient_sub_categories_router)
app.include_router(recipe_authors_router)
app.include_router(recipe_books_router)
app.include_router(recipe_ingredients_router)
app.include_router(units_router)
app.include_router(meal_plans_router)
app.include_router(meal_plan_recipes_router)
app.include_router(shopping_lists_router)  # Add this line
app.include_router(shopping_list_ingredients_router)  # Add this line

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
