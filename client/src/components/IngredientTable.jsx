// src/components/IngredientTable.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import Table from './ui/Table';
import Button from './ui/Button';
import DeleteButton from './ui/DeleteButton';

function IngredientTable() {
  const { ingredients, categories, subCategories, units, deleteIngredient } = useData();

  const handleDelete = async (ingredientId) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      try {
        await deleteIngredient(ingredientId);
      } catch (error) {
        alert('Failed to delete ingredient');
      }
    }
  };

  const getSubCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find(subCategory => subCategory.SubCategoryID === subCategoryId);
    return subCategory ? subCategory.SubCategoryName : 'Unknown';
  };

  const getCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find(subCategory => subCategory.SubCategoryID === subCategoryId);
    if (subCategory) {
      const category = categories.find(category => category.CategoryID === subCategory.CategoryID);
      return category ? category.CategoryName : 'Unknown';
    }
    return 'Unknown';
  };

  const getUnitName = (unitId) => {
    const unit = units.find(unit => unit.UnitID === unitId);
    return unit ? unit.UnitName : 'Unknown';
  };

  const headers = ['ID', 'Ingredient Name', 'Purchase Weight Volume', 'Purchase Unit', 'Category', 'Subcategory', 'Purchase Weight Unit', 'Actions'];

  const data = ingredients.map((ingredient) => ({
    id: ingredient.IngredientID,
    cells: [
      ingredient.IngredientID,
      ingredient.IngredientName,
      ingredient.PurchaseWeightVolume,
      getUnitName(ingredient.PurchaseUnitID),
      getCategoryName(ingredient.SubCategoryID),
      getSubCategoryName(ingredient.SubCategoryID),
      getUnitName(ingredient.PurchaseWeightUnitID),
      <DeleteButton onClick={() => handleDelete(ingredient.IngredientID)} />
    ],
  }));

  return (
    <>
      <Table headers={headers} data={data} />
    </>
  );
}

export default IngredientTable;
