import api from './api';
import API_ENDPOINTS from './API_ENDPOINTS';

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post(API_ENDPOINTS.login, {
      email,
      password
    })
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const register = async (name: string, email: string, password: string) => {
  try {
    const res = await api.post(API_ENDPOINTS.register, {
      name,
      email,
      password
    })
    return res.data;
  } catch (error) {
    throw error;
  }
}