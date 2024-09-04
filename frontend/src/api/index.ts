import axios from 'axios';
import { ROOT } from './const';
import { setToken, removeToken } from './storage';
export const getUsers = async () => {
  try {
    const response = await axios.get(ROOT);
    return response.data;
  } catch (err) {
    return new Error(err);
  }
};

export const loginUser = async (data : { login: string; password: string }) => {
  try {
    const response = await axios.post(`${ROOT}/login`, data, { withCredentials: true });
    if (response.data.status === 200) {
      setToken(response.data.userId)
    }
    return response.data;
  } catch (err) {
    return new Error(err);
  }
};

export const registerUser = async (data : { login: string; password: string }) => {
  try {
    const response = await axios.post(`${ROOT}/registration`, data);
    return response.data;
  } catch (err) {
    return new Error(err);
  }
};

export const getWords = async () => {
  try {
    const response = await axios.get(`${ROOT}/words`, { withCredentials: true });
    return response.data;
  } catch (err) {
    return new Error(err);
  }
}

export const destroySession = async () => {
  try {
    const response = await axios.post(`${ROOT}/logout`, {}, { withCredentials: true });
    removeToken();
    return response.data;
  } catch (err) {
    return new Error(err);
  }
};