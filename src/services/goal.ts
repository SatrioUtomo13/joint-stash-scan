import api from './api';
import API_ENDPOINTS from './API_ENDPOINTS';

const token = localStorage.getItem("token");


export const createSavingsGoal = async (data: any) => {
const token = localStorage.getItem("token");
    try {
        const res = await api.post(API_ENDPOINTS.savingsgoal, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

export const getGoalMembers = async (goal_id: string) => {
  const url = `${API_ENDPOINTS.savingsgoal}${goal_id}/members`
  try {
    const res = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const getSavingGoalById = async (goal_id: string) => {
  const url = `${API_ENDPOINTS.savingsgoal}${goal_id}`
  try {
    const res = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateSavingGoal = async (goal_id: string, data: any) => {
  const url = `${API_ENDPOINTS.savingsgoal}${goal_id}`
  try {
    const res = await api.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const depostiSavingGoals = async (goal_id: string, amount: number) => {
  const token = localStorage.getItem("token")
  const url = `${API_ENDPOINTS.savingsgoal}${goal_id}/deposit`
  
  try {
    const res = await api.post(url, {amount}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error    
  }
}

export const deleteSavingGoal = async (goal_id: string) => {
  const url = `${API_ENDPOINTS.savingsgoal}${goal_id}`

  try {
    const res = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
