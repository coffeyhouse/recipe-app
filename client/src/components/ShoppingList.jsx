// src/components/ShoppingList.jsx

import React from 'react';
import { useData } from '../context/DataContext';
import Table from './ui/Table';

function ShoppingList({ mealPlanId }) {
    const { getShoppingList } = useData();
    const shoppingList = getShoppingList(mealPlanId);

    const headers = ['Ingredient Name', 'Quantity', 'Unit'];

    const data = shoppingList.map((ingredient) => ({
        id: ingredient.IngredientID,
        cells: [
            ingredient.IngredientName,
            ingredient.Quantity,
            ingredient.unit ? ingredient.unit.UnitName : 'Unknown'
        ],
    }));

    return (
        <div className="overflow-x-auto">
            <Table headers={headers} data={data} />
        </div>
    );
}

export default ShoppingList;
