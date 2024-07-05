import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false); // Indicate that the auth status has been checked
  }, []);

  const login = async (username, password) => {
    const response = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Username: username, Password: password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert('Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner while checking auth status
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
