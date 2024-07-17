export const ingredient_categories = [
    {
        id: 1,
        name: "Bakery"
    },
    {
        id: 2,
        name: "Dairy"
    },
    {
        id: 3,
        name: "Vegetables"
    },
    {
        id: 4,
        name: "Meat"
    },
    {
        id: 5,
        name: "Fruits"
    }
];

export const ingredient_sub_categories = [
    {
        id: 1,
        category_id: 1,
        name: "Bread"
    },
    {
        id: 2,
        category_id: 2,
        name: "Cheese"
    },
    {
        id: 3,
        category_id: 3,
        name: "Leafy Greens"
    },
    {
        id: 4,
        category_id: 4,
        name: "Chicken"
    },
    {
        id: 5,
        category_id: 5,
        name: "Citrus"
    }
];

export const ingredients = [
    {
        id: 1,
        sub_category_id: 1,
        category_id: 1,
        name: "Loaf of bread",
        purchase_unit_id: 1,
        purchase_weight_volume: 500,
        purchase_weight_unit_id: 2
    },
    {
        id: 2,
        sub_category_id: 2,
        category_id: 2,
        name: "Cheddar cheese",
        purchase_unit_id: 2,
        purchase_weight_volume: 200,
        purchase_weight_unit_id: 2
    },
    {
        id: 3,
        sub_category_id: 3,
        category_id: 3,
        name: "Spinach",
        purchase_unit_id: 3,
        purchase_weight_volume: 100,
        purchase_weight_unit_id: 2
    },
    {
        id: 4,
        sub_category_id: 4,
        category_id: 4,
        name: "Chicken breast",
        purchase_unit_id: 2,
        purchase_weight_volume: 300,
        purchase_weight_unit_id: 2
    },
    {
        id: 5,
        sub_category_id: 5,
        category_id: 5,
        name: "Lemon",
        purchase_unit_id: 3,
        purchase_weight_volume: 100,
        purchase_weight_unit_id: 2
    },
    {
        id: 6,
        sub_category_id: 4, // Chicken
        category_id: 4, // Meat
        name: "Chicken breast",
        purchase_unit_id: 2,
        purchase_weight_volume: 300,
        purchase_weight_unit_id: 2
    },
    {
        id: 7,
        sub_category_id: 2, // Dairy
        category_id: 2, // Dairy
        name: "Buttermilk",
        purchase_unit_id: 3,
        purchase_weight_volume: 150,
        purchase_weight_unit_id: 1
    },
    {
        id: 8,
        sub_category_id: 3, // Vegetables
        category_id: 3, // Vegetables
        name: "Garlic granules",
        purchase_unit_id: 1,
        purchase_weight_volume: 5,
        purchase_weight_unit_id: 2
    },
    {
        id: 9,
        sub_category_id: 3, // Vegetables
        category_id: 3, // Vegetables
        name: "Ginger paste",
        purchase_unit_id: 1,
        purchase_weight_volume: 5,
        purchase_weight_unit_id: 2
    },
    {
        id: 10,
        sub_category_id: 3, // Vegetables
        category_id: 3, // Vegetables
        name: "Garlic paste",
        purchase_unit_id: 1,
        purchase_weight_volume: 5,
        purchase_weight_unit_id: 2
    },
    {
        id: 11,
        sub_category_id: 1, // Bakery
        category_id: 1, // Bakery
        name: "Plain flour",
        purchase_unit_id: 2,
        purchase_weight_volume: 60,
        purchase_weight_unit_id: 2
    },
    {
        id: 12,
        sub_category_id: 1, // Bakery
        category_id: 1, // Bakery
        name: "Cornflour",
        purchase_unit_id: 2,
        purchase_weight_volume: 60,
        purchase_weight_unit_id: 2
    },
    {
        id: 13,
        sub_category_id: 2, // Dairy
        category_id: 2, // Dairy
        name: "Butter",
        purchase_unit_id: 2,
        purchase_weight_volume: 80,
        purchase_weight_unit_id: 2
    },
    {
        id: 14,
        sub_category_id: 5, // Fruits
        category_id: 5, // Fruits
        name: "Honey",
        purchase_unit_id: 2,
        purchase_weight_volume: 100,
        purchase_weight_unit_id: 2
    },
    {
        id: 15,
        sub_category_id: 3, // Vegetables
        category_id: 3, // Vegetables
        name: "Soy sauce",
        purchase_unit_id: 1,
        purchase_weight_volume: 15,
        purchase_weight_unit_id: 1
    },
    {
        id: 16,
        sub_category_id: 3, // Vegetables
        category_id: 3, // Vegetables
        name: "Salt",
        purchase_unit_id: 1,
        purchase_weight_volume: 5,
        purchase_weight_unit_id: 2
    },
    {
        id: 17,
        sub_category_id: 3, // Vegetables
        category_id: 3, // Vegetables
        name: "Pepper",
        purchase_unit_id: 1,
        purchase_weight_volume: 5,
        purchase_weight_unit_id: 2
    },
    {
        id: 18,
        sub_category_id: 1, // Bakery
        category_id: 1, // Bakery
        name: "Rice",
        purchase_unit_id: 2,
        purchase_weight_volume: 480,
        purchase_weight_unit_id: 2
    }
];

