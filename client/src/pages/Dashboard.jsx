// src/pages/Home.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';

function Dashboard() {
  const { categories, subCategories, ingredients, authors, recipeBooks, recipes } = useData();

  const items = [
    { name: 'Categories', count: categories.length, link: '/manage-categories' },
    { name: 'Subcategories', count: subCategories.length, link: '/manage-sub-categories' },
    { name: 'Ingredients', count: ingredients.length, link: '/manage-ingredients' },
    { name: 'Authors', count: authors.length, link: '/manage-authors' },
    { name: 'Recipe Books', count: recipeBooks.length, link: '/manage-recipe-books' },
    { name: 'Recipes', count: recipes.length, link: '/manage-recipes' },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-6">
      {items.map((item, index) => (
        <Card key={index} title={item.name} count={item.count} link={item.link} />
      ))}
    </div>
  );
}

export default Dashboard;
