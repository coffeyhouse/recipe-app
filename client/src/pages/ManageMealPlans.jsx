// src/pages/ManageMealPlans.jsx

import React, { useState } from 'react';
import MealPlanTable from '../components/MealPlanTable';
import AddMealPlanModal from '../components/AddMealPlanModal';
import AddMealPlanRecipeModal from '../components/AddMealPlanRecipeModal';
import Calendar from '../components/Calendar';
import ShoppingList from '../components/ShoppingList';
import { useData } from '../context/DataContext';

function ManageMealPlans() {
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [addingMeal, setAddingMeal] = useState(null);
  const [modifyingMeal, setModifyingMeal] = useState(null);
  const { mealPlanRecipes, recipes, deleteMealPlanRecipe } = useData();

  const handleAddMeals = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
  };

  const handleAddMeal = (date, mealType) => {
    setAddingMeal({ date, mealType });
    document.getElementById('add_meal_plan_recipe_modal').showModal();
  };

  const handleModifyMeal = async (mealPlanRecipeId, remove = false) => {
    if (remove) {
      if (window.confirm('Are you sure you want to remove this meal?')) {
        try {
          await deleteMealPlanRecipe(mealPlanRecipeId);
        } catch (error) {
          console.log(error);
          alert('Failed to remove meal');
        }
      }
    } else {
      const mealPlanRecipe = mealPlanRecipes.find(mpr => mpr.MealPlanRecipeID === mealPlanRecipeId);
      if (mealPlanRecipe) {
        setModifyingMeal(mealPlanRecipe);
        setAddingMeal({
          date: mealPlanRecipe.Date,
          mealType: mealPlanRecipe.MealType,
          recipeId: mealPlanRecipe.RecipeID,
          mealPlanRecipeId: mealPlanRecipeId
        });
        document.getElementById('add_meal_plan_recipe_modal').showModal();
      } else {
        console.error('Meal plan recipe not found:', mealPlanRecipeId);
      }
    }
  };

  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Meal Plans</h1>
      <div>
        <button className="btn btn-sm btn-secondary btn-outline" onClick={() => document.getElementById('add_meal_plan_modal').showModal()}>Add Meal Plan</button>
      </div>
      <MealPlanTable onManageMeals={handleAddMeals} />
      {selectedMealPlan && (
        <>
          <h2 className="text-2xl font-bold mt-6">Meals for Selected Plan</h2>
          <Calendar
            mealPlan={selectedMealPlan}
            mealPlanRecipes={mealPlanRecipes.filter(mpr => mpr.MealPlanID === selectedMealPlan.MealPlanID)}
            recipes={recipes}
            onAddMeal={handleAddMeal}
            onModifyMeal={handleModifyMeal}
          />
          <h2 className="text-2xl font-bold mt-6">Shopping List</h2>
          <ShoppingList mealPlanId={selectedMealPlan.MealPlanID} />
        </>
      )}
      <AddMealPlanModal />
      {selectedMealPlan && (
        <AddMealPlanRecipeModal
          mealPlanId={selectedMealPlan.MealPlanID}
          startDate={selectedMealPlan.StartDate}
          endDate={selectedMealPlan.EndDate}
          defaultDate={addingMeal?.date}
          defaultMealType={addingMeal?.mealType}
          defaultRecipeId={addingMeal?.recipeId}
          mealPlanRecipeId={addingMeal?.mealPlanRecipeId}
        />
      )}
    </div>
  );
}

export default ManageMealPlans;
