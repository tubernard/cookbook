import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useEffect, useState } from 'react';
import AddRecipe from './components/AddRecipe';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <MantineProvider>
      <div>
        <h1>Recipe Book</h1>
        <AddRecipe />
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>{recipe.name}</li>
          ))}
        </ul>
      </div>
    </MantineProvider>
  );
};

export default App;
