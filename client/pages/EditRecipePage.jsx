import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/apiService';
import RecipeForm from '../components/RecipeForm';
import { Center, Loader, Text, Title } from '@mantine/core';

const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text color="red">{error}</Text>
      </Center>
    );
  }

  return (
    <>
      <Title order={2} mb="xl" ta="center">
        Edit Recipe
      </Title>
      {recipe && <RecipeForm recipe={recipe} />}
    </>
  );
};

export default EditRecipePage;
