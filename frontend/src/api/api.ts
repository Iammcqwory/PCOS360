import axios from 'axios';

const API_BASE = 'http://localhost:4000';

export const login = async (email: string) => {
  const response = await axios.post(`${API_BASE}/auth/login`, { email });
  return response.data;
};

export const submitOnboarding = async (payload: any) => {
  const response = await axios.post(`${API_BASE}/onboarding`, payload);
  return response.data;
};

export const fetchDashboard = async () => {
  const response = await axios.get(`${API_BASE}/dashboard`);
  return response.data;
};

export const askCoach = async (message: string) => {
  const response = await axios.post(`${API_BASE}/ai/coach`, { message });
  return response.data;
};
