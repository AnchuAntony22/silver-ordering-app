import React from 'react';
import './styles.css';
const NavBar = () => {
  return (
    <nav className='nav'>
      <div className='logo'></div>
      <ul className='navLinks'>
        <li><a href='#'>Login</a></li>
        <li><a href='#'>Sign Up</a></li>
        <li><a href='#'>About</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;