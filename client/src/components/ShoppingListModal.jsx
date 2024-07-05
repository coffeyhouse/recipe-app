// src/components/ShoppingListModal.jsx

import React from 'react';
import Modal from './ui/Modal';

function ShoppingListModal({ shoppingList }) {
    return (
        <Modal id="shopping_list_modal" title="Generated Shopping List">
            {shoppingList ? (
                <ul className="list-disc ml-4">
                    {shoppingList.map((item, index) => (
                        <li key={index}>{item.Quantity} {item.UnitName} of {item.IngredientName}</li>
                    ))}
                </ul>
            ) : (
                <p>No items in the shopping list.</p>
            )}
        </Modal>
    );
}

export default ShoppingListModal;
