// src/components/RecipeTable.jsx
import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import DeleteButton from './ui/DeleteButton';
import Table from './ui/Table';
import Button from './ui/Button';

function RecipeTable({ onAddIngredients }) {
  const { recipes, ingredients, units, recipeIngredients, deleteRecipe } = useData();

  const handleDelete = async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(recipeId);
      } catch (error) {
        alert('Failed to delete recipe');
      }
    }
  };

  const getIngredientName = (ingredientId) => {
    const ingredient = ingredients.find(ingredient => ingredient.IngredientID === ingredientId);
    return ingredient ? ingredient.IngredientName : 'Unknown';
  };

  const getUnitName = (unitId) => {
    const unit = units.find(unit => unit.UnitID === unitId);
    return unit ? unit.UnitName : 'Unknown';
  };

  const renderIngredients = (recipeId) => {
    const filteredIngredients = recipeIngredients.filter(ri => ri.RecipeID === recipeId);
    return filteredIngredients.map(ingredient => (
      <li key={ingredient.RecipeIngredientID}>
        {ingredient.Quantity} {getUnitName(ingredient.UnitID)} of {getIngredientName(ingredient.IngredientID)}
      </li>
    ));
  };

  const headers = ['#', 'Recipe Name', 'Author ID', 'Ingredients', 'Actions'];

  const data = useMemo(() =>
    recipes.map((recipe, index) => ({
      id: recipe.RecipeID,
      cells: [
        index + 1,
        recipe.RecipeName,
        recipe.AuthorID,
        <ul className='list-disc ml-4'>
          {renderIngredients(recipe.RecipeID)}
        </ul>,
        <div className='flex gap-2'>
          <Button
            size="sm"
            variant="primary"
            outline={true}
            onClick={() => onAddIngredients(recipe.RecipeID)}
          >
            Add Ingredients
          </Button>
          <DeleteButton onClick={() => handleDelete(recipe.RecipeID)} />
        </div>
      ],
    })),
    [recipes, recipeIngredients, ingredients, units]
  );

  return (
    <div className="overflow-x-auto">
      <Table headers={headers} data={data} />
    </div>
  );
}

export default RecipeTable;
