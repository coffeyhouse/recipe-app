# api/routes/meal_plans.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import MealPlan as MealPlanModel
from schemas.meal_plan import MealPlan as MealPlanSchema, MealPlanCreate, MealPlanUpdate
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/meal-plans")

@router.get("/", response_model=List[MealPlanSchema])
def read_meal_plans(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    meal_plans = db.query(MealPlanModel).offset(skip).limit(limit).all()
    return meal_plans

@router.post("/", response_model=MealPlanSchema, status_code=status.HTTP_201_CREATED)
def create_meal_plan(meal_plan: MealPlanCreate, db: Session = Depends(get_db)):
    db_meal_plan = MealPlanModel(
        UserID=meal_plan.UserID,
        PlanName=meal_plan.PlanName,
        StartDate=meal_plan.StartDate,
        EndDate=meal_plan.EndDate,
        CreatedAt=datetime.utcnow(),
        UpdatedAt=datetime.utcnow(),
    )
    db.add(db_meal_plan)
    db.commit()
    db.refresh(db_meal_plan)
    return db_meal_plan

@router.get("/{meal_plan_id}", response_model=MealPlanSchema)
def read_meal_plan(meal_plan_id: int, db: Session = Depends(get_db)):
    meal_plan = db.query(MealPlanModel).filter(MealPlanModel.MealPlanID == meal_plan_id).first()
    if meal_plan is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meal plan not found")
    return meal_plan

@router.put("/{meal_plan_id}", response_model=MealPlanSchema)
def update_meal_plan(meal_plan_id: int, meal_plan: MealPlanUpdate, db: Session = Depends(get_db)):
    db_meal_plan = db.query(MealPlanModel).filter(MealPlanModel.MealPlanID == meal_plan_id).first()
    if db_meal_plan is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meal plan not found")
    for key, value in meal_plan.dict().items():
        setattr(db_meal_plan, key, value)
    db_meal_plan.UpdatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_meal_plan)
    return db_meal_plan

@router.delete("/{meal_plan_id}", response_model=MealPlanSchema)
def delete_meal_plan(meal_plan_id: int, db: Session = Depends(get_db)):
    db_meal_plan = db.query(MealPlanModel).filter(MealPlanModel.MealPlanID == meal_plan_id).first()
    if db_meal_plan is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meal plan not found")
    db.delete(db_meal_plan)
    db.commit()
    return db_meal_plan
