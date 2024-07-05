// src/pages/ManageCategories.jsx
import React from 'react';
import CategoryTable from '../components/CategoryTable';
import AddCategoryModal from '../components/AddCategoryModal';

function ManageCategories() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Categories</h1>
      <div>
        <button className="btn btn-sm btn-secondary btn-outline" onClick={() => document.getElementById('add_category_modal').showModal()}>Add Category</button>
      </div>
      <CategoryTable />
      <AddCategoryModal />
    </div>
  );
}

export default ManageCategories;
