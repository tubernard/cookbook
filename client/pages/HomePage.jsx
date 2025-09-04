// filepath: client/pages/HomePage.jsx
import { Title, Text } from '@mantine/core';

const HomePage = () => {
  return (
    <>
      <Title order={1}>Welcome to Your Recipe Box</Title>
      <Text mt="md">
        Use the navigation to add a new recipe or view your existing collection.
      </Text>
    </>
  );
};

export default HomePage;
