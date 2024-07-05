# api/routes/recipe_books.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import RecipeBook as RecipeBookModel
from schemas.recipe_book import RecipeBook as RecipeBookSchema, RecipeBookCreate, RecipeBookUpdate
from typing import List

router = APIRouter(prefix="/api/recipe-books")

@router.get("/", response_model=List[RecipeBookSchema])
def read_recipe_books(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    recipe_books = db.query(RecipeBookModel).offset(skip).limit(limit).all()
    return recipe_books

@router.post("/", response_model=RecipeBookSchema, status_code=status.HTTP_201_CREATED)
def create_recipe_book(recipe_book: RecipeBookCreate, db: Session = Depends(get_db)):
    db_recipe_book = RecipeBookModel(
        AuthorID=recipe_book.AuthorID,
        BookName=recipe_book.BookName,
        CoverArtURL=recipe_book.CoverArtURL,
    )
    db.add(db_recipe_book)
    db.commit()
    db.refresh(db_recipe_book)
    return db_recipe_book

@router.get("/{book_id}", response_model=RecipeBookSchema)
def read_recipe_book(book_id: int, db: Session = Depends(get_db)):
    recipe_book = db.query(RecipeBookModel).filter(RecipeBookModel.BookID == book_id).first()
    if recipe_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe book not found")
    return recipe_book

@router.put("/{book_id}", response_model=RecipeBookSchema)
def update_recipe_book(book_id: int, recipe_book: RecipeBookUpdate, db: Session = Depends(get_db)):
    db_recipe_book = db.query(RecipeBookModel).filter(RecipeBookModel.BookID == book_id).first()
    if db_recipe_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe book not found")
    for key, value in recipe_book.dict().items():
        setattr(db_recipe_book, key, value)
    db.commit()
    db.refresh(db_recipe_book)
    return db_recipe_book

@router.delete("/{book_id}", response_model=RecipeBookSchema)
def delete_recipe_book(book_id: int, db: Session = Depends(get_db)):
    db_recipe_book = db.query(RecipeBookModel).filter(RecipeBookModel.BookID == book_id).first()
    if db_recipe_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe book not found")
    db.delete(db_recipe_book)
    db.commit()
    return db_recipe_book
