import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import TextInput from './ui/TextInput';
import Select from './ui/Select';

function AddRecipeBookModal() {
  const [bookName, setBookName] = useState('');
  const [authorID, setAuthorID] = useState('');
  const [coverArtURL, setCoverArtURL] = useState('');

  const { authors, createRecipeBook } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeBook = {
      AuthorID: authorID,
      BookName: bookName,
      CoverArtURL: coverArtURL
    };

    try {
      await createRecipeBook(recipeBook);
      document.getElementById('add_recipe_book_modal').close();
    } catch (error) {
      alert('Failed to add book');
    }
  };

  const authorOptions = authors.map(author => ({
    value: author.AuthorID,
    label: author.AuthorName,
  }));

  return (
    <Modal id="add_recipe_book_modal" title="Add Recipe Book">
      <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
        <TextInput
          label="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          required
        />
        <Select
          label="Author"
          value={authorID}
          onChange={(e) => setAuthorID(e.target.value)}
          required
          options={authorOptions}
          defaultOption="Select an author"
        />
        <TextInput
          label="Cover Art URL"
          value={coverArtURL}
          onChange={(e) => setCoverArtURL(e.target.value)}
        />
        <Button>Add Book</Button>
      </form>
    </Modal>
  );
}

export default AddRecipeBookModal;
