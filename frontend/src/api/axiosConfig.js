import axios from 'axios';

const api = axios.create({
	baseURL:
		import.meta.env.VITE_API_URL ||
		import.meta.env.REACT_APP_API_URL ||
		'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token =
			window.localStorage.getItem('token') ||
			window.localStorage.getItem('accessToken');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 && typeof window !== 'undefined') {
			window.localStorage.removeItem('token');
			window.localStorage.removeItem('accessToken');
			window.dispatchEvent(new CustomEvent('auth:unauthorized'));
		}

		return Promise.reject(error);
	},
);

export default api;
