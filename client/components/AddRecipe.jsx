import { TextInput, Textarea, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

const validateString = (input, errorMsg) =>
  input.trim().length > 0 ? null : errorMsg;

const AddRecipe = () => {
  const form = useForm({
    initialValues: {
      name: '',
      ingredients: '',
      instructions: '',
    },

    validate: {
      name: (value) => validateString(value, 'Recipe name is required'),
      ingredients: (value) => validateString(value, 'Ingredients are required'),
      instructions: (value) => validateString(value, 'Instructions required'),
    },
  });

  const handleSubmit = async (values) => {
    const ingredientsArr = values.ingredients
      .split(',')
      .map((item) => item.trim());

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          instructions: values.instructions,
          ingredients: ingredientsArr,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const newRecipe = await response.json();
      console.log('Recipe created:', newRecipe);
      form.reset();
    } catch (err) {
      console.error('Error:', err);
      // Add error handler
      // form.setErrors({ root: 'An unexpected error occurred.' });
    }
  };

  return (
    <Box maw={340} mx="auto">
      {/* The onSubmit handler is provided by the useForm hook */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Recipe Name"
          placeholder="Spaghetti Bolognese"
          // getInputProps connects the input to the form state and validation
          {...form.getInputProps('name')}
        />

        <TextInput
          withAsterisk
          label="Ingredients (comma-separated)"
          placeholder="Pasta, Ground Beef, Tomato Sauce"
          mt="md"
          {...form.getInputProps('ingredients')}
        />

        <Textarea
          withAsterisk
          label="Instructions"
          placeholder="1. Boil water..."
          mt="md"
          {...form.getInputProps('instructions')}
        />

        <Button type="submit" mt="md">
          Add Recipe
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipe;
