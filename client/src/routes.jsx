// src/routes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import ManageCategories from './pages/ManageCategories';
import ManageSubCategories from './pages/ManageSubCategories';
import ManageIngredients from './pages/ManageIngredients';
import ManageRecipes from './pages/ManageRecipes';
import ManageAuthors from './pages/ManageAuthors';
import ManageRecipeBooks from './pages/ManageRecipeBooks';
import ManageMealPlans from './pages/ManageMealPlans';
import PrivateRoute from './components/PrivateRoute';
import MealPlanDetails from './pages/MealPlanDetails';

import Home from './pages/Home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/meal-plan/:mealPlanId" element={<PrivateRoute><MealPlanDetails /></PrivateRoute>} />
      <Route path="admin">
        <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="manage-categories" element={<PrivateRoute><ManageCategories /></PrivateRoute>} />
        <Route path="manage-sub-categories" element={<PrivateRoute><ManageSubCategories /></PrivateRoute>} />
        <Route path="manage-ingredients" element={<PrivateRoute><ManageIngredients /></PrivateRoute>} />
        <Route path="manage-recipes" element={<PrivateRoute><ManageRecipes /></PrivateRoute>} />
        <Route path="manage-authors" element={<PrivateRoute><ManageAuthors /></PrivateRoute>} />
        <Route path="manage-recipe-books" element={<PrivateRoute><ManageRecipeBooks /></PrivateRoute>} />
        <Route path="manage-meal-plans" element={<PrivateRoute><ManageMealPlans /></PrivateRoute>} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;
