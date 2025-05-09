import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      const { token, user } = res.data;
      
      // Store token and user data
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      
      const { token, user } = res.data;
      
      // Store token and user data
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (err) {
      console.error('Registration failed:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const addXP = (amount) => {
    if (!user) return;

    const newXP = (user.xp || 0) + amount;
    const newLevel = Math.floor(newXP / 500);

    const updatedUser = {
      ...user,
      xp: newXP,
      level: newLevel,
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateXp = async (newXp) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${user._id}/xp`, {
        xp: newXp,
      });
      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Failed to update XP:', err);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token,
        login, 
        register,
        logout, 
        addXP, 
        updateXp,
        loading,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
