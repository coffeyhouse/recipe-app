import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Calendar from '../components/Calendar';
import Button from '../components/ui/Button';
import AddMealPlanRecipeModal from '../components/AddMealPlanRecipeModal';

const MealPlanDetails = () => {
  const { mealPlanId } = useParams();
  const { mealPlans, mealPlanRecipes, recipes, createMealPlanRecipe, updateMealPlanRecipe, deleteMealPlanRecipe } = useData();
  const mealPlan = mealPlans.find(mp => mp.MealPlanID === parseInt(mealPlanId));
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMeal = (date, mealType) => {
    setSelectedMeal({ date, mealType, mealPlanRecipeId: null });
    setIsModalOpen(true);
    document.getElementById('add_meal_plan_recipe_modal').showModal();
  };

  const handleModifyMeal = (mealPlanRecipeId) => {
    const meal = mealPlanRecipes.find(mpr => mpr.MealPlanRecipeID === mealPlanRecipeId);
    if (meal) {
      setSelectedMeal({
        date: meal.Date,
        mealType: meal.MealType,
        recipeId: meal.RecipeID,
        mealPlanRecipeId: meal.MealPlanRecipeID,
      });
      setIsModalOpen(true);
      document.getElementById('add_meal_plan_recipe_modal').showModal();
    }
  };

  const handleSaveMeal = async (mealPlanRecipe) => {
    if (selectedMeal.mealPlanRecipeId) {
      await updateMealPlanRecipe(selectedMeal.mealPlanRecipeId, mealPlanRecipe);
    } else {
      await createMealPlanRecipe(mealPlanRecipe);
    }
    setIsModalOpen(false);
  };

  const handleRemoveMeal = async (mealPlanRecipeId) => {
    if (window.confirm('Are you sure you want to remove this meal?')) {
      await deleteMealPlanRecipe(mealPlanRecipeId);
    }
  };

  return (
    <div className="p-6">
      {mealPlan ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{mealPlan.PlanName}</h1>
          <Calendar
            mealPlan={mealPlan}
            mealPlanRecipes={mealPlanRecipes.filter(mpr => mpr.MealPlanID === mealPlan.MealPlanID)}
            recipes={recipes}
            onAddMeal={handleAddMeal}
            onModifyMeal={handleModifyMeal}
            onRemoveMeal={handleRemoveMeal}
          />

          <AddMealPlanRecipeModal
            mealPlanId={mealPlan.MealPlanID}
            defaultDate={selectedMeal?.date}
            defaultMealType={selectedMeal?.mealType}
            defaultRecipeId={selectedMeal?.recipeId}
            mealPlanRecipeId={selectedMeal?.mealPlanRecipeId}
            onSave={handleSaveMeal}
          />
        </>
      ) : (
        <p>Meal plan not found.</p>
      )}
    </div>
  );
};

export default MealPlanDetails;
