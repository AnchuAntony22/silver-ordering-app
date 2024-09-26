import React, { useState } from 'react';
import { login } from './auth.jsx'; 
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Optional: Create a separate CSS file for additional styles

const Login = ({ setUserRole }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log('Logged in successfully:', response);
      if (response.role) {
        setUserRole(response.role); // Set the role here
        // Redirect based on role
        if (response.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/mainpage'); 
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;

