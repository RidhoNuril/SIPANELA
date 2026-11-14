import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

export const DASHBOARD_DATA = {
	Mingguan: {
		cards: { masuk: 2, selesai: 1, total: 262 },
		chart: [
			{ label: 'Sen', masuk: 0, selesai: 0 },
			{ label: 'Sel', masuk: 12, selesai: 0 },
			{ label: 'Rab', masuk: 0, selesai: 18 },
			{ label: 'Kam', masuk: 0, selesai: 0 },
			{ label: 'Jum', masuk: 10, selesai: 0 },
			{ label: 'Sab', masuk: 0, selesai: 22 },
			{ label: 'Ming', masuk: 0, selesai: 0 },
		],
	},
	Bulanan: {
		cards: { masuk: 15, selesai: 10, total: 280 },
		chart: [
			{ label: 'W1', masuk: 5, selesai: 2 },
			{ label: 'W2', masuk: 4, selesai: 3 },
			{ label: 'W3', masuk: 3, selesai: 2 },
			{ label: 'W4', masuk: 3, selesai: 3 },
		],
	},
	Tahunan: {
		cards: { masuk: 120, selesai: 90, total: 350 },
		chart: [
			{ label: 'Jan', masuk: 10, selesai: 8 },
			{ label: 'Feb', masuk: 8, selesai: 6 },
			{ label: 'Mar', masuk: 12, selesai: 10 },
			{ label: 'Apr', masuk: 10, selesai: 8 },
			{ label: 'Mei', masuk: 15, selesai: 12 },
			{ label: 'Jun', masuk: 12, selesai: 10 },
			{ label: 'Jul', masuk: 10, selesai: 8 },
			{ label: 'Agu', masuk: 8, selesai: 6 },
			{ label: 'Sep', masuk: 10, selesai: 8 },
			{ label: 'Okt', masuk: 12, selesai: 10 },
			{ label: 'Nov', masuk: 8, selesai: 2 },
			{ label: 'Des', masuk: 5, selesai: 2 },
		],
	},
};

export function getDashboardData(period) {
	return USE_MOCK
		? withMockDelay(DASHBOARD_DATA[period])
		: api.get('/dashboard', { params: { period } }).then((response) => response.data);
}
