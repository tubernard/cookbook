import RecipeForm from '../components/RecipeForm';
import { Title } from '@mantine/core';

const AddRecipePage = () => {
  return (
    <>
      <Title order={2} mb="xl" ta="center">
        Add a New Recipe
      </Title>
      <RecipeForm />
    </>
  );
};

export default AddRecipePage;
