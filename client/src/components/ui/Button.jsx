// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ type, variant = 'primary', size = 'md', outline = false, block = false, circle = false, square = false, className = '', onClick, children }) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const outlineClass = outline ? 'btn-outline' : '';
  const blockClass = block ? 'btn-block' : '';
  const circleClass = circle ? 'btn-circle' : '';
  const squareClass = square ? 'btn-square' : '';

  const classes = `${baseClass} ${variantClass} ${sizeClass} ${outlineClass} ${blockClass} ${circleClass} ${squareClass} ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
