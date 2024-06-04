import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../interceptors/authService';  // Ensure path is correct

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearTokens();  // Clears the tokens from localStorage or any other storage used
        navigate('/login');  // Redirects user to login page after logout
    };

    return (
        <Button variant="outline-danger" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
