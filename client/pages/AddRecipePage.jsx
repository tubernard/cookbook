import { Title } from '@mantine/core';
import RecipeForm from '../components/RecipeForm';

const AddRecipePage = () => {
  return (
    <>
      <Title order={2}>Add a New Recipe</Title>
      <RecipeForm />
    </>
  );
};

export default AddRecipePage;
