import axios from 'axios';
import { useState } from 'react';

const signIn = async (username: string, password: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables');
  }
  try {
    const response = await axios.post(
      `${apiUrl}/auth/login`,
      {
        name: username,
        password: password,
      },
      { withCredentials: true },
    );

    const access_token = response.headers['authorization'];
    const refresh_token = response.headers['x-refresh-token'];
    return { access_token, refresh_token, ...response.data };
  } catch (error) {
    throw error;
  }
};

const usePostSignIn = () => {
  const [error, setError] = useState<Error | null>(null);

  const handlePostSignIn = async (username: string, password: string) => {
    try {
      const data = await signIn(username, password);
      const { access_token, refresh_token } = data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.',
      );
      return false;
    }
  };

  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined in environment variables');
    }
    try {
      await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.',
      );
    }
  };
  return {
    handlePostSignIn,
    handleLogout,
    error,
  };
};

export { usePostSignIn };
