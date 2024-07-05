import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AddMealPlanModal from '../components/AddMealPlanModal';
import { format, isWithinInterval, parseISO, startOfWeek, endOfWeek, isFuture, isPast } from 'date-fns';
import { Link } from 'react-router-dom';

const Home = () => {
  const { mealPlans } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categorizeMealPlans = (mealPlans) => {
    const now = new Date();
    const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const currentWeekPlans = mealPlans.filter(plan =>
      isWithinInterval(parseISO(plan.StartDate), { start: currentWeekStart, end: currentWeekEnd }) ||
      isWithinInterval(parseISO(plan.EndDate), { start: currentWeekStart, end: currentWeekEnd })
    );

    const upcomingPlans = mealPlans.filter(plan =>
      isFuture(parseISO(plan.StartDate)) && !currentWeekPlans.includes(plan)
    );

    const previousPlans = mealPlans.filter(plan =>
      isPast(parseISO(plan.EndDate)) && !currentWeekPlans.includes(plan)
    );

    return { currentWeekPlans, upcomingPlans, previousPlans };
  };

  const { currentWeekPlans, upcomingPlans, previousPlans } = categorizeMealPlans(mealPlans);

  const renderMealPlanCard = (plan) => (
    <Link to={`/meal-plan/${plan.MealPlanID}`} key={plan.MealPlanID}>
      <Card title={plan.PlanName} count={1}>
        <p>Start: {format(parseISO(plan.StartDate), 'yyyy-MM-dd')}</p>
        <p>End: {format(parseISO(plan.EndDate), 'yyyy-MM-dd')}</p>
      </Card>
    </Link>
  );

  const openModal = () => {
    setIsModalOpen(true);
    document.getElementById('add_meal_plan_modal').showModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Current Week</h1>
      {currentWeekPlans.length > 0 ? (
        <div className="flex flex-wrap gap-4 mb-8">
          {currentWeekPlans.map(renderMealPlanCard)}
        </div>
      ) : (
        <div className="mb-8">
          <p>No current meal plans for this week.</p>
          <Button onClick={openModal}>Add Meal Plan</Button>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Upcoming Meal Plans</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {upcomingPlans.map(renderMealPlanCard)}
      </div>

      <h2 className="text-xl font-bold mb-4">Previous Meal Plans</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {previousPlans.map(renderMealPlanCard)}
      </div>

      {isModalOpen && <AddMealPlanModal />}
    </div>
  );
};

export default Home;
