// src/components/RecipeBookTable.jsx
import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import DeleteButton from './ui/DeleteButton';
import Table from './ui/Table';

function RecipeBookTable() {
  const { recipeBooks, authors, deleteRecipeBook } = useData();

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteRecipeBook(bookId);
      } catch (error) {
        alert('Failed to delete book');
      }
    }
  };

  const getAuthorName = (authorId) => {
    const author = authors.find(author => author.AuthorID === authorId);
    return author ? author.AuthorName : 'Unknown';
  };

  const headers = ['#', 'Book Name', 'Author Name', 'Actions'];

  const data = useMemo(() => 
    recipeBooks.map((book, index) => ({
      id: book.BookID,
      cells: [
        index + 1,
        book.BookName,
        getAuthorName(book.AuthorID),
        <DeleteButton onClick={() => handleDelete(book.BookID)} />,
      ],
    })),
    [recipeBooks, authors]
  );

  return (
    <div className="overflow-x-auto">
      <Table headers={headers} data={data} />
    </div>
  );
}

export default RecipeBookTable;
