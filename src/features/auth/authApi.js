import api from '../../services/api';

export const registerUser = (data) => api.post('/register', data);

export const loginUser = (data) => api.post('/login', data);

export const getCurrentUser = () => api.get('/users/me');
