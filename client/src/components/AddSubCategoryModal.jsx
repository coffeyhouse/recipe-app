import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import TextInput from './ui/TextInput';
import Select from './ui/Select';

function AddSubCategoryModal() {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { categories, createSubCategory } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subCategory = {
      SubCategoryName: subCategoryName,
      CategoryID: categoryId,
    };

    try {
      await createSubCategory(subCategory);
      document.getElementById('add_sub_category_modal').close();
    } catch (error) {
      console.error('Error adding sub-category:', error);
      alert('Failed to add sub-category');
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category.CategoryID,
    label: category.CategoryName,
  }));

  return (
    <Modal id="add_sub_category_modal" title="Add Sub-Category">
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
        <TextInput
          label="Sub-Category Name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          required
        />        
        <Select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          options={categoryOptions}
          defaultOption="Select a category"
        />
        <Button>Add Sub-Category</Button>
      </form>
    </Modal>
  );
}

export default AddSubCategoryModal;
