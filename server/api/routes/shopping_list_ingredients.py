# api/routes/shopping_list_ingredients.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import ShoppingListIngredient as ShoppingListIngredientModel
from schemas.shopping_list_ingredient import ShoppingListIngredient as ShoppingListIngredientSchema, ShoppingListIngredientCreate, ShoppingListIngredientUpdate
from typing import List

router = APIRouter(prefix="/api/shopping-list-ingredients")

@router.get("/", response_model=List[ShoppingListIngredientSchema])
def read_shopping_list_ingredients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    shopping_list_ingredients = db.query(ShoppingListIngredientModel).offset(skip).limit(limit).all()
    return shopping_list_ingredients

@router.post("/", response_model=ShoppingListIngredientSchema, status_code=status.HTTP_201_CREATED)
def create_shopping_list_ingredient(shopping_list_ingredient: ShoppingListIngredientCreate, db: Session = Depends(get_db)):
    db_shopping_list_ingredient = ShoppingListIngredientModel(
        ShoppingListID=shopping_list_ingredient.ShoppingListID,
        MealPlanRecipeID=shopping_list_ingredient.MealPlanRecipeID,
        IngredientID=shopping_list_ingredient.IngredientID,
        Quantity=shopping_list_ingredient.Quantity,
        UnitID=shopping_list_ingredient.UnitID,
        IsManual=shopping_list_ingredient.IsManual,
        AlreadyHave=shopping_list_ingredient.AlreadyHave,
        Purchased=shopping_list_ingredient.Purchased,
    )
    db.add(db_shopping_list_ingredient)
    db.commit()
    db.refresh(db_shopping_list_ingredient)
    return db_shopping_list_ingredient

@router.get("/{shopping_list_ingredient_id}", response_model=ShoppingListIngredientSchema)
def read_shopping_list_ingredient(shopping_list_ingredient_id: int, db: Session = Depends(get_db)):
    shopping_list_ingredient = db.query(ShoppingListIngredientModel).filter(ShoppingListIngredientModel.ShoppingListIngredientID == shopping_list_ingredient_id).first()
    if shopping_list_ingredient is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shopping list ingredient not found")
    return shopping_list_ingredient

@router.put("/{shopping_list_ingredient_id}", response_model=ShoppingListIngredientSchema)
def update_shopping_list_ingredient(shopping_list_ingredient_id: int, shopping_list_ingredient: ShoppingListIngredientUpdate, db: Session = Depends(get_db)):
    db_shopping_list_ingredient = db.query(ShoppingListIngredientModel).filter(ShoppingListIngredientModel.ShoppingListIngredientID == shopping_list_ingredient_id).first()
    if db_shopping_list_ingredient is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shopping list ingredient not found")
    for key, value in shopping_list_ingredient.dict().items():
        setattr(db_shopping_list_ingredient, key, value)
    db.commit()
    db.refresh(db_shopping_list_ingredient)
    return db_shopping_list_ingredient

@router.delete("/{shopping_list_ingredient_id}", response_model=ShoppingListIngredientSchema)
def delete_shopping_list_ingredient(shopping_list_ingredient_id: int, db: Session = Depends(get_db)):
    db_shopping_list_ingredient = db.query(ShoppingListIngredientModel).filter(ShoppingListIngredientModel.ShoppingListIngredientID == shopping_list_ingredient_id).first()
    if db_shopping_list_ingredient is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shopping list ingredient not found")
    db.delete(db_shopping_list_ingredient)
    db.commit()
    return db_shopping_list_ingredient
