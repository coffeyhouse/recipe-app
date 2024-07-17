import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealCard from "../components/MealCard";
import { meal_plans, meal_plan_recipes, recipes, authors, recipe_books } from "../dummy-data";
import Modal from "../components/Modal";
import Input from "../components/Input"; // Assuming you have an Input component
import Select from "../components/Select";

const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 3);
};

const findRecipeById = (id) => recipes.find(recipe => recipe.id === id);

const findAuthorById = (id) => authors.find(author => author.id === id)?.name || "Unknown Author";

const findBookById = (id) => recipe_books.find(book => book.id === id)?.book_name || "Unknown Book";

const getMealDetails = (mealId) => {
    if (!mealId) return { meal: null, author: null, book: null };
    const recipe = findRecipeById(mealId);
    return {
        meal: recipe.name,
        author: findAuthorById(recipe.author_id),
        book: findBookById(recipe.book_id),
        image_url: recipe.image_url,
    };
};

const groupMealsByDate = (meals) => {
    const mealsByDate = {};
    meals.forEach(meal => {
        if (!mealsByDate[meal.date]) {
            mealsByDate[meal.date] = { breakfast: [], lunch: [], dinner: [] };
        }
        const mealType = meal.meal_type.toLowerCase();
        mealsByDate[meal.date][mealType].push(meal);
    });
    return mealsByDate;
};

const generateDateRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
};

const MealPlan = () => {
    const { mealPlanId } = useParams();
    const [selectedDate, setSelectedDate] = useState("");
    const [mealsByDate, setMealsByDate] = useState({});
    const [dateRange, setDateRange] = useState([]);
    const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
    const [isEditMealModalOpen, setIsEditMealModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mealTypeForModal, setMealTypeForModal] = useState("");

    useEffect(() => {
        const plan = meal_plans.find(plan => plan.id === parseInt(mealPlanId));
        if (plan) {
            setSelectedDate(plan.start_date);
            setDateRange(generateDateRange(plan.start_date, plan.end_date));
            const planMeals = meal_plan_recipes.filter(meal => meal.meal_plan_id === plan.id);
            setMealsByDate(groupMealsByDate(planMeals));
        }
    }, [mealPlanId]);

    const openAddMealModal = (mealType) => {
        setMealTypeForModal(mealType);
        setIsAddMealModalOpen(true);
    };

    const closeAddMealModal = () => {
        setIsAddMealModalOpen(false);
    };

    const openEditMealModal = (meal) => {
        setSelectedMeal(meal);
        setIsEditMealModalOpen(true);
    };

    const closeEditMealModal = () => {
        setIsEditMealModalOpen(false);
    };

    const handleSelectChange = (event) => {
        setSelectedMeal({ ...selectedMeal, recipe_id: parseInt(event.target.value) });
    };

    const renderMealCards = (meals, mealType) => {
        const mainMeals = meals.filter(meal => !meal.main_recipe_id); // Filter out side dishes

        if (!mainMeals.length) {
            return (
                <MealCard
                    key={`${mealType}-null`}
                    mealType={mealType}
                    meal={null}
                    side={null}
                    source={{}}
                    color={mealType === "Breakfast" ? "accent" : mealType === "Lunch" ? "secondary" : "primary"}
                    onAddMeal={() => openAddMealModal(mealType)}
                />
            );
        }

        return mainMeals.map((meal, index) => {
            const mealDetails = getMealDetails(meal.recipe_id);
            const sideDetails = meals
                .filter(m => m.main_recipe_id === meal.recipe_id)
                .map(side => getMealDetails(side.recipe_id).meal)
                .join(", ");
            return (
                <MealCard
                    key={index}
                    mealType={mealType}
                    meal={mealDetails.meal}
                    image_url={mealDetails.image_url}
                    side={sideDetails}
                    source={{
                        author: mealDetails.author,
                        book: mealDetails.book
                    }}
                    color={mealType === "Breakfast" ? "accent" : mealType === "Lunch" ? "secondary" : "primary"}
                    onEditMeal={() => openEditMealModal(meal)}
                />
            );
        });
    };

    return (
        <>
            <div className="w-full flex gap-3 mb-4 justify-between">
                {dateRange.map((date, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center"
                        onClick={() => setSelectedDate(date)}
                    >
                        <div className="text-[10px] uppercase font-medium text-black/70">{getDayOfWeek(date)}</div>
                        <div className={`flex items-center justify-center text-sm font-medium cursor-pointer w-8 h-8 rounded border ${date === selectedDate ? 'bg-neutral text-neutral-content' : 'bg-base-100'}`}>
                            <div>{date.slice(-2)}</div>
                        </div>
                        <div className="flex justify-center gap-1 mt-1">
                            {mealsByDate[date]?.breakfast.length > 0 && <span className="w-1 h-1 bg-accent rounded-full"></span>}
                            {mealsByDate[date]?.lunch.length > 0 && <span className="w-1 h-1 bg-secondary rounded-full"></span>}
                            {mealsByDate[date]?.dinner.length > 0 && <span className="w-1 h-1 bg-primary rounded-full"></span>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {renderMealCards(mealsByDate[selectedDate]?.breakfast || [], "Breakfast")}
                {renderMealCards(mealsByDate[selectedDate]?.lunch || [], "Lunch")}
                {renderMealCards(mealsByDate[selectedDate]?.dinner || [], "Dinner")}
            </div>

            {isAddMealModalOpen && (
                <Modal title="Add Meal" onClose={closeAddMealModal}>
                    <div className="flex flex-col gap-4">
                        <Input label="Meal name" />
                        {/* Add other input fields as needed */}
                        <button className="btn btn-primary">Add Meal</button>
                    </div>
                </Modal>
            )}

            {isEditMealModalOpen && (
                <Modal title="Edit Meal" onClose={closeEditMealModal}>
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Meal name"
                            options={
                                recipes
                                    .filter(recipe => recipe.main_meal)
                                    .map(recipe => ({ id: recipe.id, label: recipe.name }))
                            }
                            value={selectedMeal?.recipe_id}
                            onChange={handleSelectChange}
                        />
                        <button className="btn btn-primary">Save Changes</button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default MealPlan;
