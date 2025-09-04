import {
  ActionIcon,
  Box,
  Button,
  Group,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { recipeSchema } from '../../shared/schemas/recipeSchema.js';

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
const removeKey = ({ name, quantity }) => ({
  name,
  quantity,
});

const AddRecipeForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      ingredients: [{ name: '', quantity: '', key: randomId() }],
      instructions: '',
      prepMinutes: null,
      cookMinutes: null,
      numServings: null,
      // image: '',
    },

    validate: zod4Resolver(recipeSchema),
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
    setIsLoading(true);

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
        const errorData = await response.json();
        form.setErrors(errorData.errors);

        notifications.show({
          title: 'Please correct the errors',
          message: 'Your submission has validation errors.',
          color: 'yellow',
          icon: <IconX size="1.1rem" />,
        });
        return;
      }

      const newRecipe = await response.json();
      console.log('Recipe created:', newRecipe);
      form.reset();

      notifications.show({
        title: 'Success!',
        message: 'Your recipe has been saved.',
        color: 'teal',
        icon: <IconCheck size="1.1rem" />,
      });
    } catch (err) {
      console.error('Error:', err);

      notifications.show({
        title: 'An error occurred',
        message: 'Could not save the recipe. Please try again later.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
      });
    } finally {
      setIsLoading(false);
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
            {...form.getInputProps('prepMinutes')}
          />
          <NumberInput
            label="Cook Time (mins)"
            placeholder="30"
            min={0}
            {...form.getInputProps('cookMinutes')}
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

        <Button type="submit" mt="xl" fullWidth loading={isLoading}>
          Save Recipe
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipeForm;
