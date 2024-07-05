export const authors = [
    { id: 1, label: "Jamie Oliver" },
    { id: 2, label: "Pinch of Nom" },
    { id: 3, label: "Bored of Lunch" },
    { id: 4, label: "Good Food" },
    { id: 5, label: "Gino D'Acampo" },
];

export const books = [
    { id: 1, label: "5 Ingredients", authorId: 1 },
    { id: 2, label: "Ministry of Food", authorId: 1 },
    { id: 3, label: "Quick & Easy", authorId: 2 },
    { id: 4, label: "Everyday Light", authorId: 2 },
    { id: 5, label: "The Healthy Air Fryer Book", authorId: 3 },
    { id: 6, label: "Healthy Slow Cooker: Even Easier", authorId: 3 },
    { id: 7, label: "Ultimate Slow Cooker Recipes", authorId: 4 },
    { id: 8, label: "Gino's Italian Escape", authorId: 5 },
    { id: 9, label: "Gino's Italy", authorId: 5 },
];

export const recipes = [
    {
        id: 1,
        recipeName: "Penne carbonara",
        selectedType: "main",
        servings: 4,
        selectedAuthor: 1,
        selectedBook: 1,
        pageNumber: 234,
        recipeUrl: "",
        cookingTime: 23,
        selectedCountry: "IT"
    },
    {
        id: 2,
        recipeName: "Chicken Curry",
        selectedType: "main",
        servings: 4,
        selectedAuthor: 2,
        selectedBook: 3,
        pageNumber: 78,
        recipeUrl: "",
        cookingTime: 30,
        selectedCountry: "IN"
    },
    {
        id: 3,
        recipeName: "Vegetable Stir Fry",
        selectedType: "main",
        servings: 3,
        selectedAuthor: 3,
        selectedBook: 5,
        pageNumber: 112,
        recipeUrl: "",
        cookingTime: 20,
        selectedCountry: "CN"
    },
    {
        id: 4,
        recipeName: "Beef Stew",
        selectedType: "main",
        servings: 5,
        selectedAuthor: 4,
        selectedBook: 7,
        pageNumber: 90,
        recipeUrl: "",
        cookingTime: 120,
        selectedCountry: "GB"
    },
    {
        id: 5,
        recipeName: "Tiramisu",
        selectedType: "dessert",
        servings: 6,
        selectedAuthor: 5,
        selectedBook: 9,
        pageNumber: 45,
        recipeUrl: "",
        cookingTime: 45,
        selectedCountry: "IT"
    },
    {
        id: 6,
        recipeName: "Fish Tacos",
        selectedType: "main",
        servings: 4,
        selectedAuthor: 1,
        selectedBook: 2,
        pageNumber: 180,
        recipeUrl: "",
        cookingTime: 25,
        selectedCountry: "MX"
    }
];