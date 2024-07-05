from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import get_db
from models import User as UserModel
from schemas.user import UserRead, UserCreate, UserLogin
from typing import List
from datetime import datetime
import bcrypt

router = APIRouter(prefix="/api/users")

@router.get("/", response_model=List[UserRead])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(UserModel).offset(skip).limit(limit).all()
    return users

@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = bcrypt.hashpw(user.Password.encode('utf-8'), bcrypt.gensalt())
    db_user = UserModel(
        Username=user.Username,
        PasswordHash=hashed_password.decode('utf-8'),
        Email=user.Email,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or Email already exists.")
    return db_user

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.Username == user.Username).first()
    if not db_user or not bcrypt.checkpw(user.Password.encode('utf-8'), db_user.PasswordHash.encode('utf-8')):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    return {"message": "Login successful"}

@router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.UserID == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.UserID == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    for key, value in user.dict().items():
        if key == "Password":
            value = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        setattr(db_user, key, value)
    db_user.UpdatedAt = datetime.utcnow()
    try:
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or Email already exists.")
    return db_user

@router.delete("/{user_id}", response_model=UserRead)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.UserID == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user
