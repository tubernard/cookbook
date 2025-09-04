import { Title } from '@mantine/core';
import AddRecipeForm from '../components/AddRecipeForm';

const AddRecipePage = () => {
  return (
    <>
      <Title order={2}>Add a New Recipe</Title>
      <AddRecipeForm />
    </>
  );
};

export default AddRecipePage;
