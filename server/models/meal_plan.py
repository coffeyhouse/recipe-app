from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class MealPlan(Base):
    __tablename__ = "MealPlans"

    MealPlanID = Column(Integer, primary_key=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    PlanName = Column(String)
    StartDate = Column(Date)
    EndDate = Column(Date)
    CreatedAt = Column(TIMESTAMP)
    UpdatedAt = Column(TIMESTAMP)

    user = relationship("User", back_populates="meal_plans")
    recipes = relationship("MealPlanRecipe", back_populates="meal_plan")
