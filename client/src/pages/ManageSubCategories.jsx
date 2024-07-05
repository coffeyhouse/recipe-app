// src/pages/ManageSubCategories.jsx
import React from 'react';
import SubCategoryTable from '../components/SubCategoryTable';
import AddSubCategoryModal from '../components/AddSubCategoryModal';

function ManageSubCategories() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Sub-Categories</h1>
      <div>
        <button className="btn btn-sm btn-secondary btn-outline" onClick={() => document.getElementById('add_sub_category_modal').showModal()}>Add Sub-Category</button>
      </div>
      <SubCategoryTable />
      <AddSubCategoryModal />
    </div>
  );
}

export default ManageSubCategories;
