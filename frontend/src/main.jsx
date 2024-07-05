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
        path: "recipe/:recipeId",
        element: <Recipe />,
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