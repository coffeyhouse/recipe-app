import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { recipes, authors, recipe_books, recipe_ingredients, recipe_steps, ingredients, units, ingredient_categories, ingredient_sub_categories } from "../dummy-data";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { FaChevronRight, FaChevronLeft, FaPlus } from "react-icons/fa";
import Input from "../components/Input";

export default function RecipeIngredients() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isAddIngredientModalOpen, setIsAddIngredientModalOpen] = useState(false);
    const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [isShowingSubCategories, setIsShowingSubCategories] = useState(false);
    const [isShowingIngredients, setIsShowingIngredients] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        const id = recipeId;
        const foundRecipe = recipes.find(r => r.id === parseInt(id));
        if (foundRecipe) {
            const author = authors.find(author => author.id === foundRecipe.author_id)?.name || "Unknown Author";
            const book = recipe_books.find(book => book.id === foundRecipe.book_id)?.book_name || "Unknown Book";

            const recipeIngredients = recipe_ingredients
                .filter(ri => ri.recipe_id === foundRecipe.id)
                .map(ri => {
                    const ingredient = ingredients.find(i => i.id === ri.ingredient_id);
                    const unit = units.find(u => u.id === ri.unit_id);
                    return {
                        name: ingredient.name,
                        quantity: `${ri.quantity} ${unit.abbreviation}`,
                    };
                });

            const recipeSteps = recipe_steps
                .filter(rs => rs.recipe_id === foundRecipe.id)
                .sort((a, b) => a.step_number - b.step_number);

            setRecipe({
                ...foundRecipe,
                author,
                book,
                ingredients: recipeIngredients,
                steps: recipeSteps,
            });
        }
    }, [recipeId]);

    function handleCategorySelect(id) {
        const filtered = ingredient_sub_categories.filter(sub_category => sub_category.category_id === id);
        setFilteredSubCategories(filtered);
        setIsShowingSubCategories(true);
        setIsShowingIngredients(false);
        setSelectedCategory(ingredient_categories.find(category => category.id === id).name);
        setSelectedSubCategory(null);
    }

    function handleSubCategorySelect(id) {
        const filtered = ingredients.filter(ingredient => ingredient.sub_category_id === id);
        setFilteredIngredients(filtered);
        setIsShowingIngredients(true);
        setSelectedSubCategory(ingredient_sub_categories.find(sub_category => sub_category.id === id).name);
    }

    function handleBackToCategories() {
        setIsShowingSubCategories(false);
        setIsShowingIngredients(false);
        setSelectedCategory(null);
        setSelectedSubCategory(null);
    }

    function handleBackToSubCategories() {
        setIsShowingIngredients(false);
        setSelectedSubCategory(null);
    }

    function handleIngredientClick(ingredient) {
        setSelectedIngredient(ingredient);
        setIsIngredientDetailsModalOpen(true);
    }

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Card>
                <h1>Recipe {recipe.name} ingredients</h1>
                {recipe.ingredients && (
                    <>
                        <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
                        <button className="btn btn-sm btn-accent" onClick={() => setIsAddIngredientModalOpen(true)}>Edit</button>
                        <ul className="list-disc list-inside mt-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name} - {ingredient.quantity}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Card>
            {isAddIngredientModalOpen && (
                <Modal
                    title="Add ingredient to recipe"
                    onClose={() => setIsAddIngredientModalOpen(false)}
                >
                    <Input label="Search for ingredient" />
                    <div className="mt-4 px-1">
                        {isShowingIngredients ? (
                            <>
                                <div className="flex w-full justify-between items-center py-3 border-b cursor-pointer" onClick={handleBackToSubCategories}>
                                    <FaChevronLeft />
                                    <span>Back to Sub-Categories</span>
                                </div>
                                {filteredIngredients.length > 0 && filteredIngredients.map(ingredient => (
                                    <div key={ingredient.id} className="flex w-full justify-between items-center py-3 border-b cursor-pointer" onClick={() => handleIngredientClick(ingredient)}>
                                        {ingredient.name}
                                        <FaPlus />
                                    </div>
                                ))}
                            </>
                        ) : isShowingSubCategories ? (
                            <>
                                <div className="flex w-full justify-between items-center py-3 border-b cursor-pointer" onClick={handleBackToCategories}>
                                    <FaChevronLeft />
                                    <span>Back to Categories</span>
                                </div>
                                {filteredSubCategories.length > 0 && filteredSubCategories.map(sub_category => (
                                    <div key={sub_category.id} className="flex w-full justify-between items-center py-3 border-b cursor-pointer" onClick={() => handleSubCategorySelect(sub_category.id)}>
                                        {sub_category.name}
                                        <FaChevronRight />
                                    </div>
                                ))}
                            </>
                        ) : (
                            ingredient_categories.map(category => (
                                <div
                                    key={category.id}
                                    className="flex w-full justify-between items-center py-3 border-b cursor-pointer"
                                    onClick={() => handleCategorySelect(category.id)}
                                >
                                    {category.name}
                                    <FaChevronRight />
                                </div>
                            ))
                        )}
                        <div className="mt-4">
                            {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
                            {selectedSubCategory && <p>Selected Sub-Category: {selectedSubCategory}</p>}
                        </div>
                    </div>
                </Modal>
            )}
            {isIngredientDetailsModalOpen && selectedIngredient && (
                <Modal
                    title={`Add ${selectedIngredient.name}`}
                    onClose={() => setIsIngredientDetailsModalOpen(false)}
                >
                    <div className="mt-4 px-1">
                        <Input label="Quantity" placeholder="Enter quantity" />
                        <Input label="Unit" placeholder="Enter unit" />
                    </div>
                </Modal>
            )}
        </>
    );
}
