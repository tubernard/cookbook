import { useState, useEffect } from 'react';
import {
  Title,
  SimpleGrid,
  Loader,
  Text,
  Center,
  Stack,
  ThemeIcon,
  Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { deleteRecipe, getRecipes } from '../services/apiService';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconX,
  IconToolsKitchen2,
  IconPlus,
} from '@tabler/icons-react';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
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
    return (
      <Center style={{ height: '50vh' }}>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: '50vh' }}>
        <Text color="red">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <>
      <Title order={2} mb="xl" ta="center">
        All Recipes
      </Title>

      {recipes.length === 0 ? (
        <Center style={{ height: '50vh' }}>
          <Stack align="center" spacing="md">
            <ThemeIcon size="xl" radius="xl" variant="light">
              <IconToolsKitchen2 size={32} />
            </ThemeIcon>
            <Title order={3} ta="center">
              Your recipe box is empty
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Get started by adding your first recipe!
            </Text>
            <Button
              component={Link}
              to="/recipes/add"
              leftSection={<IconPlus size={14} />}
            >
              Add New Recipe
            </Button>
          </Stack>
        </Center>
      ) : (
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
      )}
    </>
  );
};

export default RecipeListPage;
