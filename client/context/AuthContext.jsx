import { createContext, useContext, useEffect, useState } from 'react';
import { checkSession, login, logout, signup } from '../services/apiService';
import { Center, Loader } from '@mantine/core';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const currentUser = await checkSession();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch {
        console.error('No active session found');
      } finally {
        setIsLoading(false);
      }
    };
    verifySession();
  }, []);

  const handleLogin = async (credentials) => {
    const loggedInUser = await login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const handleSignup = async (credentials) => {
    const newUser = await signup(credentials);
    setUser(newUser);
    return newUser;
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
