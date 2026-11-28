import api from '../api/axiosConfig.js';

export function login(credentials) {
	return api.post('/auth/login', credentials).then((response) => response.data);
}

export function register(userData) {
	return api.post('/auth/register', userData).then((response) => response.data);
}