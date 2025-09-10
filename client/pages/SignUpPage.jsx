import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Container,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: { username: '', password: '' },
    validate: {
      username: (value) =>
        value.length < 3 ? 'Username must have at least 3 letters' : null,
      password: (value) =>
        value.length < 6 ? 'Password must have at least 6 letters' : null,
    },
  });

  const handleSubmit = async (values) => {
    setError(null);
    setIsLoading(true);
    try {
      await signup(values);
      navigate('/recipes'); // Redirect to recipes list on successful signup
    } catch (err) {
      setError(err.response?.data?.message ?? err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an Account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account? <Link to="/login">Sign in</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Choose a username"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Choose a password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
