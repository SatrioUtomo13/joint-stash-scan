import api from './api';
import API_ENDPOINTS from './API_ENDPOINTS';

export const savingGoalsDropdown = async () => {
const token = localStorage.getItem("token");

  try {
    const res = await api.get(API_ENDPOINTS.dropdownSavingGoal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}