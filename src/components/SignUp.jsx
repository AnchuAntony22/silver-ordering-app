import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleSignup = async () => {
    setError(''); // Reset error message before new signup attempt
    setSuccessMessage(''); // Reset success message before new signup attempt

    try {
      const response = await fetch('https://localhost:7184/api/Account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          role: "User"
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log('Signup successful:', data);
        setSuccessMessage('User created successfully!'); // Set success message
        navigate('/'); // Navigate to home or another page
      } else {
        console.error('Signup error:', data);
        setError(data.message || 'An error occurred during signup.'); // Set error message
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error, please try again later.'); // Handle network error
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleSignup} className="login-button">Sign Up</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      </div>
    </div>
  );
};

export default SignUp;
