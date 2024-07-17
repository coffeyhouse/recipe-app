import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import MealCard from "../components/MealCard"; // Assuming MealCard component exists
import Recipe from "./recipe";
import { recipes, authors, recipe_books, ingredients, recipe_ingredients } from "../dummy-data"; // Assuming dummy-data has the recipes
import { FaChevronRight, FaFilter, FaArrowLeft, FaTimes } from "react-icons/fa";
import Input from "../components/Input";
import Modal from "../components/Modal";

const RecipeSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filterOption, setFilterOption] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for selected recipe

    const fuse = new Fuse(recipes, {
        keys: ["name"],
        threshold: 0.3,
    });

    useEffect(() => {
        handleSearchAndFilter();
    }, [searchTerm, selectedAuthors, selectedCuisines, selectedBooks, selectedIngredients]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchAndFilter = () => {
        let results = searchTerm ? fuse.search(searchTerm).map(result => result.item) : recipes;

        results = results.filter(recipe => recipe.main_meal); // Filter to show only main meals

        if (selectedAuthors.length > 0) {
            results = results.filter(recipe => selectedAuthors.includes(recipe.author_id));
        }

        if (selectedCuisines.length > 0) {
            results = results.filter(recipe => selectedCuisines.includes(recipe.cuisine));
        }

        if (selectedBooks.length > 0) {
            results = results.filter(recipe => selectedBooks.includes(recipe.book_id));
        }

        if (selectedIngredients.length > 0) {
            const recipeIdsWithSelectedIngredients = recipe_ingredients
                .filter(ri => selectedIngredients.includes(ri.ingredient_id))
                .map(ri => ri.recipe_id);
            results = results.filter(recipe => recipeIdsWithSelectedIngredients.includes(recipe.id));
        }

        setFilteredRecipes(results);
    };

    const openFilterModal = () => {
        setIsFilterModalOpen(true);
        setFilterOption(null);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleAuthorChange = (authorId) => {
        toggleSelection(selectedAuthors, setSelectedAuthors, authorId);
    };

    const handleCuisineChange = (cuisine) => {
        toggleSelection(selectedCuisines, setSelectedCuisines, cuisine);
    };

    const handleBookChange = (bookId) => {
        toggleSelection(selectedBooks, setSelectedBooks, bookId);
    };

    const handleIngredientChange = (ingredientId) => {
        toggleSelection(selectedIngredients, setSelectedIngredients, ingredientId);
    };

    const toggleSelection = (selectedList, setSelectedList, item) => {
        setSelectedList(prevSelected =>
            prevSelected.includes(item)
                ? prevSelected.filter(id => id !== item)
                : [...prevSelected, item]
        );
    };

    const handleApplyFilter = () => {
        closeFilterModal();
        handleSearchAndFilter();
    };

    const handleBackToMenu = () => {
        setFilterOption(null);
    };

    const clearFilter = (selectedList, setSelectedList, item) => {
        setSelectedList(prevSelected => prevSelected.filter(id => id !== item));
    };

    const getFilteredAuthors = () => {
        const filteredAuthorIds = [...new Set(filteredRecipes.map(recipe => recipe.author_id))];
        return authors.filter(author => filteredAuthorIds.includes(author.id));
    };

    const getFilteredBooks = () => {
        const filteredBookIds = [...new Set(filteredRecipes.map(recipe => recipe.book_id))];
        return recipe_books.filter(book => filteredBookIds.includes(book.id));
    };

    const getFilteredCuisines = () => {
        const filteredCuisineCodes = [...new Set(filteredRecipes.map(recipe => recipe.cuisine))];
        return cuisines.filter(cuisine => filteredCuisineCodes.includes(cuisine.code));
    };

    const getFilteredIngredients = () => {
        const filteredIngredientIds = [
            ...new Set(
                recipe_ingredients
                    .filter(ri => filteredRecipes.map(fr => fr.id).includes(ri.recipe_id))
                    .map(ri => ri.ingredient_id)
            ),
        ];
        return ingredients.filter(ingredient => filteredIngredientIds.includes(ingredient.id));
    };

    const cuisines = [
        { code: "MX", country: "Mexican" },
        { code: "US", country: "American" },
        { code: "CN", country: "Chinese" },
        { code: "GB", country: "British" },
        { code: "IT", country: "Italian" },
        { code: "ES", country: "Spanish" },
        { code: "FR", country: "French" },
        { code: "IN", country: "Indian" },
        { code: "GR", country: "Greek" },
        { code: "JP", country: "Japanese" },
        { code: "KR", country: "Korean" },
        { code: "TH", country: "Thai" }
    ];

    const renderActiveFilters = () => (
        <div className="flex flex-wrap gap-2 mt-2">
            {selectedAuthors.map(authorId => (
                <span key={authorId} className="badge badge-sm badge-accent">
                    {authors.find(author => author.id === authorId)?.name}
                    <FaTimes
                        className="ml-1 cursor-pointer"
                        onClick={() => clearFilter(selectedAuthors, setSelectedAuthors, authorId)}
                    />
                </span>
            ))}
            {selectedCuisines.map(cuisine => (
                <span key={cuisine} className="badge badge-sm badge-secondary">
                    {cuisines.find(c => c.code === cuisine)?.country}
                    <FaTimes
                        className="ml-1 cursor-pointer"
                        onClick={() => clearFilter(selectedCuisines, setSelectedCuisines, cuisine)}
                    />
                </span>
            ))}
            {selectedBooks.map(bookId => (
                <span key={bookId} className="badge badge-sm badge-primary">
                    {recipe_books.find(book => book.id === bookId)?.book_name}
                    <FaTimes
                        className="ml-1 cursor-pointer"
                        onClick={() => clearFilter(selectedBooks, setSelectedBooks, bookId)}
                    />
                </span>
            ))}
            {selectedIngredients.map(ingredientId => (
                <span key={ingredientId} className="badge badge-sm badge-info">
                    {ingredients.find(ingredient => ingredient.id === ingredientId)?.name}
                    <FaTimes
                        className="ml-1 cursor-pointer"
                        onClick={() => clearFilter(selectedIngredients, setSelectedIngredients, ingredientId)}
                    />
                </span>
            ))}
        </div>
    );

    const renderFilterOptions = (options, selectedOptions, onChange) => (
        <div className="flex flex-col gap-4 items-start">
            <button className="btn btn-ghost" onClick={handleBackToMenu}>
                <FaArrowLeft /> Back
            </button>
            {options.map(option => (
                <label key={option.id || option.code} className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id || option.code)}
                        onChange={() => onChange(option.id || option.code)}
                        className="checkbox"
                    />
                    <span className="ml-2">{option.name || option.country || option.book_name}</span>
                </label>
            ))}
        </div>
    );

    return (
        <div>
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex gap-2 items-end">
                    <div className="w-full max-w-xs flex-shrink-1">
                        <Input
                            label="Recipe search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button className="btn btn-secondary" onClick={openFilterModal}>
                        <FaFilter />
                    </button>
                </div>
                {(selectedAuthors.length > 0 || selectedCuisines.length > 0 || selectedBooks.length > 0 || selectedIngredients.length > 0) && renderActiveFilters()}
            </div>
            <div className="flex flex-col gap-4">
                {filteredRecipes.map(recipe => (
                    <MealCard
                        key={recipe.id}
                        mealType={recipe.type}
                        meal={recipe.name}
                        image_url={recipe.image_url}
                        side={(recipe.ingredients || []).join(", ")}
                        icon={<FaChevronRight />}
                        source={{
                            author: authors.find(author => author.id === recipe.author_id)?.name || "Unknown Author",
                            book: recipe_books.find(book => book.id === recipe.book_id)?.book_name || "Unknown Book"
                        }}
                        color="primary"
                        onClick={() => setSelectedRecipe(recipe)} // Set the selected recipe when clicked
                    />
                ))}
            </div>
            {isFilterModalOpen && (
                <Modal title="Filter Recipes" onClose={closeFilterModal}>
                    <div className="flex flex-col gap-4 px-1">
                        {(selectedAuthors.length > 0 || selectedCuisines.length > 0 || selectedBooks.length > 0 || selectedIngredients.length > 0) && renderActiveFilters()}
                        {filterOption === null && (
                            <div className="flex flex-col gap-4">
                                <button className="btn btn-neutral btn-outline btn-sm" onClick={() => setFilterOption("author")}>Filter by Author</button>
                                <button className="btn btn-neutral btn-outline btn-sm" onClick={() => setFilterOption("cuisine")}>Filter by Cuisine</button>
                                <button className="btn btn-neutral btn-outline btn-sm" onClick={() => setFilterOption("book")}>Filter by Book</button>
                                <button className="btn btn-neutral btn-outline btn-sm" onClick={() => setFilterOption("ingredient")}>Filter by Ingredient</button>
                            </div>
                        )}
                        {filterOption === "author" && renderFilterOptions(getFilteredAuthors(), selectedAuthors, handleAuthorChange)}
                        {filterOption === "cuisine" && renderFilterOptions(getFilteredCuisines(), selectedCuisines, handleCuisineChange)}
                        {filterOption === "book" && renderFilterOptions(getFilteredBooks(), selectedBooks, handleBookChange)}
                        {filterOption === "ingredient" && renderFilterOptions(getFilteredIngredients(), selectedIngredients, handleIngredientChange)}
                        <button className="btn btn-primary mt-4" onClick={handleApplyFilter}>Apply Filter</button>
                    </div>
                </Modal>
            )}
            {selectedRecipe && (
                <Modal title="Meal preview" onClose={() => setSelectedRecipe(null)}>
                    <Recipe selectedRecipeId={selectedRecipe.id} />
                </Modal>
            )}
        </div>
    );
};

export default RecipeSearch;
