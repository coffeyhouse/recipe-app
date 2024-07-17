export const getCurrentDate = () => {
    return new Date().setHours(0, 0, 0, 0); // Current date without time part
};

export const getMealPlansByCategory = (plans) => {
    const currentDate = getCurrentDate();
    const thisWeekPlans = [];
    const upcomingPlans = [];
    const previousPlans = [];

    plans.forEach(plan => {
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

export const getHighlightedDates = (meal_plans) => {
    const colors = ["bg-base-200 rounded"];
    return meal_plans.reduce((acc, plan, index) => {
        const startDate = new Date(plan.start_date);
        const endDate = new Date(plan.end_date);
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            acc.push({ date: new Date(currentDate), color: colors[index % colors.length] });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return acc;
    }, []);
};

export const getDisabledDates = (meal_plans) => {
    return meal_plans.reduce((acc, plan) => {
        const startDate = new Date(plan.start_date);
        const endDate = new Date(plan.end_date);
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            acc.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return acc;
    }, []);
};

export const getCurrentWeekPlan = (meal_plans) => {
    const currentDate = new Date();
    return meal_plans.find(plan => {
        const startDate = new Date(plan.start_date);
        const endDate = new Date(plan.end_date);
        return currentDate >= startDate && currentDate <= endDate;
    });
};

export const getMealCounts = (mealPlanId, meal_plan_recipes, recipes) => {
    const planMeals = meal_plan_recipes.filter(meal => meal.meal_plan_id === mealPlanId);
    const counts = { breakfast: 0, lunch: 0, dinner: 0 };
    planMeals.forEach(meal => {
        const recipe = recipes.find(r => r.id === meal.recipe_id);
        if (recipe.main_meal) {
            const mealType = meal.meal_type.toLowerCase();
            counts[mealType]++;
        }
    });
    return counts;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
        dayName: date.toLocaleDateString('en-GB', { weekday: 'short' }),
        dayMonth: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    };
};

export const getTotalDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
};

export const getColor = (index) => {
    const colors = ["accent", "secondary", "primary"];
    return colors[index % colors.length];
};

export const getUpcomingPlansCount = (meal_plans) => {
    const currentDate = new Date();
    return meal_plans.filter(plan => new Date(plan.start_date) > currentDate).length;
};

export const getPreviousPlansCount = (meal_plans) => {
    const currentDate = new Date();
    return meal_plans.filter(plan => new Date(plan.end_date) < currentDate).length;
};
