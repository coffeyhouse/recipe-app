// src/pages/ManageRecipes.jsx
import React, { useState } from 'react';
import RecipeTable from '../components/RecipeTable';
import AddRecipeModal from '../components/AddRecipeModal';
import AddRecipeIngredientModal from '../components/AddRecipeIngredientModal';
import Button from '../components/ui/Button';

function ManageRecipes() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleAddIngredients = (recipeId) => {
    setSelectedRecipeId(recipeId);
    document.getElementById('add_recipe_ingredient_modal').showModal();
  };

  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Recipes</h1>
      <div>
        <Button
          size='sm'
          variant='secondary'
          outline={true}
          onClick={() => document.getElementById('add_recipe_modal').showModal()}
        >
          Add Recipe
        </Button>       
      </div>
      <RecipeTable onAddIngredients={handleAddIngredients} />
      <AddRecipeModal />
      <AddRecipeIngredientModal recipeId={selectedRecipeId} />
    </div>
  );
}

export default ManageRecipes;
