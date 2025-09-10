import { Title, Text, Button, Container, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <Title
        order={1}
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          background: theme.other.gradient,
          marginBottom: theme.spacing.md,
        }}
      >
        Make it from scratch 🤌
      </Title>
      <Text size="lg" c="dimmed" maw={600} mx="auto">
        All your favorite recipes, organized in one place. Easily add, edit, and
        find the meals you love to make.
      </Text>
      <Button component={Link} to="/recipes" size="lg" mt="xl">
        View My Recipes
      </Button>
    </Container>
  );
};

export default HomePage;
