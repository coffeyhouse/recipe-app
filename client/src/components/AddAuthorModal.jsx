// src/components/AddAuthorModal.jsx
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Button from './ui/Button';
import TextInput from './ui/TextInput';
import Modal from './ui/Modal';

function AddAuthorModal() {
  const [authorName, setAuthorName] = useState('');
  const [authorImageURL, setAuthorImageURL] = useState('');
  const { createAuthor } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuthor(authorName, authorImageURL);
      document.getElementById('add_author_modal').close();
    } catch (error) {
      alert('Failed to add author');
    }
  };

  return (
    <Modal id="add_author_modal" title="Add Author">
      <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
        <TextInput
          label="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <TextInput
          label="Author Image URL"
          value={authorImageURL}
          onChange={(e) => setAuthorImageURL(e.target.value)}
        />
        <Button>Add Author</Button>
      </form>
    </Modal>
  );
}

export default AddAuthorModal;
