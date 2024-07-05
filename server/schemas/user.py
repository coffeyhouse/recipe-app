from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    Username: str
    Email: EmailStr

class UserCreate(UserBase):
    Password: str

class UserRead(UserBase):
    UserID: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    Username: str
    Password: str
