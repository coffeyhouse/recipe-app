// src/components/AddMealPlanModal.jsx

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import TextInput from './ui/TextInput';

function AddMealPlanModal() {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { createMealPlan } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mealPlan = {
      PlanName: planName,
      StartDate: startDate,
      EndDate: endDate,
      UserID: 1, // Adjust as needed
    };

    try {
      await createMealPlan(mealPlan);
      document.getElementById('add_meal_plan_modal').close();
    } catch (error) {
      alert('Failed to add meal plan');
    }
  };

  return (
    <Modal id="add_meal_plan_modal" title="Add Meal Plan">
      <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
        <TextInput
          label="Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          required
        />
        <TextInput
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <TextInput
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <Button>Add Meal Plan</Button>
      </form>
    </Modal>
  );
}

export default AddMealPlanModal;
