import React from "react";
import Card from "../components/Card";

export default function ToDo() {
    return (
        <Card>
            <div className="prose">
                <h3>To do list</h3>
                <ul>
                    <li><s>Recipe editor</s></li>
                    <li>Add step and image upload to recipe editor</li>
                    <li>Ingredient editor inc. add ingredient modal</li>
                    <li>Meal plan list</li>
                    <li>Shopping list</li>
                    <li>Add meal plan modal for home screen inc. calendar</li>
                    <li>Add/edit meal modal on meal plan</li>
                    <li><s>Edit recipe using recipe editor, pre-filled details</s></li>
                    <li>Icons on upcoming and previous cards</li>
                </ul>
            </div>
        </Card>
    );
}