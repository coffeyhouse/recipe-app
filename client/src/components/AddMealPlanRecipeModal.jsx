import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Select from './ui/Select';
import { format, isValid } from 'date-fns';
import TextInput from './ui/TextInput';

function AddMealPlanRecipeModal({ mealPlanId, defaultDate, defaultMealType, defaultRecipeId, mealPlanRecipeId }) {

  const [recipeId, setRecipeId] = useState('');
  const [date, setDate] = useState(defaultDate && isValid(new Date(defaultDate)) ? format(new Date(defaultDate), 'yyyy-MM-dd') : '');
  const [mealType, setMealType] = useState(defaultMealType || '');
  const [currentMealPlanRecipeId, setCurrentMealPlanRecipeId] = useState(mealPlanRecipeId);

  const { recipes, createMealPlanRecipe, updateMealPlanRecipe } = useData();

  useEffect(() => {
    setDate(defaultDate && isValid(new Date(defaultDate)) ? format(new Date(defaultDate), 'yyyy-MM-dd') : '');
    setMealType(defaultMealType || '');
    setRecipeId(defaultRecipeId || '');
    setCurrentMealPlanRecipeId(mealPlanRecipeId || '');
  }, [defaultDate, defaultMealType, defaultRecipeId, mealPlanRecipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealPlanId || !recipeId || !mealType || !date) {
      alert('All fields are required.');
      return;
    }

    const mealPlanRecipe = {
      MealPlanID: mealPlanId,
      RecipeID: recipeId,
      MealType: mealType,
      Date: date,
    };

    console.log("Submitting mealPlanRecipeId:", currentMealPlanRecipeId);

    try {
      if (currentMealPlanRecipeId) {
        // Update the existing meal plan recipe
        await updateMealPlanRecipe(currentMealPlanRecipeId, mealPlanRecipe);
      } else {
        // Create a new meal plan recipe
        await createMealPlanRecipe(mealPlanRecipe);
      }
      document.getElementById('add_meal_plan_recipe_modal').close();
      setRecipeId('');
      setMealType('');
      setDate('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add/update meal plan recipe');
    }
  };

  const recipeOptions = recipes.map(recipe => ({
    value: recipe.RecipeID,
    label: recipe.RecipeName,
  }));

  return (
    <Modal id="add_meal_plan_recipe_modal" title="Add/Update Meal in Meal Plan">
      <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
        <Select
          label="Recipe"
          value={recipeId}
          onChange={(e) => setRecipeId(e.target.value)}
          required
          options={recipeOptions}
          defaultOption="Select a recipe"
        />
        <TextInput
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Select
          label="Meal Type"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          required
          options={[
            { value: 'Breakfast', label: 'Breakfast' },
            { value: 'Lunch', label: 'Lunch' },
            { value: 'Dinner', label: 'Dinner' }
          ]}
          defaultOption="Select a meal type"
        />
        <Button type="submit">{currentMealPlanRecipeId ? 'Update Meal' : 'Add Meal'}</Button>
      </form>
    </Modal>
  );
}

export default AddMealPlanRecipeModal;
