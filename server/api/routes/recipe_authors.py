from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import RecipeAuthor as RecipeAuthorModel
from schemas.recipe_author import RecipeAuthor as RecipeAuthorSchema, RecipeAuthorCreate, RecipeAuthorUpdate
from typing import List

router = APIRouter(prefix="/api/recipe-authors")

@router.get("/", response_model=List[RecipeAuthorSchema])
def read_recipe_authors(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    recipe_authors = db.query(RecipeAuthorModel).offset(skip).limit(limit).all()
    return recipe_authors

@router.post("/", response_model=RecipeAuthorSchema, status_code=status.HTTP_201_CREATED)
def create_recipe_author(recipe_author: RecipeAuthorCreate, db: Session = Depends(get_db)):
    db_recipe_author = RecipeAuthorModel(
        AuthorName=recipe_author.AuthorName,
        AuthorImageURL=recipe_author.AuthorImageURL,
    )
    db.add(db_recipe_author)
    db.commit()
    db.refresh(db_recipe_author)
    return db_recipe_author

@router.get("/{author_id}", response_model=RecipeAuthorSchema)
def read_recipe_author(author_id: int, db: Session = Depends(get_db)):
    recipe_author = db.query(RecipeAuthorModel).filter(RecipeAuthorModel.AuthorID == author_id).first()
    if recipe_author is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe author not found")
    return recipe_author

@router.put("/{author_id}", response_model=RecipeAuthorSchema)
def update_recipe_author(author_id: int, recipe_author: RecipeAuthorUpdate, db: Session = Depends(get_db)):
    db_recipe_author = db.query(RecipeAuthorModel).filter(RecipeAuthorModel.AuthorID == author_id).first()
    if db_recipe_author is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe author not found")
    for key, value in recipe_author.dict().items():
        setattr(db_recipe_author, key, value)
    db.commit()
    db.refresh(db_recipe_author)
    return db_recipe_author

@router.delete("/{author_id}", response_model=RecipeAuthorSchema)
def delete_recipe_author(author_id: int, db: Session = Depends(get_db)):
    db_recipe_author = db.query(RecipeAuthorModel).filter(RecipeAuthorModel.AuthorID == author_id).first()
    if db_recipe_author is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe author not found")
    db.delete(db_recipe_author)
    db.commit()
    return db_recipe_author
