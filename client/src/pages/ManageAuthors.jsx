// src/pages/ManageAuthors.jsx
import React from 'react';
import AuthorTable from '../components/AuthorTable';
import AddAuthorModal from '../components/AddAuthorModal';

function ManageAuthors() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="text-3xl font-bold">Manage Authors</h1>
      <div>
        <button className="btn btn-sm btn-secondary btn-outline" onClick={() => document.getElementById('add_author_modal').showModal()}>Add Author</button>
      </div>
      <AuthorTable />
      <AddAuthorModal />
    </div>
  );
}

export default ManageAuthors;
