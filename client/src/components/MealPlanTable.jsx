import React from 'react';
import { useData } from '../context/DataContext';
import DeleteButton from './ui/DeleteButton';
import Table from './ui/Table';
import Button from './ui/Button';

function MealPlanTable({ onManageMeals }) {
  const { mealPlans, deleteMealPlan } = useData();

  const handleDelete = async (mealPlanId) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      try {
        await deleteMealPlan(mealPlanId);
      } catch (error) {
        alert('Failed to delete meal plan');
      }
    }
  };

  const headers = ['ID', 'Plan Name', 'Start Date', 'End Date', 'Actions'];

  const data = mealPlans.map((mealPlan) => ({
    id: mealPlan.MealPlanID,
    cells: [
      mealPlan.MealPlanID,
      mealPlan.PlanName,
      mealPlan.StartDate,
      mealPlan.EndDate,
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="primary"
          outline={true}
          onClick={() => onManageMeals(mealPlan)}
        >
          Manage Meals
        </Button>
        <DeleteButton onClick={() => handleDelete(mealPlan.MealPlanID)} />
      </div>
    ],
  }));

  return (
    <div className="overflow-x-auto">
      <Table headers={headers} data={data} />
    </div>
  );
}

export default MealPlanTable;
