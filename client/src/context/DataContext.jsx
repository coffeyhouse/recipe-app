import React, { createContext, useContext, useEffect, useState } from 'react';
import * as apiService from '../services/apiService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [recipeBooks, setRecipeBooks] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [units, setUnits] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [mealPlanRecipes, setMealPlanRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          categoriesData,
          subCategoriesData,
          ingredientsData,
          authorsData,
          recipeBooksData,
          recipesData,
          unitsData,
          recipeIngredientsData,
          mealPlansData,
          mealPlanRecipesData,
        ] = await Promise.all([
          apiService.getCategories(),
          apiService.getSubCategories(),
          apiService.getIngredients(),
          apiService.getAuthors(),
          apiService.getRecipeBooks(),
          apiService.getRecipes(),
          apiService.getUnits(),
          apiService.getRecipeIngredients(),
          apiService.getMealPlans(),
          apiService.getMealPlanRecipes(),
        ]);

        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
        setIngredients(ingredientsData);
        setAuthors(authorsData);
        setRecipeBooks(recipeBooksData);
        setRecipes(recipesData);
        setUnits(unitsData);
        setRecipeIngredients(recipeIngredientsData);
        setMealPlans(mealPlansData);
        setMealPlanRecipes(mealPlanRecipesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Categories CRUD
  const createCategory = async (categoryName) => {
    try {
      const newCategory = await apiService.addCategory(categoryName);
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async (categoryId, categoryName) => {
    try {
      const updatedCategory = await apiService.updateCategory(categoryId, categoryName);
      setCategories(categories.map(cat => (cat.CategoryID === categoryId ? updatedCategory : cat)));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await apiService.deleteCategory(categoryId);
      setCategories(categories.filter(cat => cat.CategoryID !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // SubCategories CRUD
  const createSubCategory = async (subCategory) => {
    try {
      const newSubCategory = await apiService.addSubCategory(subCategory);
      setSubCategories([...subCategories, newSubCategory]);
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const updateSubCategory = async (subCategoryId, subCategoryName, categoryId) => {
    try {
      const updatedSubCategory = await apiService.updateSubCategory(subCategoryId, subCategoryName, categoryId);
      setSubCategories(subCategories.map(sub => (sub.SubCategoryID === subCategoryId ? updatedSubCategory : sub)));
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  const deleteSubCategory = async (subCategoryId) => {
    try {
      await apiService.deleteSubCategory(subCategoryId);
      setSubCategories(subCategories.filter(sub => sub.SubCategoryID !== subCategoryId));
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  // Ingredients CRUD
  const createIngredient = async (ingredient) => {
    try {
      const newIngredient = await apiService.addIngredient(ingredient);
      setIngredients([...ingredients, newIngredient]);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const updateIngredient = async (ingredientId, ingredient) => {
    try {
      const updatedIngredient = await apiService.updateIngredient(ingredientId, ingredient);
      setIngredients(ingredients.map(ing => (ing.IngredientID === ingredientId ? updatedIngredient : ing)));
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  const deleteIngredient = async (ingredientId) => {
    try {
      await apiService.deleteIngredient(ingredientId);
      setIngredients(ingredients.filter(ing => ing.IngredientID !== ingredientId));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  // Authors CRUD
  const createAuthor = async (authorName, authorImageURL) => {
    try {
      const newAuthor = await apiService.addAuthor(authorName, authorImageURL);
      setAuthors([...authors, newAuthor]);
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const updateAuthor = async (authorId, author) => {
    try {
      const updatedAuthor = await apiService.updateAuthor(authorId, author);
      setAuthors(authors.map(auth => (auth.AuthorID === authorId ? updatedAuthor : auth)));
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const deleteAuthor = async (authorId) => {
    try {
      await apiService.deleteAuthor(authorId);
      setAuthors(authors.filter(auth => auth.AuthorID !== authorId));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  // Recipe Books CRUD
  const createRecipeBook = async (recipeBook) => {
    try {
      const newRecipeBook = await apiService.addRecipeBook(recipeBook);
      setRecipeBooks([...recipeBooks, newRecipeBook]);
    } catch (error) {
      console.error('Error adding recipe book:', error);
    }
  };

  const updateRecipeBook = async (recipeBookId, recipeBook) => {
    try {
      const updatedRecipeBook = await apiService.updateRecipeBook(recipeBookId, recipeBook);
      setRecipeBooks(recipeBooks.map(book => (book.BookID === recipeBookId ? updatedRecipeBook : book)));
    } catch (error) {
      console.error('Error updating recipe book:', error);
    }
  };

  const deleteRecipeBook = async (recipeBookId) => {
    try {
      await apiService.deleteRecipeBook(recipeBookId);
      setRecipeBooks(recipeBooks.filter(book => book.BookID !== recipeBookId));
    } catch (error) {
      console.error('Error deleting recipe book:', error);
    }
  };

  // Recipes CRUD
  const createRecipe = async (recipe) => {
    try {
      const newRecipe = await apiService.addRecipe(recipe);
      setRecipes([...recipes, newRecipe]);
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error; // Ensure to rethrow the error to be caught in the component
    }
  };

  const updateRecipe = async (recipeId, recipe) => {
    try {
      const updatedRecipe = await apiService.updateRecipe(recipeId, recipe);
      setRecipes(recipes.map(rec => (rec.RecipeID === recipeId ? updatedRecipe : rec)));
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      await apiService.deleteRecipe(recipeId);
      setRecipes(recipes.filter(rec => rec.RecipeID !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const createRecipeIngredient = async (recipeIngredient) => {
    try {
      const newRecipeIngredient = await apiService.addRecipeIngredient(recipeIngredient);
      setRecipeIngredients([...recipeIngredients, newRecipeIngredient]);
    } catch (error) {
      console.error('Error adding recipe ingredient:', error);
    }
  };

  // Meal Plans CRUD
  const createMealPlan = async (mealPlan) => {
    try {
      const newMealPlan = await apiService.addMealPlan(mealPlan);
      setMealPlans([...mealPlans, newMealPlan]);
    } catch (error) {
      console.error('Error adding meal plan:', error);
    }
  };

  const updateMealPlan = async (mealPlanId, mealPlan) => {
    try {
      const updatedMealPlan = await apiService.updateMealPlan(mealPlanId, mealPlan);
      setMealPlans(mealPlans.map(mp => (mp.MealPlanID === mealPlanId ? updatedMealPlan : mp)));
    } catch (error) {
      console.error('Error updating meal plan:', error);
    }
  };

  const deleteMealPlan = async (mealPlanId) => {
    try {
      await apiService.deleteMealPlan(mealPlanId);
      setMealPlans(mealPlans.filter(mp => mp.MealPlanID !== mealPlanId));
    } catch (error) {
      console.error('Error deleting meal plan:', error);
    }
  };

  // Meal Plan Recipes CRUD
  const createMealPlanRecipe = async (mealPlanRecipe) => {
    try {
      const newMealPlanRecipe = await apiService.addMealPlanRecipe(mealPlanRecipe);
      setMealPlanRecipes([...mealPlanRecipes, newMealPlanRecipe]);
    } catch (error) {
      console.error('Error adding meal plan recipe:', error);
    }
  };

  const updateMealPlanRecipe = async (mealPlanRecipeId, mealPlanRecipe) => {
    try {
      const updatedMealPlanRecipe = await apiService.updateMealPlanRecipe(mealPlanRecipeId, mealPlanRecipe);
      setMealPlanRecipes(prev => prev.map(mpr => mpr.MealPlanRecipeID === mealPlanRecipeId ? updatedMealPlanRecipe : mpr));
    } catch (error) {
      console.error('Error updating meal plan recipe:', error);
    }
  };

  const deleteMealPlanRecipe = async (mealPlanRecipeId) => {
    try {
      await apiService.deleteMealPlanRecipe(mealPlanRecipeId);
      setMealPlanRecipes(mealPlanRecipes.filter(mpr => mpr.MealPlanRecipeID !== mealPlanRecipeId));
    } catch (error) {
      console.error('Error deleting meal plan recipe:', error);
    }
  };

  const getShoppingList = (mealPlanId) => {
    const filteredMealPlanRecipes = mealPlanRecipes.filter(mpr => mpr.MealPlanID === mealPlanId);

    const ingredientMap = new Map();

    filteredMealPlanRecipes.forEach(mpr => {
      const recipeId = mpr.RecipeID;
      const recipeIngredientsForRecipe = recipeIngredients.filter(ri => ri.RecipeID === recipeId);

      recipeIngredientsForRecipe.forEach(ri => {
        const ingredient = ingredients.find(ing => ing.IngredientID === ri.IngredientID);
        const unit = units.find(unit => unit.UnitID === ri.UnitID);
        if (ingredient) {
          const existing = ingredientMap.get(ingredient.IngredientID);
          if (existing) {
            existing.Quantity += ri.Quantity;
          } else {
            ingredientMap.set(ingredient.IngredientID, {
              ...ingredient,
              Quantity: ri.Quantity,
              unit: unit || { UnitName: 'Unknown' }
            });
          }
        }
      });
    });

    return Array.from(ingredientMap.values());
  };

  return (
    <DataContext.Provider
      value={{
        categories, createCategory, updateCategory, deleteCategory,
        subCategories, createSubCategory, updateSubCategory, deleteSubCategory,
        ingredients, createIngredient, updateIngredient, deleteIngredient,
        authors, createAuthor, updateAuthor, deleteAuthor,
        recipeBooks, createRecipeBook, updateRecipeBook, deleteRecipeBook,
        recipes, createRecipe, updateRecipe, deleteRecipe,
        units, recipeIngredients, createRecipeIngredient,
        mealPlans, createMealPlan, updateMealPlan, deleteMealPlan,
        mealPlanRecipes, createMealPlanRecipe, updateMealPlanRecipe, deleteMealPlanRecipe,
        getShoppingList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
