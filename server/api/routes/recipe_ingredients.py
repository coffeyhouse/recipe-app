# api/routes/recipe_ingredients.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import RecipeIngredient as RecipeIngredientModel
from schemas.recipe_ingredient import (
    RecipeIngredient as RecipeIngredientSchema,
    RecipeIngredientCreate,
    RecipeIngredientUpdate
)
from datetime import datetime

router = APIRouter(prefix="/api/recipe-ingredients")

@router.get("/", response_model=List[RecipeIngredientSchema])
def read_recipe_ingredients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipe_ingredients = db.query(RecipeIngredientModel).offset(skip).limit(limit).all()
    return recipe_ingredients

@router.post("/", response_model=RecipeIngredientSchema, status_code=status.HTTP_201_CREATED)
def create_recipe_ingredient(recipe_ingredient: RecipeIngredientCreate, db: Session = Depends(get_db)):
    db_recipe_ingredient = RecipeIngredientModel(
        RecipeID=recipe_ingredient.RecipeID,
        IngredientID=recipe_ingredient.IngredientID,
        SectionID=recipe_ingredient.SectionID,
        Quantity=recipe_ingredient.Quantity,
        UnitID=recipe_ingredient.UnitID
    )
    db.add(db_recipe_ingredient)
    db.commit()
    db.refresh(db_recipe_ingredient)
    return db_recipe_ingredient

@router.put("/{recipe_ingredient_id}", response_model=RecipeIngredientSchema)
def update_recipe_ingredient(recipe_ingredient_id: int, recipe_ingredient: RecipeIngredientUpdate, db: Session = Depends(get_db)):
    db_recipe_ingredient = db.query(RecipeIngredientModel).filter(RecipeIngredientModel.RecipeIngredientID == recipe_ingredient_id).first()
    if db_recipe_ingredient is None:
        raise HTTPException(status_code=404, detail="Recipe ingredient not found")
    for key, value in recipe_ingredient.dict().items():
        setattr(db_recipe_ingredient, key, value)
    db_recipe_ingredient.UpdatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_recipe_ingredient)
    return db_recipe_ingredient

@router.delete("/{recipe_ingredient_id}", response_model=RecipeIngredientSchema)
def delete_recipe_ingredient(recipe_ingredient_id: int, db: Session = Depends(get_db)):
    db_recipe_ingredient = db.query(RecipeIngredientModel).filter(RecipeIngredientModel.RecipeIngredientID == recipe_ingredient_id).first()
    if db_recipe_ingredient is None:
        raise HTTPException(status_code=404, detail="Recipe ingredient not found")
    db.delete(db_recipe_ingredient)
    db.commit()
    return db_recipe_ingredient
