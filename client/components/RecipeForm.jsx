import {
  ActionIcon,
  Box,
  Button,
  FileInput,
  Group,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { recipeSchema } from '../../shared/schemas/recipeSchema.js';
import {
  createRecipe,
  updateRecipe,
  uploadImage,
} from '../services/apiService.js';
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

const RecipeForm = ({ recipe }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!recipe;

  const form = useForm({
    initialValues: {
      name: recipe?.name || '',
      ingredients: recipe?.ingredients.map((item) => ({
        ...item,
        key: randomId(),
      })) || [{ name: '', quantity: '', key: randomId() }],
      instructions: recipe?.instructions || '',
      prepMinutes: recipe?.prepMinutes || '',
      cookMinutes: recipe?.cookMinutes || '',
      numServings: recipe?.numServings || '',
      image: recipe?.image || null,
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
        disabled={form.values.ingredients.length === 1}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      let imageUrl = recipe?.image || '';

      if (values.image && typeof values.image !== 'string') {
        imageUrl = await uploadImage(values.image);
      }

      const submissionData = {
        ...values,
        image: imageUrl,
      };

      if (isEditMode) {
        await updateRecipe(recipe._id, submissionData);
      } else {
        await createRecipe(submissionData);
      }

      form.reset();

      notifications.show({
        title: 'Success!',
        message: `Your recipe has been ${isEditMode ? 'updated' : 'saved'}.`,
        color: 'teal',
        icon: <IconCheck size="1.1rem" />,
      });
    } catch (err) {
      console.error('Error:', err);

      notifications.show({
        title: 'An error occurred',
        message: err.message || 'Could not save the recipe. Please try again.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maw={700} mx="auto">
      <Paper p="xl" radius="md">
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

          <FileInput
            label="Recipe Image"
            placeholder={
              typeof form.values.image === 'string' && form.values.image
                ? 'Change image'
                : 'Upload an image'
            }
            mt="md"
            leftSection={<IconUpload size={14} />}
            accept="image/png,image/jpeg"
            {...form.getInputProps('image')}
          />

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
                  key: `new-${Date.now()}`,
                })
              }
            >
              Add Ingredient
            </Button>
          </Group>

          <Button type="submit" mt="xl" fullWidth loading={isLoading}>
            {isEditMode ? 'Update Recipe' : 'Save Recipe'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RecipeForm;
