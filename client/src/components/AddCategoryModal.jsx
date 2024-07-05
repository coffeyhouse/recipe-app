// src/components/AddCategoryModal.jsx
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TextInput from './ui/TextInput';
import Modal from './ui/Modal';
import Button from './ui/Button';

function AddCategoryModal() {
  const [categoryName, setCategoryName] = useState('');
  const { createCategory } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(categoryName);
      document.getElementById('add_category_modal').close();
    } catch (error) {
      alert('Failed to add category');
    }
  };

  return (
    <Modal id="add_category_modal" title="Add Category">
      <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
        <TextInput
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <Button>Add Category</Button>
      </form>
    </Modal>
  );
}

export default AddCategoryModal;