export const units = [
    {
        id: 1,
        name: "Cup",
        abbreviation: "cup"
    },
    {
        id: 2,
        name: "Gram",
        abbreviation: "g"
    },
    {
        id: 3,
        name: "Piece",
        abbreviation: "pc"
    }
];

export const meal_plan_recipes = [
    // Existing meal plan recipes
    {
        id: 1,
        meal_plan_id: 2,
        recipe_id: 1,
        meal_type: "Breakfast",
        date: "2024-07-03",
        main_recipe_id: null // Main dish
    },
    {
        id: 2,
        meal_plan_id: 2,
        recipe_id: 2,
        meal_type: "Lunch",
        date: "2024-07-03",
        main_recipe_id: null // Main dish
    },
    {
        id: 3,
        meal_plan_id: 2,
        recipe_id: 3,
        meal_type: "Dinner",
        date: "2024-07-03",
        main_recipe_id: null // Main dish
    },
    {
        id: 4,
        meal_plan_id: 2,
        recipe_id: 4,
        meal_type: "Dinner",
        date: "2024-07-03",
        main_recipe_id: 3 // Side dish for Chicken Curry
    },
    // New meal plan recipes for the current week
    {
        id: 5,
        meal_plan_id: 1,
        recipe_id: 5,
        meal_type: "Breakfast",
        date: "2024-07-08",
        main_recipe_id: null // Main dish
    },
    {
        id: 6,
        meal_plan_id: 1,
        recipe_id: 6,
        meal_type: "Lunch",
        date: "2024-07-08",
        main_recipe_id: null // Main dish
    },
    {
        id: 7,
        meal_plan_id: 1,
        recipe_id: 7,
        meal_type: "Dinner",
        date: "2024-07-08",
        main_recipe_id: null // Main dish
    },
    {
        id: 8,
        meal_plan_id: 1,
        recipe_id: 8,
        meal_type: "Dinner",
        date: "2024-07-08",
        main_recipe_id: 7 // Side dish for Grilled Chicken
    },
    {
        id: 7,
        meal_plan_id: 1,
        recipe_id: 7,
        meal_type: "Dinner",
        date: "2024-07-09",
        main_recipe_id: null // Main dish
    },
    {
        id: 7,
        meal_plan_id: 1,
        recipe_id: 7,
        meal_type: "Dinner",
        date: "2024-07-10",
        main_recipe_id: null // Main dish
    },
    {
        id: 9,
        meal_plan_id: 1,
        recipe_id: 9,
        meal_type: "Dinner",
        date: "2024-07-11",
        main_recipe_id: null // Main dish
    }
];

