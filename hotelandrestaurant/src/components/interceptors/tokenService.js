// useAuthRedirect.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNameIdentifier,getUserRole } from './authService';  // Updated import

export const useAuthRedirect = () => {
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // or your auth logic
    if (!token) {
      history('/login');
    }
  }, [history]);
};


export const useGetRole = () => {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userRole = getUserRole(token);
        setRole(userRole);
      }
      
    }, [navigate]);
  
    return role;
  };


  export const useAuthRedirectByRoleAdmin = () => {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userRole = getUserRole(token);
        setRole(userRole);
        if (userRole !== 'admin') {
          navigate('/');
        }
      
      } else {
        navigate('/');
      }
    }, [navigate]);
  
    return role;
  };
