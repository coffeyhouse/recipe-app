// src/components/ui/DeleteButton.jsx
import React from 'react';
import Button from './Button';

const DeleteButton = ({ onClick }) => (
  <Button
    size="sm"
    variant="error"
    outline={true}
    onClick={onClick}
  >
    Delete
  </Button>
);

export default DeleteButton;
