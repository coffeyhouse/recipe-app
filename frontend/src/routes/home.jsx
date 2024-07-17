import React, { useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import MealCard from "../components/MealCard";
import { FaChevronRight, FaPlus} from "react-icons/fa";
import { recipes, authors, recipe_books, meal_plans, meal_plan_recipes } from "../dummy-data";
import MealPlanCard from "../components/MealPlanCard";
import AddMealPlanModal from "../components/AddMealPlanModal";
import { getHighlightedDates, getDisabledDates, getCurrentWeekPlan, getUpcomingPlansCount, getPreviousPlansCount } from "../utils";

export default function Home() {
    const currentWeekPlan = getCurrentWeekPlan(meal_plans);
    const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [planName, setPlanName] = useState("");
    const highlightedDates = getHighlightedDates(meal_plans);
    const disabledDates = getDisabledDates(meal_plans);
    const upcomingPlansCount = getUpcomingPlansCount(meal_plans);
    const previousPlansCount = getPreviousPlansCount(meal_plans);

    const favoriteMeals = recipes.filter(recipe => recipe.main_meal).map(recipe => {
        const author = authors.find(author => author.id === recipe.author_id)?.name || "Unknown Author";
        const book = recipe_books.find(book => book.id === recipe.book_id)?.book_name || "Unknown Book";
        return {
            id: recipe.id,
            title: recipe.name,
            image_url: recipe.image_url,
            source: { author, book },
            badge: recipe.cuisine,
        };
    });

    const getColor = (index) => {
        const colors = ["accent", "secondary", "primary"];
        return colors[index % colors.length];
    };

    const openMealPlanModal = () => {
        setIsMealPlanModalOpen(true);
    };

    const closeMealPlanModal = () => {
        setIsMealPlanModalOpen(false);
    };

    const handleAddMealPlan = () => {
        console.log("Meal Plan Name:", planName);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        closeMealPlanModal();
    };

    return (
        <>
            <div className="flex flex-col gap-4">               
                <p className="font-bold flex flex-col text-sm">
                    Meal plans <span className={`h-[3px] w-8 bg-accent mt-[2px] rounded-full`}></span>
                </p>
                <div className="grid grid-cols-9 gap-4">
                    <div className="col-span-5 flex flex-col">
                        {currentWeekPlan ? (
                            <MealPlanCard
                                mealPlan={currentWeekPlan}
                                meal_plan_recipes={meal_plan_recipes}
                                recipes={recipes}
                                title="This week"
                            />
                        ) : (
                            <Card className="text h-full p-2">
                                <div className="flex flex-col gap-2 h-full w-full justify-between">
                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-[8px] uppercase text-black/60 mb-1"><span className="font-bold">Nothing here...</span></span>
                                        <span className="font-medium">You don't have a meal plan yet.</span>
                                    </div>
                                    <button className="btn btn-accent flex items-center font-bold" onClick={openMealPlanModal}>
                                        Add plan <FaPlus />
                                    </button>
                                </div>
                            </Card>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 col-span-4">
                        <Link to="/meal-plans">
                            <Card className="flex-grow">
                                <p className="text-lg font-bold">{upcomingPlansCount}</p>
                                <p className="text-xs font-medium text-base-content/60">Upcoming</p>
                            </Card>
                        </Link>
                        <Link to="/meal-plans">
                            <Card className="flex-grow">
                                <p className="text-lg font-bold">{previousPlansCount}</p>
                                <p className="text-xs font-medium text-base-content/60">Previous</p>
                            </Card>
                        </Link>
                    </div>
                </div>
                <p className="font-bold flex flex-col text-sm mt-6">
                    Favourite meals <span className={`h-[3px] w-8 bg-secondary mt-[2px] rounded-full`}></span>
                </p>
                {favoriteMeals.map((meal, index) => (
                    <Link to={`/recipe/${meal.id}`} key={index} className="w-full">
                        <MealCard
                            key={index}
                            image_url={meal.image_url}
                            meal={meal.title}
                            color={getColor(index)}
                            source={meal.source}
                            icon={<FaChevronRight />}
                        />
                    </Link>
                ))}
            
            </div>
            {isMealPlanModalOpen && (
                <AddMealPlanModal
                    isOpen={isMealPlanModalOpen}
                    onClose={closeMealPlanModal}
                    onSave={handleAddMealPlan}
                    highlightedDates={highlightedDates}
                    disabledDates={disabledDates}
                />
            )}
        </>
    );
}
