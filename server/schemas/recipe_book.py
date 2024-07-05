# schemas/recipe_book.py
from pydantic import BaseModel
from typing import Optional

class RecipeBookBase(BaseModel):
    AuthorID: int
    BookName: str
    CoverArtURL: Optional[str] = None

class RecipeBookCreate(RecipeBookBase):
    pass

class RecipeBookUpdate(RecipeBookBase):
    pass

class RecipeBook(RecipeBookBase):
    BookID: int

    class Config:
        orm_mode = True
