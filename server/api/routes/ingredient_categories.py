from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import IngredientCategory as IngredientCategoryModel
from schemas.ingredient_category import IngredientCategory, IngredientCategoryCreate, IngredientCategoryUpdate
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/ingredient-categories")

@router.get("/", response_model=List[IngredientCategory])
def read_ingredient_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    ingredient_categories = db.query(IngredientCategoryModel).offset(skip).limit(limit).all()
    return ingredient_categories

@router.post("/", response_model=IngredientCategory, status_code=status.HTTP_201_CREATED)
def create_ingredient_category(ingredient_category: IngredientCategoryCreate, db: Session = Depends(get_db)):
    db_ingredient_category = IngredientCategoryModel(
        CategoryName=ingredient_category.CategoryName,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    try:
        db.add(db_ingredient_category)
        db.commit()
        db.refresh(db_ingredient_category)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category name already exists.")
    return db_ingredient_category

@router.put("/{category_id}", response_model=IngredientCategory)
def update_ingredient_category(category_id: int, ingredient_category: IngredientCategoryUpdate, db: Session = Depends(get_db)):
    db_ingredient_category = db.query(IngredientCategoryModel).filter(IngredientCategoryModel.CategoryID == category_id).first()
    if db_ingredient_category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient category not found")
    for key, value in ingredient_category.dict().items():
        setattr(db_ingredient_category, key, value)
    db_ingredient_category.UpdatedAt = datetime.utcnow()
    try:
        db.commit()
        db.refresh(db_ingredient_category)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category name already exists.")
    return db_ingredient_category

@router.delete("/{category_id}", response_model=IngredientCategory)
def delete_ingredient_category(category_id: int, db: Session = Depends(get_db)):
    db_ingredient_category = db.query(IngredientCategoryModel).filter(IngredientCategoryModel.CategoryID == category_id).first()
    if db_ingredient_category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient category not found")
    db.delete(db_ingredient_category)
    db.commit()
    return db_ingredient_category
