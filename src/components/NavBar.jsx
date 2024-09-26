import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './auth.jsx';
import './styles.css';

const NavBar = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log('Logged out successfully:', response);
      setUserRole(null); 
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="logo"></div>
        <ul className="navLinks">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/about">About</Link></li>
          {/* Conditionally render the Logout button only if userRole is not null */}
          {userRole && (
            <li>
              <button className="linkButton" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </nav>

      
    </>
  );
};

export default NavBar;
