import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

export const INITIAL_CATEGORIES = [
	{ id: 1, nama_kategori: 'Sosialisasi Kampus' },
	{ id: 2, nama_kategori: 'Edukasi Narkotika' },
	{ id: 3, nama_kategori: 'Siaran Pers BNN' },
	{ id: 4, nama_kategori: 'Hukum Kampus' },
	{ id: 5, nama_kategori: 'Regulasi Kampus' },
	{ id: 6, nama_kategori: 'Pencurian' },
	{ id: 7, nama_kategori: 'Pelanggaran Hukum' },
];

export function getCategories() {
	return USE_MOCK
		? withMockDelay(INITIAL_CATEGORIES)
		: api.get('/categories').then((response) => response.data);
}

export function getCategoryById(id) {
	return USE_MOCK
		? withMockDelay(INITIAL_CATEGORIES.find((category) => String(category.id) === String(id)))
		: api.get(`/categories/${id}`).then((response) => response.data);
}

export function createCategory(category) {
	return USE_MOCK
		? withMockDelay(category)
		: api.post('/categories', category).then((response) => response.data);
}

export function updateCategory(id, category) {
	return USE_MOCK
		? withMockDelay({ ...INITIAL_CATEGORIES.find((item) => String(item.id) === String(id)), ...category })
		: api.put(`/categories/${id}`, category).then((response) => response.data);
}
