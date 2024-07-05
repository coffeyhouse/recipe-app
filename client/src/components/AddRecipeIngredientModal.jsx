import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useData } from '../context/DataContext';
import AddIngredientModal from './AddIngredientModal';
import Table from './ui/Table';
import Button from './ui/Button';
import Modal from './ui/Modal';
import TextInput from './ui/TextInput';
import Select from './ui/Select';

function AddRecipeIngredientModal({ recipeId }) {
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [defaultUnitId, setDefaultUnitId] = useState('');

  const { ingredients, units, categories, subCategories, createRecipeIngredient } = useData();

  useEffect(() => {
    if (ingredients.length && categories.length && subCategories.length) {
      const updatedIngredients = ingredients.map((ingredient) => {
        const subCategory = subCategories.find(
          (sub) => sub.SubCategoryID === ingredient.SubCategoryID
        );
        const category = subCategory
          ? categories.find((cat) => cat.CategoryID === subCategory.CategoryID)
          : null;

        return {
          ...ingredient,
          CategoryName: category ? category.CategoryName : '',
          SubCategoryName: subCategory ? subCategory.SubCategoryName : '',
        };
      });
      setFilteredIngredients(updatedIngredients);
    }
  }, [ingredients, categories, subCategories]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setFilteredIngredients(ingredients.map((ingredient) => {
        const subCategory = subCategories.find(
          (sub) => sub.SubCategoryID === ingredient.SubCategoryID
        );
        const category = subCategory
          ? categories.find((cat) => cat.CategoryID === subCategory.CategoryID)
          : null;

        return {
          ...ingredient,
          CategoryName: category ? category.CategoryName : '',
          SubCategoryName: subCategory ? subCategory.SubCategoryName : '',
        };
      }));
    } else {
      const fuse = new Fuse(filteredIngredients, {
        keys: ['IngredientName', 'CategoryName', 'SubCategoryName'],
        threshold: 0.3, // Adjust the threshold as needed
      });

      const result = fuse.search(term);
      setFilteredIngredients(result.map((r) => r.item));
    }
  };

  const handleAddClick = (ingredientId) => {
    const ingredient = ingredients.find((ing) => ing.IngredientID === ingredientId);
    if (ingredient) {
      setSelectedIngredientId(ingredientId);
      setDefaultUnitId(ingredient.PurchaseUnitID || ''); // Handle missing PurchaseUnitID
      setSelectedUnitId(ingredient.PurchaseUnitID || ''); // Set the default unit id
      document.getElementById('quantity_unit_modal').showModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      RecipeID: recipeId,
      IngredientID: selectedIngredientId,
      Quantity: parseFloat(quantity),
      UnitID: selectedUnitId || defaultUnitId,
    };

    try {
      await createRecipeIngredient(data);
      window.location.reload(); // Refresh the page to show the new ingredient
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add ingredient');
    }
  };

  const handleAddNewIngredient = () => {
    document.getElementById('add_ingredient_modal').showModal();
  };

  const handleNewIngredientAdded = (newIngredient) => {
    if (newIngredient && newIngredient.PurchaseUnitID) {
      setFilteredIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          ...newIngredient,
          CategoryName: '',
          SubCategoryName: '',
        },
      ]);

      // Automatically select the newly added ingredient and open the quantity/unit modal
      setSelectedIngredientId(newIngredient.IngredientID);
      setDefaultUnitId(newIngredient.PurchaseUnitID);
      setSelectedUnitId(newIngredient.PurchaseUnitID);
      setQuantity(''); // Reset the quantity
      document.getElementById('quantity_unit_modal').showModal();
    } else {
      alert('New ingredient does not have a PurchaseUnitID');
    }
  };

  const headers = ['Ingredient', 'Category', 'Sub-Category', 'Action'];
  const data = filteredIngredients.map((ingredient) => ({
    id: ingredient.IngredientID,
    cells: [
      ingredient.IngredientName,
      ingredient.CategoryName,
      ingredient.SubCategoryName,
      <Button
        size="sm"
        variant="primary"
        outline={true}
        onClick={() => handleAddClick(ingredient.IngredientID)}
      >
        Add
      </Button>
    ],
  }));

  const unitOptions = units.map(unit => ({
    value: unit.UnitID,
    label: unit.UnitName,
  }));

  return (
    <div>
      <Modal id="add_recipe_ingredient_modal" title="Add Ingredient to Recipe" wide={true}>
        <div className='flex flex-col gap-4 mb-8'>
          <TextInput
            label="Search Ingredient"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Type to search ingredients..."
          />

          <Button
            outline={true}
            size='sm'
            onClick={handleAddNewIngredient}
          >Add New Ingredient</Button>
        </div>
        <Table headers={headers} data={data} />
      </Modal>

      <Modal id="quantity_unit_modal" title="Enter Quantity and Unit">
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col mt-4">
          <TextInput
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <Select
            label="Unit"
            value={selectedUnitId || defaultUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value)}
            required
            options={unitOptions}
            defaultOption="Select a unit"
          />
          <Button>Add Ingredient</Button>
        </form>
      </Modal>

      <AddIngredientModal onIngredientAdded={handleNewIngredientAdded} />
    </div>
  );
}

export default AddRecipeIngredientModal;
