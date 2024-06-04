import axios from 'axios';
import { decodeToken } from '../LoginRegister/jwtUtils';
import { useNavigate } from 'react-router-dom';

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

};

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const refreshToken = async () => {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) {
    console.error('No refresh token available.');
    return null;
  }

  try {
    const response = await axios.post('https://localhost:7264/api/Users/RefreshToken', null, {
      params: {
        refreshToken: refreshTokenValue
      }
    });

    console.log("Refresh successful:", response.data);
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error.response ? error.response.data : error.message);
    clearTokens(); // Clear tokens if refresh fails
    return null;
  }
};


const tokenExpired = (token) => {
  const decoded = decodeToken(token);
  return decoded.exp < Date.now() / 1000;
};  
//let accessToken = getAccessToken();
//const isExpired = tokenExpired(accessToken);
//console.log("osht kry babab"+isExpired);

const getValidAccessToken = async () => {
  let accessToken = getAccessToken();
  console.log("Ardi");
  if (!accessToken || tokenExpired(accessToken)) {
    accessToken = await refreshToken();
    console.log("asadasdasd"+ accessToken);

    if (!accessToken) {
      clearTokens();
      console.log("ARIIIIIIIIIIIIII");
    }
  }
  return accessToken;
};

export const getNameIdentifier = (token) => {
  const decoded = decodeToken(token);
  if (decoded) {
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
  return null;
};

export const getUserRole = (token) => {
  const decoded = decodeToken(token);
  if (decoded) {
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
  return null;
};

export { setTokens, getValidAccessToken, clearTokens };
