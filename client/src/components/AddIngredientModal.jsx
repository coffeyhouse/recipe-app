import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import TextInput from './ui/TextInput';
import Modal from './ui/Modal';
import Select from './ui/Select';
import Button from './ui/Button';

function AddIngredientModal({ onIngredientAdded = () => {} }) {
  const [ingredientName, setIngredientName] = useState('');
  const [purchaseWeightVolume, setPurchaseWeightVolume] = useState('');
  const [purchaseUnitId, setPurchaseUnitId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [purchaseWeightUnitId, setPurchaseWeightUnitId] = useState('');

  const { categories, subCategories, units, createIngredient } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredient = {
      IngredientName: ingredientName,
      PurchaseWeightVolume: purchaseWeightVolume,
      PurchaseUnitID: purchaseUnitId,
      SubCategoryID: subCategoryId,
      PurchaseWeightUnitID: purchaseWeightUnitId,
    };

    try {
      const newIngredient = await createIngredient(ingredient);
      onIngredientAdded(newIngredient);
      document.getElementById('add_ingredient_modal').close();
    } catch (error) {
      alert('Failed to add ingredient');
    }
  };

  const filteredSubCategories = subCategories.filter(
    (subCategory) => subCategory.CategoryID === parseInt(categoryId)
  );

  const unitOptions = units.map((unit) => ({
    value: unit.UnitID,
    label: unit.UnitName,
  }));

  const categoryOptions = categories.map((category) => ({
    value: category.CategoryID,
    label: category.CategoryName,
  }));

  const subCategoryOptions = filteredSubCategories.map((subCategory) => ({
    value: subCategory.SubCategoryID,
    label: subCategory.SubCategoryName,
  }));

  return (
    <Modal id="add_ingredient_modal" title="Add Ingredient" className="modal modal-bottom sm:modal-middle">
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
        <TextInput
          label="Ingredient Name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          required
        />
        <TextInput
          label="Purchase Weight Volume"
          value={purchaseWeightVolume}
          onChange={(e) => setPurchaseWeightVolume(e.target.value)}
          required
        />
        <Select
          label="Purchase Unit"
          value={purchaseUnitId}
          onChange={(e) => setPurchaseUnitId(e.target.value)}
          required
          options={unitOptions}
          defaultOption="Select a unit"
        />
        <Select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          options={categoryOptions}
          defaultOption="Select a category"
        />
        <Select
          label="Sub-Category"
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
          required
          options={subCategoryOptions}
          defaultOption="Select a sub-category"
          disabled={!categoryId} // Disable until a category is selected
        />
        <Select
          label="Purchase Weight Unit"
          value={purchaseWeightUnitId}
          onChange={(e) => setPurchaseWeightUnitId(e.target.value)}
          required
          options={unitOptions}
          defaultOption="Select a unit"
        />
        <Button>Add Ingredient</Button>
      </form>
    </Modal>
  );
}

export default AddIngredientModal;
