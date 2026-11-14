import { apiRequest } from './apiClient.js';

export async function loginUser(credentials, { signal } = {}) {
	return apiRequest('/auth/login', { method: 'POST', body: credentials, signal });
}

export async function registerUser(userData, { signal } = {}) {
	return apiRequest('/auth/register', { method: 'POST', body: userData, signal });
}
