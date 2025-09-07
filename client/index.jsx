import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipeListPage from './pages/RecipeListPage';
import SignUpPage from './pages/SignUpPage';
import { theme } from './theme';

import './styles.css';

const router = createBrowserRouter([
  { path: 'signup', element: <SignUpPage /> },
  { path: 'login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'recipes',
        element: <RecipeListPage />,
      },
      {
        path: 'recipes/add',
        element: <AddRecipePage />,
      },
      {
        path: 'recipes/edit/:id',
        element: <EditRecipePage />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
);
