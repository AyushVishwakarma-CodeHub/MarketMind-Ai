import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Upload a CSV file
 */
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Get all customers
 */
export const getCustomers = async (page = 1, limit = 50, segment = '') => {
  const params = { page, limit };
  if (segment) params.segment = segment;
  const response = await api.get('/customers', { params });
  return response.data;
};

/**
 * Get segment summary
 */
export const getSegments = async (summary = true) => {
  const response = await api.get('/segments', {
    params: { summary: summary.toString() },
  });
  return response.data;
};

/**
 * Get campaign recommendations
 */
export const getCampaigns = async (businessType = '') => {
  const params = {};
  if (businessType) params.businessType = businessType;
  const response = await api.get('/campaigns', { params });
  return response.data;
};

export default api;
