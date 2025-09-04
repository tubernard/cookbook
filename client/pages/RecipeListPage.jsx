// filepath: client/pages/RecipeListPage.jsx
import { useState, useEffect } from 'react';
import { Title, List, ThemeIcon } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <>
      <Title order={2}>All Recipes</Title>
      <List
        spacing="xs"
        size="sm"
        center
        mt="md"
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconChefHat size="1rem" />
          </ThemeIcon>
        }
      >
        {recipes.map((recipe) => (
          <List.Item key={recipe._id}>{recipe.name}</List.Item>
        ))}
      </List>
    </>
  );
};

export default RecipeListPage;
