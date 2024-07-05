// src/pages/ManageIngredients.jsx
import React from 'react';
import IngredientTable from '../components/IngredientTable';
import AddIngredientModal from '../components/AddIngredientModal';

function ManageIngredients() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Ingredients</h1>
      <div>
        <button className="btn btn-sm btn-secondary btn-outline" onClick={() => document.getElementById('add_ingredient_modal').showModal()}>Add Ingredient</button>
      </div>
      <IngredientTable />
      <AddIngredientModal />
    </div>
  );
}

export default ManageIngredients;