export const meal_plans = [
    {
        id: 1,
        user_id: 1,
        plan_name: "Healthy Week",
        start_date: "2024-07-08",
        end_date: "2024-07-14"
    },
    {
        id: 2,
        user_id: 2,
        plan_name: "Test name",
        start_date: "2024-07-01",
        end_date: "2024-07-07"
    }
];

export const authors = [
    {
        id: 1,
        name: "Jamie Oliver",
        image_url: ""
    },
    {
        id: 2,
        name: "Gordon Ramsay",
        image_url: ""
    },
    {
        id: 3,
        name: "Bored of Lunch",
        image_url: "" // Assuming no image URL is provided
    }
];

export const recipe_books = [
    {
        id: 1,
        author_id: 1,
        book_name: "30 Minute Meals",
        image_url: ""
    },
    {
        id: 2,
        author_id: 2,
        book_name: "Gordon's Great Recipes",
        image_url: ""
    }
];

export const recipe_ingredient_sections = [
    {
        id: 1,
        recipe_id: 1,
        name: "Sauce section"
    },
    {
        id: 2,
        recipe_id: 1,
        name: "Main section"
    },
    {
        id: 3,
        recipe_id: 5,
        name: "Main section"
    },
    {
        id: 4,
        recipe_id: 6,
        name: "Main section"
    },
    {
        id: 5,
        recipe_id: 7,
        name: "Main section"
    },
    {
        id: 6,
        recipe_id: 9,
        name: "Main section"
    }
];

export const recipe_ingredients = [
    {
        id: 1,
        recipe_id: 1,
        ingredient_id: 1,
        section_id: 1,
        quantity: 200,
        unit_id: 2
    },
    {
        id: 2,
        recipe_id: 1,
        ingredient_id: 2,
        section_id: 2,
        quantity: 150,
        unit_id: 2
    },
    {
        id: 3,
        recipe_id: 5,
        ingredient_id: 3,
        section_id: 3,
        quantity: 100,
        unit_id: 2
    },
    {
        id: 4,
        recipe_id: 6,
        ingredient_id: 4,
        section_id: 4,
        quantity: 300,
        unit_id: 2
    },
    {
        id: 5,
        recipe_id: 7,
        ingredient_id: 5,
        section_id: 5,
        quantity: 2,
        unit_id: 3
    },
    {
        id: 6,
        recipe_id: 9,
        ingredient_id: 6,
        section_id: 6,
        quantity: 3,
        unit_id: 3
    },
    {
        id: 7,
        recipe_id: 9,
        ingredient_id: 7,
        section_id: 6,
        quantity: 100,
        unit_id: 1
    },
    {
        id: 8,
        recipe_id: 9,
        ingredient_id: 8,
        section_id: 6,
        quantity: 1,
        unit_id: 1
    },
    {
        id: 9,
        recipe_id: 9,
        ingredient_id: 9,
        section_id: 6,
        quantity: 1,
        unit_id: 1
    },
    {
        id: 10,
        recipe_id: 9,
        ingredient_id: 10,
        section_id: 6,
        quantity: 1,
        unit_id: 1
    },
    {
        id: 11,
        recipe_id: 9,
        ingredient_id: 11,
        section_id: 6,
        quantity: 60,
        unit_id: 2
    },
    {
        id: 12,
        recipe_id: 9,
        ingredient_id: 12,
        section_id: 6,
        quantity: 60,
        unit_id: 2
    },
    {
        id: 13,
        recipe_id: 9,
        ingredient_id: 13,
        section_id: 6,
        quantity: 80,
        unit_id: 2
    },
    {
        id: 14,
        recipe_id: 9,
        ingredient_id: 14,
        section_id: 6,
        quantity: 75,
        unit_id: 1
    },
    {
        id: 15,
        recipe_id: 9,
        ingredient_id: 15,
        section_id: 6,
        quantity: 15,
        unit_id: 1
    },
    {
        id: 16,
        recipe_id: 9,
        ingredient_id: 16,
        section_id: 6,
        quantity: 1,
        unit_id: 1
    },
    {
        id: 17,
        recipe_id: 9,
        ingredient_id: 17,
        section_id: 6,
        quantity: 1,
        unit_id: 1
    },
    {
        id: 18,
        recipe_id: 9,
        ingredient_id: 18,
        section_id: 6,
        quantity: 480,
        unit_id: 2
    }
];

