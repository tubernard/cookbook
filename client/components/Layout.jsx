import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, Link } from 'react-router-dom';
import { IconHome, IconPlus, IconList } from '@tabler/icons-react';

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Recipe Book
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Home"
          component={Link}
          to="/"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="View Recipes"
          component={Link}
          to="/recipes"
          leftSection={<IconList size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="Add Recipe"
          component={Link}
          to="/add"
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
