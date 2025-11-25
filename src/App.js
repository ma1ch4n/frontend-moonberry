import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landingpage';
import Employee from './components/Employee'; 
import Supplier from './components/Supplier';
import Utensils from './components/Utensils';
import Ingredients from './components/Ingredients';
import Flavors from './components/Flavors';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    console.log('Checking auth, token exists:', !!token);
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    // Initial auth check
    checkAuth();

    // Listen for storage changes (when login sets token)
    const handleStorageChange = () => {
      console.log('Storage changed, rechecking auth...');
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check auth on page load
    window.addEventListener('load', checkAuth);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('load', checkAuth);
    };
  }, []);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  console.log('App rendered, isAuthenticated:', isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page should be accessible to everyone */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Login and Register should redirect to dashboard if already authenticated */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/employees" 
            element={isAuthenticated ? <Employee /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/suppliers" 
            element={isAuthenticated ? <Supplier /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/utensils" 
            element={isAuthenticated ? <Utensils /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/ingredients" 
            element={isAuthenticated ? <Ingredients /> : <Navigate to="/login" replace />} 
          />
          <Route
            path="/flavors"
            element={isAuthenticated ? <Flavors /> : <Navigate to="/login" replace />}
          />
          
          {/* Catch all route - redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;