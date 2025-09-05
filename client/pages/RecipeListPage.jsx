import { useState, useEffect } from 'react';
import { Title, SimpleGrid, Loader, Text } from '@mantine/core';
import RecipeCard from '../components/RecipeCard';
import { deleteRecipe } from '../services/apiService';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

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

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      // Remove the deleted recipe from the local state to update the UI
      setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== id));
      notifications.show({
        title: 'Success!',
        message: 'The recipe has been deleted.',
        color: 'teal',
        icon: <IconCheck size="1.1rem" />,
      });
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete the recipe.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
      });
    }
  };

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
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default RecipeListPage;
