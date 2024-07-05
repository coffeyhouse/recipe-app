// src/components/AuthorTable.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import Button from './ui/Button';
import Table from './ui/Table';
import DeleteButton from './ui/DeleteButton';

function AuthorTable() {
  const { authors, deleteAuthor } = useData();

  const handleDelete = async (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      await deleteAuthor(authorId);
    }
  };

  const headers = ['#', 'Author Name', 'Actions'];

  const data = authors.map((author, index) => ({
    id: author.AuthorID,
    cells: [
      index + 1,
      author.AuthorName,
      <DeleteButton onClick={() => handleDelete(author.AuthorID)} />      
    ],
  }));

  return (
    <>
      <Table headers={headers} data={data} />
    </>
  );
}

export default AuthorTable;
