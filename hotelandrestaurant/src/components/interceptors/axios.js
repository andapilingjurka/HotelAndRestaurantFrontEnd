import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

import { getValidAccessToken, clearTokens } from './authService';

// Create a context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const location = useLocation(); // Use the location hook

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getValidAccessToken();
      if (token) {
        setAccessToken(token);
      } else {
        clearTokens();
      }
    };

    fetchAccessToken();
  }, [location]);

  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the accessToken
export const useAuth = () => useContext(AuthContext);
