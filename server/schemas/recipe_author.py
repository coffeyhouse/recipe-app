from pydantic import BaseModel
from typing import Optional

class RecipeAuthorBase(BaseModel):
    AuthorName: str
    AuthorImageURL: Optional[str] = None

class RecipeAuthorCreate(RecipeAuthorBase):
    pass

class RecipeAuthorUpdate(RecipeAuthorBase):
    pass

class RecipeAuthor(RecipeAuthorBase):
    AuthorID: int

    class Config:
        orm_mode = True
