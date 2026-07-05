import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axiosConfig';
import Toast from 'react-native-toast-message';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      }
    } catch (e) {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await api.post('/auth/register', { username, email, password });
      Toast.show({ type: 'success', text1: 'Account created! Please log in.' });
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed';
      Toast.show({ type: 'error', text1: msg });
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const { access_token, refresh_token, user } = res.data;

      await AsyncStorage.setItem('accessToken', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      setUser(user);
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      Toast.show({ type: 'error', text1: msg });
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);