import { createContext, useContext, useEffect, useState } from 'react';
import { login, signup } from '../services/apiService';
import { Center, Loader } from '@mantine/core';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (credentials) => {
    const response = await login(credentials);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    return response;
  };

  const logoutUser = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const signupUser = async (userData) => {
    const response = await signup(userData);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    return response;
  };

  const value = {
    user,
    isLoading,
    login: loginUser,
    signup: signupUser,
    logout: logoutUser,
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
