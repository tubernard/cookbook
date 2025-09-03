import {
  TextInput,
  Textarea,
  Text,
  Button,
  Box,
  Group,
  ActionIcon,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';

const TextWithAstrisk = ({ children }) => (
  <Group gap="xs" mt="md">
    <Text size="sm" fw={500}>
      {children}
    </Text>
    <Text c="red" span ml={-6}>
      *
    </Text>
  </Group>
);
const removeKey = ({ name, value }) => ({
  name,
  value,
});

const validateString = (input, errorMsg) =>
  input.trim().length > 0 ? null : errorMsg;

const AddRecipe = () => {
  const form = useForm({
    initialValues: {
      name: '',
      ingredients: [{ name: '', quantity: '', key: randomId() }],
      instructions: '',
      prepTime: '',
      cookTime: '',
      numServings: '',
      image: '',
    },

    validate: {
      name: (value) => validateString(value, 'Recipe name is required'),
      ingredients: {
        name: (value) => validateString(value, 'Ingredient name is required'),
        quantity: (value) => validateString(value, 'Quantity is required'),
      },
      instructions: (value) => validateString(value, 'Instructions required'),
    },
  });

  const ingredientFields = form.values.ingredients.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="e.g., Flour"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ingredients.${index}.name`)}
      />
      <TextInput
        placeholder="e.g., 2 cups"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ingredients.${index}.quantity`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem('ingredients', index)}
        disabled={index < 1}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const handleSubmit = async (values) => {
    const submissionData = {
      ...values,
      ingredients: values.ingredients.map(removeKey),
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const newRecipe = await response.json();
      console.log('Recipe created:', newRecipe);
      form.reset();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box maw={500} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Recipe Name"
          placeholder="Spaghetti Bolognese"
          {...form.getInputProps('name')}
        />

        <Group grow mt="md">
          <NumberInput
            label="Prep Time (mins)"
            placeholder="15"
            min={0}
            {...form.getInputProps('prepTime')}
          />
          <NumberInput
            label="Cook Time (mins)"
            placeholder="30"
            min={0}
            {...form.getInputProps('cookTime')}
          />
          <NumberInput
            label="Servings"
            placeholder="4"
            min={0}
            {...form.getInputProps('numServings')}
          />
        </Group>

        {/* <TextInput
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          mt="md"
          {...form.getInputProps('image')}
        /> */}

        <Textarea
          withAsterisk
          label="Instructions"
          placeholder="1. Boil water..."
          mt="md"
          {...form.getInputProps('instructions')}
        />

        <TextWithAstrisk>Ingredients</TextWithAstrisk>
        {ingredientFields}

        <Group justify="center" mt="md">
          <Button
            variant="default"
            onClick={() =>
              form.insertListItem('ingredients', {
                name: '',
                quantity: '',
                key: randomId(),
              })
            }
          >
            Add Ingredient
          </Button>
        </Group>

        <Button type="submit" mt="xl" fullWidth>
          Save Recipe
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipe;
