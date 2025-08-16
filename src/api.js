import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (data) => {
  return await axios.post(`${API_BASE_URL}/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_BASE_URL}/login`, data);
};