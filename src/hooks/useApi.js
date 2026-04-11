import { useAuth } from '../context/AuthContext';

export function useApi() {
  const { token, logout } = useAuth();

  const apiCall = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Add authorization token if it exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // If unauthorized, logout and redirect to signin
      if (response.status === 401) {
        logout();
        window.location.href = '/signin';
        return null;
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  return { apiCall, token };
}
