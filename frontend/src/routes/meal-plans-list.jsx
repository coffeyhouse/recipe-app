import React, { useState } from "react";
import MealPlanCard from "../components/MealPlanCard";
import { meal_plans } from "../dummy-data";
import Card from "../components/Card";
import { FaPlus } from "react-icons/fa";
import AddMealPlanModal from "../components/AddMealPlanModal";
import { getHighlightedDates, getDisabledDates } from "../utils";

const getCurrentDate = () => {
    return new Date().setHours(0, 0, 0, 0); // Current date without time part
};

const getMealPlansByCategory = (plans) => {
    const currentDate = getCurrentDate();
    const thisWeekPlans = [];
    const upcomingPlans = [];
    const previousPlans = [];

    plans.forEach(plan => {
        console.log(plan)
        const startDate = new Date(plan.start_date).setHours(0, 0, 0, 0);
        const endDate = new Date(plan.end_date).setHours(0, 0, 0, 0);

        if (currentDate >= startDate && currentDate <= endDate) {
            thisWeekPlans.push(plan);
        } else if (currentDate < startDate) {
            upcomingPlans.push(plan);
        } else if (currentDate > endDate) {
            previousPlans.push(plan);
        }
    });

    return { thisWeekPlans, upcomingPlans, previousPlans };
};

export default function MealPlansList() {
    const { thisWeekPlans, upcomingPlans, previousPlans } = getMealPlansByCategory(meal_plans);
    const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);

    const highlightedDates = getHighlightedDates(meal_plans);
    const disabledDates = getDisabledDates(meal_plans);

    const openMealPlanModal = () => {
        setIsMealPlanModalOpen(true);
    };

    const closeMealPlanModal = () => {
        setIsMealPlanModalOpen(false);
    };

    const handleSaveMealPlan = (planName, startDate, endDate) => {
        console.log("Meal Plan Name:", planName);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p className="font-bold flex flex-col text-sm">
                    This week <span className={`h-[3px] w-8 bg-accent mt-[2px] rounded-full`}></span>
                </p>
                <div className="flex flex-col gap-4">
                    {thisWeekPlans.length > 0 ? (
                        thisWeekPlans.map(plan => (
                            <MealPlanCard key={plan.id} mealPlan={plan} title={plan.plan_name} />
                        ))
                    )  : (
                        <Card>
                            <div className="flex flex-col gap-4 h-full w-full justify-between">
                                <div className="flex flex-col gap-1 w-full">
                                    <span className="font-medium">There's no plan for this week.</span>
                                </div>
                                <button className="btn btn-sm btn-accent flex items-center font-bold" onClick={openMealPlanModal}>
                                    Add plan <FaPlus />
                                </button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-bold flex flex-col text-sm mt-4">
                    Upcoming <span className={`h-[3px] w-8 bg-secondary mt-[2px] rounded-full`}></span>
                </p>
                <div className="flex flex-col gap-4">
                    {upcomingPlans.length > 0 ? (
                        upcomingPlans.map(plan => (
                            <MealPlanCard key={plan.id} mealPlan={plan} title={plan.plan_name} />
                        ))
                    ) : (
                        <Card>
                            <div className="flex flex-col gap-4 h-full w-full justify-between">
                                <div className="flex flex-col gap-1 w-full">
                                    <span className="font-medium">There's no future plans created yet.</span>
                                </div>
                                <button className="btn btn-sm btn-secondary flex items-center font-bold" onClick={openMealPlanModal}>
                                    Add plan <FaPlus />
                                </button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
            <p className="font-bold flex flex-col text-sm mt-4">
                    Previous weeks <span className={`h-[3px] w-8 bg-primary mt-[2px] rounded-full`}></span>
                </p>
                <div className="flex flex-col gap-4">
                    {previousPlans.length > 0 ? (
                        previousPlans.map(plan => (
                            <MealPlanCard key={plan.id} mealPlan={plan} title={plan.plan_name} />
                        ))
                    ) : (
                        <p>No previous meal plans.</p>
                    )}
                </div>
            </div>
            {isMealPlanModalOpen && (
                <AddMealPlanModal
                    isOpen={isMealPlanModalOpen}
                    onClose={closeMealPlanModal}
                    onSave={handleSaveMealPlan}
                    highlightedDates={highlightedDates}
                    disabledDates={disabledDates}
                />
            )}
        </div>
    );
}
