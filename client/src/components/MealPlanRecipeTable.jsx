// src/components/MealPlanRecipeTable.jsx

import React from 'react';
import { useData } from '../context/DataContext';
import DeleteButton from './ui/DeleteButton';
import Table from './ui/Table';
import Button from './ui/Button';

function MealPlanRecipeTable({ mealPlanId }) {
    const { mealPlanRecipes, recipes, deleteMealPlanRecipe } = useData();

    const handleDelete = async (mealPlanRecipeId) => {
        if (window.confirm('Are you sure you want to delete this meal?')) {
            try {
                await deleteMealPlanRecipe(mealPlanRecipeId);
            } catch (error) {
                alert('Failed to delete meal');
            }
        }
    };

    const getRecipeName = (recipeId) => {
        const recipe = recipes.find(recipe => recipe.RecipeID === recipeId);
        return recipe ? recipe.RecipeName : 'Unknown';
    };

    const headers = ['ID', 'Recipe', 'Meal Type', 'Date', 'Actions'];

    const data = mealPlanRecipes
        .filter(mpr => mpr.MealPlanID === mealPlanId)
        .map((mealPlanRecipe) => ({
            id: mealPlanRecipe.MealPlanRecipeID,
            cells: [
                mealPlanRecipe.MealPlanRecipeID,
                getRecipeName(mealPlanRecipe.RecipeID),
                mealPlanRecipe.MealType,
                mealPlanRecipe.Date,
                <DeleteButton onClick={() => handleDelete(mealPlanRecipe.MealPlanRecipeID)} />,
            ],
        }));

    function handleAddClick() {
        document.getElementById('add_meal_plan_recipe_modal').showModal();
    }

    return (
        <div className="overflow-x-auto">
            <Button size='sm' outline={true} variant='secondary' onClick={handleAddClick}>Add meal</Button>
            <Table headers={headers} data={data} />
        </div>
    );
}

export default MealPlanRecipeTable;
