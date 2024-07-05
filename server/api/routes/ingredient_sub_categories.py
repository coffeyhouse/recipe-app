from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import IngredientSubCategory as IngredientSubCategoryModel
from schemas.ingredient_sub_category import (
    IngredientSubCategory,
    IngredientSubCategoryCreate,
    IngredientSubCategoryUpdate
)
from datetime import datetime

router = APIRouter(prefix="/api/ingredient-sub-categories")

@router.get("/", response_model=List[IngredientSubCategory])
def read_ingredient_sub_categories(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    ingredient_sub_categories = db.query(IngredientSubCategoryModel).offset(skip).limit(limit).all()
    return ingredient_sub_categories

@router.get("/{sub_category_id}", response_model=IngredientSubCategory)
def read_ingredient_sub_category(sub_category_id: int, db: Session = Depends(get_db)):
    db_ingredient_sub_category = db.query(IngredientSubCategoryModel).filter(IngredientSubCategoryModel.SubCategoryID == sub_category_id).first()
    if not db_ingredient_sub_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient sub-category not found")
    return db_ingredient_sub_category

@router.get("/category/{category_id}", response_model=List[IngredientSubCategory])
def read_ingredient_sub_categories_by_category(category_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    ingredient_sub_categories = db.query(IngredientSubCategoryModel).filter(IngredientSubCategoryModel.CategoryID == category_id).offset(skip).limit(limit).all()
    return ingredient_sub_categories

@router.post("/", response_model=IngredientSubCategory, status_code=status.HTTP_201_CREATED)
def create_ingredient_sub_category(ingredient_sub_category: IngredientSubCategoryCreate, db: Session = Depends(get_db)):
    db_ingredient_sub_category = IngredientSubCategoryModel(
        SubCategoryName=ingredient_sub_category.SubCategoryName,
        CategoryID=ingredient_sub_category.CategoryID,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    db.add(db_ingredient_sub_category)
    db.commit()
    db.refresh(db_ingredient_sub_category)
    return db_ingredient_sub_category

@router.put("/{sub_category_id}", response_model=IngredientSubCategory)
def update_ingredient_sub_category(sub_category_id: int, ingredient_sub_category: IngredientSubCategoryUpdate, db: Session = Depends(get_db)):
    db_ingredient_sub_category = db.query(IngredientSubCategoryModel).filter(IngredientSubCategoryModel.SubCategoryID == sub_category_id).first()
    if not db_ingredient_sub_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient sub-category not found")
    
    for key, value in ingredient_sub_category.dict().items():
        setattr(db_ingredient_sub_category, key, value)
    db_ingredient_sub_category.UpdatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_ingredient_sub_category)
    return db_ingredient_sub_category

@router.delete("/{sub_category_id}", response_model=IngredientSubCategory)
def delete_ingredient_sub_category(sub_category_id: int, db: Session = Depends(get_db)):
    db_ingredient_sub_category = db.query(IngredientSubCategoryModel).filter(IngredientSubCategoryModel.SubCategoryID == sub_category_id).first()
    if not db_ingredient_sub_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient sub-category not found")
    
    db.delete(db_ingredient_sub_category)
    db.commit()
    return db_ingredient_sub_category
