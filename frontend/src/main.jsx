import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import MealPlan from "./routes/meal-plan";
import Home from "./routes/home";
import Recipe from "./routes/recipe";
import RecipeEditor from "./routes/recipe-editor";
import ToDo from "./routes/to-do";
import MealPlansList from "./routes/meal-plans-list";
import RecipeSearch from "./routes/recipe-search";
import RecipeIngredients from "./routes/recipe-ingredients";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "meal-plan/:mealPlanId",
        element: <MealPlan />,
      },
      {
        path: "meal-plans",
        element: <MealPlansList />,
      },
      {
        path: "recipe/:recipeId",
        element: <Recipe />,
      },
      {
        path: "recipe-search",
        element: <RecipeSearch />,
      },
      {
        path: "/editor",
        element: <RecipeEditor />
      },
      {
        path: "/editor/:recipeId",
        element: <RecipeEditor />
      },
      {
        path: "/ingredient-editor/:recipeId",
        element: <RecipeIngredients />
      },
      {
        path: "/to-do",
        element: <ToDo />
      },
    ],
  },  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);