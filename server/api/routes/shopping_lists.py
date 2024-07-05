# api/routes/shopping_lists.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import ShoppingList as ShoppingListModel
from schemas.shopping_list import ShoppingList as ShoppingListSchema, ShoppingListCreate, ShoppingListUpdate
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/shopping-lists")

@router.get("/", response_model=List[ShoppingListSchema])
def read_shopping_lists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    shopping_lists = db.query(ShoppingListModel).offset(skip).limit(limit).all()
    return shopping_lists

@router.post("/", response_model=ShoppingListSchema, status_code=status.HTTP_201_CREATED)
def create_shopping_list(shopping_list: ShoppingListCreate, db: Session = Depends(get_db)):
    db_shopping_list = ShoppingListModel(
        UserID=shopping_list.UserID,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    db.add(db_shopping_list)
    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list

@router.get("/{shopping_list_id}", response_model=ShoppingListSchema)
def read_shopping_list(shopping_list_id: int, db: Session = Depends(get_db)):
    shopping_list = db.query(ShoppingListModel).filter(ShoppingListModel.ShoppingListID == shopping_list_id).first()
    if shopping_list is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shopping list not found")
    return shopping_list

@router.put("/{shopping_list_id}", response_model=ShoppingListSchema)
def update_shopping_list(shopping_list_id: int, shopping_list: ShoppingListUpdate, db: Session = Depends(get_db)):
    db_shopping_list = db.query(ShoppingListModel).filter(ShoppingListModel.ShoppingListID == shopping_list_id).first()
    if db_shopping_list is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shopping list not found")
    for key, value in shopping_list.dict().items():
        setattr(db_shopping_list, key, value)
    db_shopping_list.UpdatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list

@router.delete("/{shopping_list_id}", response_model=ShoppingListSchema)
def delete_shopping_list(shopping_list_id: int, db: Session = Depends(get_db)):
    db_shopping_list = db.query(ShoppingListModel).filter(ShoppingListModel.ShoppingListID == shopping_list_id).first()
    if db_shopping_list is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shopping list not found")
    db.delete(db_shopping_list)
    db.commit()
    return db_shopping_list