export const recipe_reviews = [
    {
        id: 1,
        user_id: 2,
        recipe_id: 1,
        rating: 9,
        text: "Delicious and easy to make!"
    },
    {
        id: 2,
        user_id: 1,
        recipe_id: 2,
        rating: 8,
        text: "Great taste but a bit too spicy."
    }
];

export const recipe_steps = [
    {
        id: 1,
        recipe_id: 1,
        step_number: 1,
        text: "Preheat the oven to 180°C."
    },
    {
        id: 2,
        recipe_id: 1,
        step_number: 2,
        text: "Mix all ingredients."
    },
    {
        id: 3,
        recipe_id: 5,
        step_number: 1,
        text: "Wash and chop the spinach."
    },
    {
        id: 4,
        recipe_id: 5,
        step_number: 2,
        text: "Cook the spinach."
    },
    {
        id: 5,
        recipe_id: 9,
        step_number: 1,
        text: "Slice three chicken breasts and soak them in 150ml buttermilk, salt, and pepper. For best results, refrigerate the chicken for an hour to let it marinate."
    },
    {
        id: 6,
        recipe_id: 9,
        step_number: 2,
        text: "Then coat the chicken pieces in the flour and garlic granules."
    },
    {
        id: 7,
        recipe_id: 9,
        step_number: 3,
        text: "Cook in the Airfryer at 200°C (375°F) for 12 minutes, ensure you spray well and shake halfway so they cook evenly."
    },
    {
        id: 8,
        recipe_id: 9,
        step_number: 4,
        text: "To a pan on a medium heat melt the butter (I used Dromona) along with the honey, soy, garlic and ginger."
    },
    {
        id: 9,
        recipe_id: 9,
        step_number: 5,
        text: "Toss in the sauce until covered, serve with rice. Top with sesame seeds and enjoy."
    }
];

export const recipe_tags = [
    {
        id: 1,
        recipe_id: 1,
        tag_id: 1
    },
    {
        id: 2,
        recipe_id: 1,
        tag_id: 2
    }
];

