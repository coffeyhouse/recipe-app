// src/components/SubCategoryTable.jsx
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import Table from './ui/Table';
import Button from './ui/Button';
import DeleteButton from './ui/DeleteButton';

function SubCategoryTable() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories, subCategories, deleteSubCategory } = useData();

  const handleDelete = async (subCategoryId) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      try {
        await deleteSubCategory(subCategoryId);
      } catch (error) {
        alert('Failed to delete sub-category');
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.CategoryID === categoryId);
    return category ? category.CategoryName : 'Unknown';
  };

  const handleCategoryChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedCategories(prevSelected =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter(id => id !== selectedValue)
        : [...prevSelected, selectedValue]
    );
  };

  const filteredSubCategories = useMemo(() => 
    selectedCategories.length > 0
      ? subCategories.filter(subCategory => selectedCategories.includes(subCategory.CategoryID))
      : subCategories,
    [subCategories, selectedCategories]
  );

  const headers = ['#', 'Sub-Category Name', 'Category Name', 'Actions'];

  const data = useMemo(() =>
    filteredSubCategories.map((subCategory, index) => ({
      id: subCategory.SubCategoryID,
      cells: [
        index + 1,
        subCategory.SubCategoryName,
        getCategoryName(subCategory.CategoryID),
        <DeleteButton key={subCategory.SubCategoryID} onClick={() => handleDelete(subCategory.SubCategoryID)} />
      ],
    })),
    [filteredSubCategories, categories]
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          className="select select-bordered"
          value=""
          onChange={handleCategoryChange}
        >
          <option value="" disabled>Select Categories</option>
          {categories.map(category => (
            <option
              key={category.CategoryID}
              value={category.CategoryID}
              disabled={selectedCategories.includes(category.CategoryID)}
            >
              {category.CategoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        {selectedCategories.map(categoryId => (
          <div key={categoryId} className="badge badge-primary mr-2">
            {getCategoryName(categoryId)}
            <button
              type="button"
              className="ml-1"
              onClick={() => setSelectedCategories(selectedCategories.filter(id => id !== categoryId))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <Table headers={headers} data={data} />
    </div>
  );
}

export default SubCategoryTable;
