// src/pages/ManageRecipeBooks.jsx
import React from 'react';
import RecipeBookTable from '../components/RecipeBookTable';
import AddRecipeBookModal from '../components/AddRecipeBookModal';

function ManageRecipeBooks() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Recipe Books</h1>
      <div>
        <button className="btn btn-sm btn-secondary btn-outline" onClick={() => document.getElementById('add_recipe_book_modal').showModal()}>Add Recipe Book</button>
      </div>
      <RecipeBookTable />
      <AddRecipeBookModal />
    </div>
  );
}

export default ManageRecipeBooks;
