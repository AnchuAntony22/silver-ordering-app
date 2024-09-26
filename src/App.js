import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import About from './components/About';
import AdminPage from './components/AdminPage';
import Footer from './components/Footer'; 

import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <div className="App">
        <NavBar userRole={userRole} setUserRole={setUserRole}/>
        <div className="content"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUserRole={setUserRole} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/admin" 
              element={userRole === 'Admin' ? <AdminPage userRole={userRole} /> : <Navigate to="/home" />} 
            />
          </Routes>
          
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
