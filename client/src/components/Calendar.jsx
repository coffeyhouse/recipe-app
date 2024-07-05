// src/components/Calendar.jsx
import React from 'react';
import Button from './ui/Button';
import { format, eachDayOfInterval, parseISO } from 'date-fns';

const Calendar = ({ mealPlan, mealPlanRecipes, recipes, onAddMeal, onModifyMeal }) => {
  const days = eachDayOfInterval({
    start: parseISO(mealPlan.StartDate),
    end: parseISO(mealPlan.EndDate),
  });

  const getMealForDay = (date, mealType) => {
    return mealPlanRecipes.find(
      (mpr) => mpr.Date === format(date, 'yyyy-MM-dd') && mpr.MealType === mealType
    );
  };

  const getRecipeName = (recipeId) => {
    const recipe = recipes.find(r => r.RecipeID === recipeId);
    return recipe ? recipe.RecipeName : 'Unknown Recipe';
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {days.map((day) => (
        <div key={day} className="border p-2">
          <h3 className="font-bold">{format(day, 'eee, MMM d')}</h3>
          {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => {
            const meal = getMealForDay(day, mealType);
            return (
              <div key={mealType} className="my-2">
                <h4 className="font-semibold">{mealType}</h4>
                {meal ? (
                  <div>
                    <div>{getRecipeName(meal.RecipeID)}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        outline
                        onClick={() => onModifyMeal(meal.MealPlanRecipeID)}
                      >
                        Modify
                      </Button>
                      <Button
                        size="sm"
                        variant="error"
                        outline
                        onClick={() => onModifyMeal(meal.MealPlanRecipeID, true)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    outline
                    onClick={() => onAddMeal(day, mealType)}
                  >
                    Add {mealType}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
