import React, { useState } from "react";
import MealCard from "../components/MealCard";

const days = [
    {
        date: "2024-07-01",
        breakfast: null,
        breakfastSide: null,
        breakfastSource: null,
        lunch: "Ham sandwich",
        lunchSide: "Chips",
        lunchSource: { author: "John Doe", book: "Healthy Lunches" },
        dinner: "Spaghetti bolognese",
        dinnerSide: "Garlic bread",
        dinnerSource: { author: "Jane Smith", book: "Classic Italian Dishes" }
    },
    {
        date: "2024-07-02",
        breakfast: "Pancakes",
        breakfastSide: "Syrup",
        breakfastSource: { author: "Anna Johnson", book: "Breakfast Favorites" },
        lunch: null,
        lunchSide: null,
        lunchSource: null,
        dinner: null,
        dinnerSide: null,
        dinnerSource: null
    },
    {
        date: "2024-07-03",
        breakfast: "Omelette",
        breakfastSide: "Toast",
        breakfastSource: { author: "Anna Johnson", book: "Breakfast Favorites" },
        lunch: null,
        lunchSide: null,
        lunchSource: null,
        dinner: "Beef tacos",
        dinnerSide: "Salsa",
        dinnerSource: { author: "Carlos Gomez", book: "Mexican Cuisine" }
    },
    {
        date: "2024-07-04",
        breakfast: "Smoothie",
        breakfastSide: "Fruit salad",
        breakfastSource: { author: "Sarah Lee", book: "Healthy Breakfasts" },
        lunch: "Vegetable stir-fry",
        lunchSide: "Spring rolls",
        lunchSource: { author: "Emily Wang", book: "Asian Cuisine" },
        dinner: null,
        dinnerSide: null,
        dinnerSource: null
    },
    {
        date: "2024-07-05",
        breakfast: "Yogurt and granola",
        breakfastSide: "Berries",
        breakfastSource: { author: "Sarah Lee", book: "Healthy Breakfasts" },
        lunch: "Turkey wrap",
        lunchSide: "Salad",
        lunchSource: { author: "John Doe", book: "Healthy Lunches" },
        dinner: "Pizza",
        dinnerSide: "Garlic bread",
        dinnerSource: { author: "Luigi Rossi", book: "Italian Classics" }
    },
    {
        date: "2024-07-06",
        breakfast: "French toast",
        breakfastSide: "Maple syrup",
        breakfastSource: { author: "Anna Johnson", book: "Breakfast Favorites" },
        lunch: "Caesar salad",
        lunchSide: "Breadsticks",
        lunchSource: { author: "Mary Brown", book: "Salad Recipes" },
        dinner: "Lasagna",
        dinnerSide: "Caesar salad",
        dinnerSource: { author: "Luigi Rossi", book: "Italian Classics" }
    },
    {
        date: "2024-07-07",
        breakfast: "Bagel with cream cheese",
        breakfastSide: "Orange juice",
        breakfastSource: { author: "Anna Johnson", book: "Breakfast Favorites" },
        lunch: "Quinoa salad",
        lunchSide: "Fruit",
        lunchSource: { author: "Mary Brown", book: "Salad Recipes" },
        dinner: "Steak and potatoes",
        dinnerSide: "Green beans",
        dinnerSource: { author: "Gordon Ramsey", book: "Ultimate Cooking" }
    }
];
const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 3);
};

const MealPlan = () => {
    const [selectedDate, setSelectedDate] = useState(days[0].date);
    const selectedDay = days.find(day => day.date === selectedDate);  

    return (
        <>
            <h1 className="font-bold">Meal plan details</h1>
            <div className="w-full flex gap-3 my-4 justify-between">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center "
                        onClick={() => setSelectedDate(day.date)}
                    >
                        <div className="text-[10px] uppercase font-medium text-black/70">{getDayOfWeek(day.date)}</div>
                        <div className={`flex items-center justify-center text-sm font-medium cursor-pointer w-8 h-8 rounded border ${day.date === selectedDate ? 'bg-neutral text-neutral-content' : 'bg-base-100'}`}>
                            <div>{day.date.slice(-2)}</div>
                        </div>
                        <div className="flex justify-center gap-1 mt-1">
                            {day.breakfast && <span className="w-1 h-1 bg-accent rounded-full"></span>}
                            {day.lunch && <span className="w-1 h-1 bg-secondary rounded-full"></span>}
                            {day.dinner && <span className="w-1 h-1 bg-primary rounded-full"></span>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                <MealCard mealType="Breakfast" meal={selectedDay.breakfast} side={selectedDay.breakfastSide} source={selectedDay.breakfastSource} color="accent" />
                <MealCard mealType="Lunch" meal={selectedDay.lunch} side={selectedDay.lunchSide} source={selectedDay.lunchSource} color="secondary" />
                <MealCard mealType="Dinner" meal={selectedDay.dinner} side={selectedDay.dinnerSide} source={selectedDay.dinnerSource} color="primary" />
            </div>
        </>
    );
}

export default MealPlan;
