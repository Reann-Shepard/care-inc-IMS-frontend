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

    const { access_token, refresh_token } = response.data;
    console.log('SignIn successful. Tokens received:', {
      access_token,
      refresh_token,
    });

    return { access_token, refresh_token, ...response.data };
  } catch (error) {
    console.log('Error during signIn:', error);
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

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      console.log('Access token and refresh token saved to localStorage');

      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.',
      );
      console.log('Error during handlePostSignIn:', err);
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
      delete axios.defaults.headers.common['Authorization'];
      console.log(
        'Logged out successfully and tokens removed from localStorage',
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.',
      );
      console.log('Error during handleLogout:', err);
    }
  };
  return {
    handlePostSignIn,
    handleLogout,
    error,
  };
};

export { usePostSignIn };
