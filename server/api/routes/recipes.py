from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Recipe as RecipeModel
from schemas.recipe import Recipe as RecipeSchema, RecipeCreate
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/recipes")

@router.get("/", response_model=List[RecipeSchema])
def read_recipes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    recipes = db.query(RecipeModel).offset(skip).limit(limit).all()
    return recipes

@router.post("/", response_model=RecipeSchema, status_code=201)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = RecipeModel(
        RecipeName=recipe.RecipeName,
        AuthorID=recipe.AuthorID,
        BookID=recipe.BookID,
        PageNumber=recipe.PageNumber,
        OnlineURL=recipe.OnlineURL,
        CookTime=recipe.CookTime,
        Difficulty=recipe.Difficulty,
        Type=recipe.Type,
        ImageURL=recipe.ImageURL,
        Servings=recipe.Servings,
        Cuisine=recipe.Cuisine,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.get("/{recipe_id}", response_model=RecipeSchema)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(RecipeModel).filter(RecipeModel.RecipeID == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.put("/{recipe_id}", response_model=RecipeSchema)
def update_recipe(recipe_id: int, recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).filter(RecipeModel.RecipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    for key, value in recipe.dict().items():
        setattr(db_recipe, key, value)
    db_recipe.UpdatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.delete("/{recipe_id}", response_model=RecipeSchema)
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).filter(RecipeModel.RecipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(db_recipe)
    db.commit()
    return db_recipe
