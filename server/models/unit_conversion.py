from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class UnitConversion(Base):
    __tablename__ = "UnitConversions"

    FromUnitID = Column(Integer, ForeignKey("Units.UnitID"), primary_key=True)
    ToUnitID = Column(Integer, ForeignKey("Units.UnitID"), primary_key=True)
    ConversionFactor = Column(Float, nullable=False)

    from_unit = relationship("Unit", foreign_keys=[FromUnitID], back_populates="unit_conversions_from")
    to_unit = relationship("Unit", foreign_keys=[ToUnitID], back_populates="unit_conversions_to")
