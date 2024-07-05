from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Ingredient as IngredientModel
from schemas.ingredient import Ingredient as IngredientSchema, IngredientCreate, IngredientUpdate
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/ingredients")

@router.get("/", response_model=List[IngredientSchema])
def read_ingredients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(IngredientModel).offset(skip).limit(limit).all()
    return ingredients

@router.post("/", response_model=IngredientSchema, status_code=status.HTTP_201_CREATED)
def create_ingredient(ingredient: IngredientCreate, db: Session = Depends(get_db)):
    db_ingredient = IngredientModel(
        IngredientName=ingredient.IngredientName,
        PurchaseWeightVolume=ingredient.PurchaseWeightVolume,
        PurchaseUnitID=ingredient.PurchaseUnitID,
        SubCategoryID=ingredient.SubCategoryID,
        PurchaseWeightUnitID=ingredient.PurchaseWeightUnitID,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    db.add(db_ingredient)
    db.commit()
    db.refresh(db_ingredient)
    return db_ingredient

@router.put("/{ingredient_id}", response_model=IngredientSchema)
def update_ingredient(ingredient_id: int, ingredient: IngredientUpdate, db: Session = Depends(get_db)):
    db_ingredient = db.query(IngredientModel).filter(IngredientModel.IngredientID == ingredient_id).first()
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    for key, value in ingredient.dict().items():
        setattr(db_ingredient, key, value)
    db_ingredient.UpdatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_ingredient)
    return db_ingredient

@router.delete("/{ingredient_id}", response_model=IngredientSchema)
def delete_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    db_ingredient = db.query(IngredientModel).filter(IngredientModel.IngredientID == ingredient_id).first()
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    db.delete(db_ingredient)
    db.commit()
    return db_ingredient
