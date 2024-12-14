import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';  // Import LoginSignup component
// import Navbar from './Components/Navbar';              // Import Navbar component
import Home from './Components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);  // Check if token exists
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route: Redirect to /home if authenticated */}
          <Route path="/" element={!isAuthenticated ? <LoginSignup /> : <Navigate to="/home" />} />
          
          {/* Private Route: Only accessible if authenticated */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          
          {/* Login route */}
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
