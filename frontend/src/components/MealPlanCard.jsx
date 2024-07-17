import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { formatDate, getMealCounts, getTotalDays, getColor } from "../utils";
import { meal_plan_recipes, recipes } from "../dummy-data"; // Make sure to import these

const MealPlanCard = ({ mealPlan, title }) => {
    const counts = getMealCounts(mealPlan.id, meal_plan_recipes, recipes); // Pass these arrays to the function
    const totalDays = getTotalDays(mealPlan.start_date, mealPlan.end_date);

    return (
        <Link to={`/meal-plan/${mealPlan.id}`} className="w-full h-full">
            <Card className="text h-full">
                <div className="flex gap-2 flex-col h-full">
                    <div className="flex flex-col grow">
                        <div className="flex justify-between items-center">
                            {title && <span className="text-lg font-bold">{title}</span>}
                        </div>
                        <span className="text-xs">
                            {`${formatDate(mealPlan.start_date).dayName} ${formatDate(mealPlan.start_date).dayMonth} - ${formatDate(mealPlan.end_date).dayName} ${formatDate(mealPlan.end_date).dayMonth}`}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {["Breakfast", "Lunch", "Dinner"].map((mealType, index) => {
                            const mealKey = mealType.toLowerCase();
                            const percentage = (counts[mealKey] / totalDays) * 100;
                            const color = getColor(index);
                            return (
                                <div key={index} className="grid grid-cols-2 items-center">
                                    <span className="text-xs">{mealType}</span>
                                    <div className="flex h-[16px] w-full">
                                        <div className={`bg-${color} h-full rounded-l ${percentage === 100 ? 'rounded-r' : ''} flex items-center justify-end px-1`} style={{ width: `${percentage}%` }}>
                                            <span className="text-[10px] font-bold">
                                                {counts[mealKey]}
                                            </span>
                                        </div>
                                        <div className="bg-neutral h-full flex-grow rounded-r"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default MealPlanCard;
