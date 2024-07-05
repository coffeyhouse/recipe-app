from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Unit as UnitModel
from schemas.unit import Unit as UnitSchema, UnitCreate, UnitUpdate

router = APIRouter(prefix="/api/units")

@router.get("/", response_model=List[UnitSchema])
def read_units(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    units = db.query(UnitModel).offset(skip).limit(limit).all()
    return units

@router.post("/", response_model=UnitSchema, status_code=status.HTTP_201_CREATED)
def create_unit(unit: UnitCreate, db: Session = Depends(get_db)):
    db_unit = UnitModel(
        UnitName=unit.UnitName,
        Abbreviation=unit.Abbreviation,
    )
    db.add(db_unit)
    db.commit()
    db.refresh(db_unit)
    return db_unit

@router.put("/{unit_id}", response_model=UnitSchema)
def update_unit(unit_id: int, unit: UnitUpdate, db: Session = Depends(get_db)):
    db_unit = db.query(UnitModel).filter(UnitModel.UnitID == unit_id).first()
    if db_unit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unit not found")
    for key, value in unit.dict().items():
        setattr(db_unit, key, value)
    db.commit()
    db.refresh(db_unit)
    return db_unit

@router.delete("/{unit_id}", response_model=UnitSchema)
def delete_unit(unit_id: int, db: Session = Depends(get_db)):
    db_unit = db.query(UnitModel).filter(UnitModel.UnitID == unit_id).first()
    if db_unit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unit not found")
    db.delete(db_unit)
    db.commit()
    return db_unit
