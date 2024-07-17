import React from "react";
import Card from "../components/Card";

export default function ToDo() {
    return (
        <Card>
            <div className="prose p-2">
                <h3>MVP</h3>
                <ul>
                    <li><s>Recipe editor</s></li>
                    <li><s>Add step and image upload to recipe editor</s></li>
                    <li><s>Meal plan list</s></li>
                    <li><s>Add meal plan modal for home screen inc. calendar</s></li>
                    <li><s>Add/edit meal modal on meal plan</s></li>
                    <li><s>Edit recipe using recipe editor, pre-filled details</s></li>
                    <li>Recipe search page - filters, search bar and preview pop-up.</li>
                    <li>Style recipe page</li>
                    <li>Ingredient editor inc. add ingredient modal</li>
                    <li>Shopping list</li>
                </ul>
                <h3>Future</h3>
                <ul>
                    <li>Freeze meal plan</li>
                    <li>Don't allow changes to historical meal plans</li>
                    <li>Suggested sides based on history</li>
                    <li>Recipe URL ingestion, mapping ingredients to table for confirmation.</li>
                    <li>Photo of recipe book using above tech.</li>
                </ul>
            </div>
        </Card>
    );
}