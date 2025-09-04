import { useState, useEffect } from 'react';
import { Title, SimpleGrid, Loader, Text } from '@mantine/core';
import RecipeCard from '../components/RecipeCard';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  return (
    <>
      <Title order={2} mb="xl">
        All Recipes
      </Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 'md', sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default RecipeListPage;
