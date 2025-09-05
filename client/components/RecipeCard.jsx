import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Group,
  Image,
  List,
  Menu,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconCircleCheck,
  IconClock,
  IconDots,
  IconEdit,
  IconToolsKitchen2,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { applyCloudinaryTransformation } from '../utils/cloudinary';
import RecipeBoxLogo from './RecipeBoxLogo';
import { useModals } from '@mantine/modals';

const RecipeCard = ({ recipe, onDelete }) => {
  const modals = useModals();
  const hasImage = recipe.image && recipe.image.trim() !== '';

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete Recipe',
      centered: true,
      children: (
        <Text size="sm">
          {`Are you sure you want to delete the ${recipe.name} recipe? This
          action is permanent.`}
        </Text>
      ),
      labels: { confirm: 'Delete Recipe', cancel: "No, don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => onDelete(recipe._id),
    });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {hasImage ? (
          <Image
            src={applyCloudinaryTransformation(
              recipe.image,
              'recipe-card-thumb',
            )}
            height={180}
            alt={`Image of ${recipe.name}`}
          />
        ) : (
          <Center h={180} bg="gray.1">
            <RecipeBoxLogo style={{ height: 100, width: 100 }} />
          </Center>
        )}
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="lg" truncate>
          {recipe.name}
        </Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={14} />}
              component={Link}
              to={`/recipes/edit/${recipe._id}`}
            >
              Edit Recipe
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={openDeleteModal} // Call the modal function on click
            >
              Delete Recipe
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {(recipe.prepMinutes || recipe.cookMinutes || recipe.numServings) && (
        <Group mt="sm" mb="sm" gap="xs">
          {recipe.prepMinutes && (
            <Badge
              variant="light"
              color="blue"
              leftSection={<IconClock size={14} />}
            >
              Prep: {recipe.prepMinutes} min
            </Badge>
          )}
          {recipe.cookMinutes && (
            <Badge
              variant="light"
              color="grape"
              leftSection={<IconToolsKitchen2 size={14} />}
            >
              Cook: {recipe.cookMinutes} min
            </Badge>
          )}
          {recipe.numServings && (
            <Badge
              variant="light"
              color="orange"
              leftSection={<IconUsers size={14} />}
            >
              Serves {recipe.numServings}
            </Badge>
          )}
        </Group>
      )}

      <Text size="sm" c="dimmed" mt="sm">
        {recipe.instructions}
      </Text>

      <Text fw={500} mt="md">
        Ingredients
      </Text>
      <List
        spacing="xs"
        size="sm"
        center
        mt="xs"
        icon={
          <ThemeIcon color="teal" size={16} radius="xl">
            <IconCircleCheck size="0.8rem" />
          </ThemeIcon>
        }
      >
        {recipe.ingredients.map((ingredient) => (
          <List.Item key={ingredient._id}>
            {ingredient.quantity} {ingredient.name}
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default RecipeCard;