export const recipes = [
    {
        id: 1,
        user_id: 1,
        name: "Fish pie",
        author_id: 1,
        book_id: 1,
        book_page_number: 123,
        recipe_url: null,
        prep_time: 10,
        cook_time: 50,
        difficulty: "Easy",
        main_meal: true,
        image_url: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1110455_10-bf7460d.jpg",
        servings: 4,
        cuisine: "IT"
    },
    {
        id: 2,
        user_id: 2,
        name: "Spaghetti Carbonara",
        author_id: 2,
        book_id: 2,
        book_page_number: 45,
        recipe_url: null,
        prep_time: 15,
        cook_time: 25,
        difficulty: "Medium",
        main_meal: true,
        image_url: "https://www.nigella.com/assets/uploads/recipes/public-thumbnail/spaghetticarbonara-5d80caea3573a.jpg",
        servings: 2,
        cuisine: "IT"
    },
    {
        id: 3,
        user_id: 1,
        name: "Chicken Curry",
        author_id: 1,
        book_id: 1,
        book_page_number: 67,
        recipe_url: null,
        prep_time: 20,
        cook_time: 40,
        difficulty: "Hard",
        main_meal: true,
        image_url: "https://www.kitchensanctuary.com/wp-content/uploads/2020/08/Easy-Chicken-Curry-square-FS-117.jpg",
        servings: 6,
        cuisine: "IN"
    },
    {
        id: 4,
        user_id: 1,
        name: "Naan Bread",
        author_id: 1,
        book_id: 1,
        book_page_number: 68,
        recipe_url: null,
        prep_time: 10,
        cook_time: 15,
        difficulty: "Easy",
        main_meal: false,
        image_url: "",
        servings: 4,
        cuisine: "IN"
    },
    // New recipes
    {
        id: 5,
        user_id: 1,
        name: "Spinach Omelette",
        author_id: 1,
        book_id: 1,
        book_page_number: 24,
        recipe_url: null,
        prep_time: 10,
        cook_time: 5,
        difficulty: "Easy",
        main_meal: true,
        image_url: "https://www.jocooks.com/wp-content/uploads/2013/06/spanish-omelette-1-20.jpg",
        servings: 1,
        cuisine: "FR"
    },
    {
        id: 6,
        user_id: 2,
        name: "Grilled Chicken Salad",
        author_id: 2,
        book_id: 2,
        book_page_number: 30,
        recipe_url: null,
        prep_time: 20,
        cook_time: 10,
        difficulty: "Medium",
        main_meal: true,
        image_url: "https://ifoodreal.com/wp-content/uploads/2021/06/fg-grilled-chicken-salad.jpg",
        servings: 2,
        cuisine: "US"
    },
    {
        id: 7,
        user_id: 1,
        name: "Lemon Chicken",
        author_id: 1,
        book_id: 1,
        book_page_number: 40,
        recipe_url: null,
        prep_time: 15,
        cook_time: 25,
        difficulty: "Easy",
        main_meal: true,
        image_url: "https://christieathome.com/wp-content/uploads/2022/03/Chinese-Lemon-Chicken-32.jpg",
        servings: 4,
        cuisine: "CN"
    },
    {
        id: 8,
        user_id: 1,
        name: "Side salad",
        author_id: 1,
        book_id: 1,
        book_page_number: 41,
        recipe_url: null,
        prep_time: 15,
        cook_time: 25,
        difficulty: "Medium",
        main_meal: false,
        image_url: "",
        servings: 4,
        cuisine: "CN"
    },
    {
        id: 9,
        user_id: 3, // Assuming it's created by a new user
        name: "Air Fryer Honey Butter Chicken",
        author_id: 3, // Assuming "Bored of Lunch" is a new author
        book_id: null, // No book, it's from a URL
        book_page_number: null,
        recipe_url: "https://boredoflunch.com/recipes/air-fryer-honey-butter-chicken/",
        prep_time: 60, // Including marinating time
        cook_time: 12,
        difficulty: "Simple",
        main_meal: true,
        image_url: "https://boredoflunch.com/uploads/2023/12/Airfried-Honey-Butter-Chicken.jpg",
        servings: 4,
        cuisine: "US" // Assuming it's American
    },
];

export const tags = [
    {
        id: 1,
        name: "Test tag"
    },
    {
        id: 2,
        name: "Vegetarian"
    },
    {
        id: 3,
        name: "Low Carb"
    },
    {
        id: 4,
        name: "High Protein"
    }
];

export const unit_conversions = [
    {
        from_unit_id: 1,
        to_unit_id: 2,
        conversion_factor: 23
    },
    {
        from_unit_id: 2,
        to_unit_id: 3,
        conversion_factor: 0.001
    }
];

export const users = [
    {
        id: 1,
        username: "Warren",
        password_hash: "jfdjsfdjsfdjsfdjsfd",
        email: "email@email.com"
    },
    {
        id: 2,
        username: "TestUser",
        password_hash: "hashvalue",
        email: "testuser@example.com"
    },
    {
        id: 3,
        username: "SampleUser",
        password_hash: "samplehash",
        email: "sampleuser@example.com"
    }
];
