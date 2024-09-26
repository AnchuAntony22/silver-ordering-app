import axios from 'axios';

export const login = async (username, password) => {
  try {
    // Log the request payload for debugging
    console.log('Logging in with:', { username, password });

    const response = await axios.post(
      'https://localhost:7184/api/Account/login',
      { UserName: username, Password: password },
      { withCredentials: true } // Ensure credentials (cookies) are sent
    );

    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    // Log the complete error for better insight
    if (error.response) {
      console.error('Login failed with status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Login failed:', error.message);
    }
    throw error; // Re-throw error after logging it
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('https://localhost:7184/api/Account/logout', {}, { withCredentials: true });
    console.log('Logout response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};
