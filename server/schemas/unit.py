from pydantic import BaseModel
from datetime import datetime

class UnitBase(BaseModel):
    UnitName: str
    Abbreviation: str

class UnitCreate(UnitBase):
    pass

class UnitUpdate(UnitBase):
    pass

class Unit(UnitBase):
    UnitID: int

    class Config:
        orm_mode = True
