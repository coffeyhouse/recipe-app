import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams, Link } from "react-router-dom"; // Import useParams and Link
import { recipes, authors, books } from "../dummy-data"; // Import recipes, authors, and books
import Card from "../components/Card";

export default function Recipe() {
    const { recipeId } = useParams(); // Get recipeId from the URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const foundRecipe = recipes.find(r => r.id === parseInt(recipeId));
        if (foundRecipe) {
            const author = authors.find(author => author.id === foundRecipe.selectedAuthor)?.label || "Unknown Author";
            const book = books.find(book => book.id === foundRecipe.selectedBook)?.label || "Unknown Book";

            setRecipe({
                ...foundRecipe,
                author,
                book,
                image: "https://picsum.photos/500/300",
                details: {
                    calories: 345,
                    weight: 250,
                    rating: 4.7,
                    time: foundRecipe.cookingTime,
                },
                tags: ["Breakfast", "Fast", "Easy"],
                ingredients: [
                    { name: "Eggs", quantity: "3 pc" },
                    { name: "Toast bread", quantity: "2 pc" },
                    { name: "Avocado", quantity: "1 pc" },
                    { name: "Tomato", quantity: "1/2 pc" },
                    { name: "Cheese", quantity: "70 g" },
                ],
            });
        }
    }, [recipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <div className="p-2">
                <div className="relative">
                    <img src={recipe.image} alt={recipe.recipeName} className="w-full h-64 object-cover rounded" />
                    <div className="absolute top-2 left-2 bg-white rounded-full p-1">
                        <FaHeart className="text-gray-500" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold mt-4">{recipe.recipeName}</h1>
                <p className="text-sm text-gray-500 mt-2">by {recipe.author}</p>
                <p className="text-sm text-gray-500">from the book {recipe.book}</p>
                <Link to={`/editor/${recipeId}`} className="btn btn-sm btn-accent mt-4">
                    Edit Recipe
                </Link>
                <div className="flex gap-2 mt-4">
                    {recipe.tags.map((tag, index) => (
                        <span key={index} className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
                <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
                <ul className="list-disc list-inside mt-2">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name} - {ingredient.quantity}
                        </li>
                    ))}
                </ul>
                <div className="mt-4">

                </div>
            </div>
        </Card>
    );
}
