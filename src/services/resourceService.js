import { apiRequest } from './apiClient.js';

function encodeId(id) {
	return encodeURIComponent(String(id));
}

function buildQueryString(query) {
	const params = new URLSearchParams();

	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			params.set(key, String(value));
		}
	});

	const queryString = params.toString();
	return queryString ? `?${queryString}` : '';
}

export function createResourceService(resourcePath) {
	return {
		async list({ signal, ...query } = {}) {
			return apiRequest(`${resourcePath}${buildQueryString(query)}`, { signal });
		},

		async getById(id, { signal } = {}) {
			return apiRequest(`${resourcePath}/${encodeId(id)}`, { signal });
		},

		async create(payload, { signal } = {}) {
			return apiRequest(resourcePath, { method: 'POST', body: payload, signal });
		},

		async update(id, payload, { signal } = {}) {
			return apiRequest(`${resourcePath}/${encodeId(id)}`, {
				method: 'PUT',
				body: payload,
				signal,
			});
		},

		async remove(id, { signal } = {}) {
			return apiRequest(`${resourcePath}/${encodeId(id)}`, { method: 'DELETE', signal });
		},
	};
}
