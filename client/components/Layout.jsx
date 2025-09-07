import {
  AppShell,
  Burger,
  Button,
  Group,
  NavLink,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { IconHome, IconPlus, IconList } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <UnstyledButton component={Link} to="/">
              <Text fw={700}>Recipe Box</Text>
            </UnstyledButton>
          </Group>
          <Button variant="default" onClick={handleLogout}>
            Log out
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Home"
          component={Link}
          to="/"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          onClick={toggle}
        />
        <NavLink
          label="View Recipes"
          component={Link}
          to="/recipes"
          leftSection={<IconList size="1rem" stroke={1.5} />}
          onClick={toggle}
        />
        <NavLink
          label="Add Recipe"
          component={Link}
          to="/recipes/add"
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
          onClick={toggle}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
