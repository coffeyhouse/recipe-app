import { supabase } from '../supabaseClient';

// Categories
export const getCategories = async () => {
    const { data, error } = await supabase.from('IngredientCategories').select('*');
    if (error) throw error;
    return data;
};

export const addCategory = async (categoryName) => {
    const { data, error } = await supabase
        .from('IngredientCategories')
        .insert([{ CategoryName: categoryName }])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateCategory = async (categoryId, categoryName) => {
    const { data, error } = await supabase
        .from('IngredientCategories')
        .update({ CategoryName: categoryName })
        .eq('CategoryID', categoryId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteCategory = async (categoryId) => {
    const { data, error } = await supabase.from('IngredientCategories').delete().eq('CategoryID', categoryId).select();
    if (error) throw error;
    return data;
};

// SubCategories
export const getSubCategories = async () => {
    const { data, error } = await supabase.from('IngredientSubCategories').select('*');
    if (error) throw error;
    return data;
};

export const addSubCategory = async (subCategory) => {
    const { data, error } = await supabase
        .from('IngredientSubCategories')
        .insert([subCategory])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateSubCategory = async (subCategoryId, subCategoryName, categoryId) => {
    const { data, error } = await supabase
        .from('IngredientSubCategories')
        .update({ SubCategoryName: subCategoryName, CategoryID: categoryId })
        .eq('SubCategoryID', subCategoryId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteSubCategory = async (subCategoryId) => {
    const { data, error } = await supabase.from('IngredientSubCategories').delete().eq('SubCategoryID', subCategoryId).select();
    if (error) throw error;
    return data;
};

// Ingredients
export const getIngredients = async () => {
    const { data, error } = await supabase.from('Ingredients').select('*');
    if (error) throw error;
    return data;
};

export const addIngredient = async (ingredient) => {
    const { data, error } = await supabase
        .from('Ingredients')
        .insert([ingredient])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateIngredient = async (ingredientId, ingredient) => {
    const { data, error } = await supabase
        .from('Ingredients')
        .update(ingredient)
        .eq('IngredientID', ingredientId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteIngredient = async (ingredientId) => {
    const { data, error } = await supabase.from('Ingredients').delete().eq('IngredientID', ingredientId).select();
    if (error) throw error;
    return data;
};

// Authors
export const getAuthors = async () => {
    const { data, error } = await supabase.from('RecipeAuthors').select('*');
    if (error) throw error;
    return data;
};

export const addAuthor = async (authorName, authorImageURL) => {
    const { data, error } = await supabase
        .from('RecipeAuthors')
        .insert([{ AuthorName: authorName, AuthorImageURL: authorImageURL }])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateAuthor = async (authorId, author) => {
    const { data, error } = await supabase
        .from('RecipeAuthors')
        .update(author)
        .eq('AuthorID', authorId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteAuthor = async (authorId) => {
    const { data, error } = await supabase.from('RecipeAuthors').delete().eq('AuthorID', authorId).select();
    if (error) throw error;
    return data;
};

// Recipe Books
export const getRecipeBooks = async () => {
    const { data, error } = await supabase.from('RecipeBooks').select('*');
    if (error) throw error;
    return data;
};

export const addRecipeBook = async (recipeBook) => {
    const { data, error } = await supabase
        .from('RecipeBooks')
        .insert([recipeBook])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateRecipeBook = async (recipeBookId, recipeBook) => {
    const { data, error } = await supabase
        .from('RecipeBooks')
        .update(recipeBook)
        .eq('BookID', recipeBookId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteRecipeBook = async (recipeBookId) => {
    const { data, error } = await supabase.from('RecipeBooks').delete().eq('BookID', recipeBookId).select();
    if (error) throw error;
    return data;
};

// Recipes
export const getRecipes = async () => {
    const { data, error } = await supabase.from('Recipes').select('*');
    if (error) throw error;
    return data;
};

export const addRecipe = async (recipe) => {
    console.log('Inserting recipe:', recipe);
    const { data, error } = await supabase
        .from('Recipes')
        .insert([recipe])
        .select(); // Ensure to select the inserted rows
    console.log('Supabase insert response:', { data, error });
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateRecipe = async (recipeId, recipe) => {
    const { data, error } = await supabase
        .from('Recipes')
        .update(recipe)
        .eq('RecipeID', recipeId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteRecipe = async (recipeId) => {
    const { data, error } = await supabase.from('Recipes').delete().eq('RecipeID', recipeId).select();
    if (error) throw error;
    return data;
};

// Units
export const getUnits = async () => {
    const { data, error } = await supabase.from('Units').select('*');
    if (error) throw error;
    return data;
};

// Recipe Ingredients
export const getRecipeIngredients = async () => {
    const { data, error } = await supabase.from('RecipeIngredients').select('*');
    if (error) throw error;
    return data;
};

export const addRecipeIngredient = async (recipeIngredient) => {
    const { data, error } = await supabase
        .from('RecipeIngredients')
        .insert([recipeIngredient])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

// Meal Plans
export const getMealPlans = async () => {
    const { data, error } = await supabase.from('MealPlans').select('*');
    if (error) throw error;
    return data;
};

export const addMealPlan = async (mealPlan) => {
    console.log('Inserting meal plan:', mealPlan);
    const { data, error } = await supabase
        .from('MealPlans')
        .insert([mealPlan])
        .select(); // Ensure to select the inserted rows
    console.log('Supabase insert response:', { data, error });
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateMealPlan = async (mealPlanId, mealPlan) => {
    const { data, error } = await supabase
        .from('MealPlans')
        .update(mealPlan)
        .eq('MealPlanID', mealPlanId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteMealPlan = async (mealPlanId) => {
    const { data, error } = await supabase.from('MealPlans')
        .delete()
        .eq('MealPlanID', mealPlanId)
        .select();
    if (error) throw error;
    return data;
};

// Meal Plan Recipes
export const getMealPlanRecipes = async () => {
    const { data, error } = await supabase
        .from('MealPlanRecipes')
        .select('*');
    if (error) throw error;
    return data;
};

export const addMealPlanRecipe = async (mealPlanRecipe) => {
    const { data, error } = await supabase
        .from('MealPlanRecipes')
        .insert([mealPlanRecipe])
        .select(); // Ensure to select the inserted rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from insert operation');
    }
    return data[0];
};

export const updateMealPlanRecipe = async (mealPlanRecipeId, mealPlanRecipe) => {
    const { data, error } = await supabase
        .from('MealPlanRecipes')
        .update(mealPlanRecipe)
        .eq('MealPlanRecipeID', mealPlanRecipeId)
        .select(); // Ensure to select the updated rows
    if (error) throw error;
    if (!data || data.length === 0) {
        throw new Error('No data returned from update operation');
    }
    return data[0];
};

export const deleteMealPlanRecipe = async (mealPlanRecipeId) => {
    const { data, error } = await supabase.from('MealPlanRecipes').delete().eq('MealPlanRecipeID', mealPlanRecipeId).select();
    if (error) throw error;
    return data;
};
