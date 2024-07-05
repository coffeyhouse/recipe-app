// src/components/CategoryTable.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import Table from './ui/Table';
import Button from './ui/Button';
import DeleteButton from './ui/DeleteButton';

function CategoryTable() {
  const { categories, subCategories, deleteCategory } = useData();

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(categoryId);
    }
  };

  const headers = ['ID', 'Category Name', 'Sub-Categories', 'Actions'];

  const data = categories.map((category, index) => {
    const categorySubCategories = subCategories.filter(sub => sub.CategoryID === category.CategoryID).map(sub => sub.SubCategoryName).join(', ');

    return {
      id: category.CategoryID,
      cells: [
        category.CategoryID,
        category.CategoryName,
        categorySubCategories || 'None',
        <DeleteButton onClick={() => handleDelete(category.CategoryID)} />
      ],
    };
  });

  return (
    <>
      <Table headers={headers} data={data} />
    </>
  );
}

export default CategoryTable;
