import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { recipes, authors, recipe_books, recipe_ingredients, recipe_steps, ingredients, units } from "../dummy-data";
import Card from "../components/Card";

export default function Recipe({ selectedRecipeId }) {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const id = recipeId || selectedRecipeId;
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
    }, [recipeId, selectedRecipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const RecipeContent = () => (
        <div className="p-2">
            {recipe.image_url && (
                <div className="relative">
                    <img src={recipe.image_url} alt={recipe.name} className="w-full h-64 object-cover rounded-xl" />
                </div>
            )}
            <h1 className="text-2xl font-bold mt-4">{recipe.name}</h1>
            <p className="text-xs text-black/60 mb-1">Recipe by <span className="font-bold">{recipe.author}</span></p>
            {recipe.book && <p className="text-xs text-black/60 mb-1"><span className="font-bold">{recipe.book}</span> - page {recipe.book_page_number}</p>}
            <Link to={`/editor/${recipeId || selectedRecipeId}`} className="btn btn-sm btn-accent mt-4">
                Edit Recipe
            </Link>
            {recipe.tags && (
                <div className="flex gap-2 mt-4">
                    {recipe.tags.map((tag, index) => (
                        <span key={index} className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            {recipe.ingredients && (
                <>
                    <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
                    <ul className="list-disc list-inside mt-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name} - {ingredient.quantity}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {recipe.steps && (
                <>
                    <h2 className="text-xl font-semibold mt-4">Steps</h2>
                    <ol className="list-decimal list-inside mt-2">
                        {recipe.steps.map((step, index) => (
                            <li key={index}>
                                {step.text}
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </div>
    );

    return selectedRecipeId ? <RecipeContent /> : <Card><RecipeContent /></Card>;
}
