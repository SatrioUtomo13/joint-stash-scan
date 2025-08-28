import api from './api';
import API_ENDPOINTS from './API_ENDPOINTS';

export const createSavingsGoal = async (data: any) => {
    try {
        const res = await api.post(API_ENDPOINTS.savingsgoal, data);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getSavingsGoals = async () => {
const token = localStorage.getItem("token");
  try {
    const res = await api.get(API_ENDPOINTS.savingsgoal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}
