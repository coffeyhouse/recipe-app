
# Recipe App Client

This is the client-side code for the Recipe App, built using React and Vite. The application provides a user interface for managing recipes, ingredients, meal plans, and more.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and management
- Management of recipes, ingredients, meal plans, and more
- Integration with a backend API
- Responsive design using Tailwind CSS

## Requirements
- Node.js 14+
- npm 6+

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/recipe-app-client.git
   cd recipe-app-client
   ```

2. Install the required packages:
   ```sh
   npm install
   ```

## Configuration
Configuration settings are located in various configuration files like `.eslintrc.cjs`, `tailwind.config.js`, `vite.config.js`, and `postcss.config.js`.

### Example: `vite.config.js`
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

## Usage
1. Run the application:
   ```sh
   npm run dev
   ```

2. The application will be available at `http://127.0.0.1:3000`.

## Directory Structure
```
client
├── public
│   └── vite.svg
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── AddAuthorModal.jsx
│   │   ├── AddCategoryModal.jsx
│   │   ├── AddIngredientModal.jsx
│   │   ├── AddMealPlanModal.jsx
│   │   ├── AddMealPlanRecipeModal.jsx
│   │   ├── AddRecipeBookModal.jsx
│   │   ├── AddRecipeIngredientModal.jsx
│   │   ├── AddRecipeModal.jsx
│   │   ├── AddSubCategoryModal.jsx
│   │   ├── AuthorTable.jsx
│   │   ├── Calendar.jsx
│   │   ├── CategoryTable.jsx
│   │   ├── IngredientTable.jsx
│   │   ├── MealPlanRecipeTable.jsx
│   │   ├── MealPlanTable.jsx
│   │   ├── NavBar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── RecipeBookTable.jsx
│   │   ├── RecipeTable.jsx
│   │   ├── ShoppingList.jsx
│   │   ├── ShoppingListModal.jsx
│   │   ├── SideBar.jsx
│   │   ├── SubCategoryTable.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   ├── DataContext.jsx
│   ├── pages
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ManageAuthors.jsx
│   │   ├── ManageCategories.jsx
│   │   ├── ManageIngredients.jsx
│   │   ├── ManageMealPlans.jsx
│   │   ├── ManageRecipeBooks.jsx
│   │   ├── ManageRecipes.jsx
│   │   ├── ManageSubCategories.jsx
│   │   ├── MealPlanDetails.jsx
│   │   ├── Register.jsx
│   ├── routes.jsx
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── supabaseClient.js
├── .eslintrc.cjs
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md
├── index.html
```

## Available Scripts
- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run serve`: Serves the production build
- `npm run lint`: Runs ESLint

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License
This project is licensed under the MIT License.
