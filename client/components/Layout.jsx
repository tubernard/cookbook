import {
  AppShell,
  Burger,
  Group,
  Button,
  NavLink,
  Title,
  Container, // Already imported, just confirming
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconHome, IconToolsKitchen2, IconPlus } from '@tabler/icons-react';

const navLinks = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/recipes', label: 'All Recipes', icon: IconToolsKitchen2 },
  { href: '/recipes/add', label: 'Add Recipe', icon: IconPlus },
];

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const desktopLinks = navLinks.map((link) => (
    <Button
      key={link.label}
      component={Link}
      to={link.href}
      variant={location.pathname === link.href ? 'light' : 'subtle'}
      color="gray"
    >
      {link.label}
    </Button>
  ));

  const mobileLinks = navLinks.map((link) => (
    <NavLink
      key={link.label}
      href={link.href}
      label={link.label}
      component={Link}
      to={link.href}
      active={location.pathname === link.href}
      leftSection={<link.icon size="1rem" />}
      onClick={toggle}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
      padding="md"
      bg="transparent"
    >
      <AppShell.Header
        bg="rgba(255, 255, 255, 0.6)"
        withBorder={false}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Title
                order={3}
                component={Link}
                to="/"
                style={{ textDecoration: 'none' }}
              >
                Recipe Box
              </Title>
              <Group gap="xs" visibleFrom="sm" ml="xl">
                {desktopLinks}
              </Group>
            </Group>
            <Group>
              {user ? (
                <Button variant="default" onClick={handleLogout}>
                  Log out
                </Button>
              ) : (
                <>
                  <Button
                    variant="default"
                    component={Link}
                    to="/login"
                    visibleFrom="sm"
                  >
                    Log In
                  </Button>
                  <Button component={Link} to="/signup">
                    Sign Up
                  </Button>
                </>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        bg="rgba(255, 255, 255, 0.9)"
        withBorder={false}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {mobileLinks}
      </AppShell.Navbar>

      <AppShell.Main bg="transparent">
        <Container size="lg" p={0}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
