# api/routes/meal_plan_recipes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import MealPlanRecipe as MealPlanRecipeModel
from schemas.meal_plan_recipe import MealPlanRecipe as MealPlanRecipeSchema, MealPlanRecipeCreate, MealPlanRecipeUpdate
from typing import List

router = APIRouter(prefix="/api/meal-plan-recipes")

@router.get("/", response_model=List[MealPlanRecipeSchema])
def read_meal_plan_recipes(skip: int = 0, limit: int = 10000, db: Session = Depends(get_db)):
    meal_plan_recipes = db.query(MealPlanRecipeModel).offset(skip).limit(limit).all()
    return meal_plan_recipes

@router.post("/", response_model=MealPlanRecipeSchema, status_code=status.HTTP_201_CREATED)
def create_meal_plan_recipe(meal_plan_recipe: MealPlanRecipeCreate, db: Session = Depends(get_db)):
    db_meal_plan_recipe = MealPlanRecipeModel(
        MealPlanID=meal_plan_recipe.MealPlanID,
        RecipeID=meal_plan_recipe.RecipeID,
        MealType=meal_plan_recipe.MealType,
        Date=meal_plan_recipe.Date,
    )
    db.add(db_meal_plan_recipe)
    db.commit()
    db.refresh(db_meal_plan_recipe)
    return db_meal_plan_recipe

@router.get("/{meal_plan_recipe_id}", response_model=MealPlanRecipeSchema)
def read_meal_plan_recipe(meal_plan_recipe_id: int, db: Session = Depends(get_db)):
    meal_plan_recipe = db.query(MealPlanRecipeModel).filter(MealPlanRecipeModel.MealPlanRecipeID == meal_plan_recipe_id).first()
    if meal_plan_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meal plan recipe not found")
    return meal_plan_recipe

@router.put("/{meal_plan_recipe_id}", response_model=MealPlanRecipeSchema)
def update_meal_plan_recipe(meal_plan_recipe_id: int, meal_plan_recipe: MealPlanRecipeUpdate, db: Session = Depends(get_db)):
    db_meal_plan_recipe = db.query(MealPlanRecipeModel).filter(MealPlanRecipeModel.MealPlanRecipeID == meal_plan_recipe_id).first()
    if db_meal_plan_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meal plan recipe not found")
    for key, value in meal_plan_recipe.dict().items():
        setattr(db_meal_plan_recipe, key, value)
    db.commit()
    db.refresh(db_meal_plan_recipe)
    return db_meal_plan_recipe

@router.delete("/{meal_plan_recipe_id}", response_model=MealPlanRecipeSchema)
def delete_meal_plan_recipe(meal_plan_recipe_id: int, db: Session = Depends(get_db)):
    db_meal_plan_recipe = db.query(MealPlanRecipeModel).filter(MealPlanRecipeModel.MealPlanRecipeID == meal_plan_recipe_id).first()
    if db_meal_plan_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meal plan recipe not found")
    db.delete(db_meal_plan_recipe)
    db.commit()
    return db_meal_plan_recipe
