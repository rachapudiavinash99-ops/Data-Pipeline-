import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const getPipelines = () => api.get('/pipelines');
export const getDatasets = () => api.get('/datasets');
