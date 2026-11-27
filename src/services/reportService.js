import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

export const INITIAL_REPORTS = [
	{
		idTiket: '#SPN-2026-089',
		pelapor: 'Bagus Dwi',
		kategori: 'Pengedaran Narkotika',
		lokasi: 'Area Parkir Belakang Gedung Sakura',
		waktu: '24 Okt 2024, 21:15 WIB',
		status: 'Selesai',
	},
	{
		idTiket: '#SPN-2026-088',
		pelapor: 'Zaki Ridho',
		kategori: 'Pengedaran Narkotika',
		lokasi: 'Gazebo SFS',
		waktu: '24 Okt 2024, 19:40 WIB',
		status: 'Investigasi',
	},
	{
		idTiket: '#SPN-2026-087',
		pelapor: 'Ridho Nuril',
		kategori: 'Penyalahgunaan Narkotika',
		lokasi: 'Sekitar Kantin GKB',
		waktu: '23 Okt 2024, 14:10 WIB',
		status: 'Verifikasi',
	},
	{
		idTiket: '#SPN-2026-086',
		pelapor: 'I Made Dirga',
		kategori: 'Penyalahgunaan Narkotika',
		lokasi: 'Lahan Peternakan Politeknik',
		waktu: '22 Okt 2024, 22:50 WIB',
		status: 'Menunggu',
	},
	{
		idTiket: '#SPN-2026-085',
		pelapor: 'Ikhlasul Amal',
		kategori: 'Pemakai',
		lokasi: 'Lobi Gedung Direktorat Lt. 1',
		waktu: '21 Okt 2024, 08:30 WIB',
		status: 'Di Tolak',
	},
	{
		idTiket: '#SPN-2026-084',
		pelapor: 'Mahasiswa A',
		kategori: 'Penyalahgunaan Narkotika',
		lokasi: 'Koridor Gedung Kuliah Bersama',
		waktu: '20 Okt 2024, 10:00 WIB',
		status: 'Selesai',
	},
	{
		idTiket: '#SPN-2026-083',
		pelapor: 'Dosen B',
		kategori: 'Lainnya',
		lokasi: 'Kantin Fakultas Teknik',
		waktu: '19 Okt 2024, 13:20 WIB',
		status: 'Investigasi',
	},
].map((report) => ({
	...report,
	detail: '',
	petugas: '',
	hasilAkhir: '',
	lampiran: null,
}));

export const REPORT_ARCHIVES = [
	{ period: 'Maret 2026', year: 'Tahun 2026', month: 'Oktober', status: 'Terkini & Berjalan', cases: '982 Aduan Terverifikasi', size: '3,4 MB', note: 'Diperbarui 3 jam lalu' },
	{ period: 'Februari 2026', year: 'Tahun 2026', month: 'Oktober', status: 'PDF + XLSX', cases: '1.185 Kasus & Bukti Sitaan', size: '5,1 MB', note: 'Ditandatangani Deputi Penindakan' },
	{ period: 'Januari 2026', year: 'Tahun 2026', month: 'Oktober', status: 'PDF + XLSX', cases: '1.240 Kasus/Aduan Masuk', size: '4,8 MB', note: 'Diverifikasi BNN RI' },
	{ period: 'Desember 2025', year: 'Tahun 2025', month: 'Oktober', status: 'PDF + XLSX', cases: '1.320 Kasus Selesai', size: '4,6 MB', note: '' },
	{ period: 'November 2025', year: 'Tahun 2025', month: 'Oktober', status: 'PDF + XLSX', cases: '1.290 Kasus Selesai', size: '4,4 MB', note: '' },
];

export const REPORT_FILTER_CATEGORIES = [
	'Semua Kategori',
	'Penyalahgunaan Narkotika',
	'Pengedaran Narkotika',
	'Minuman Keras'
];

export const REPORT_FORM_CATEGORIES = [
	'Peredaran Narkotika',
	'Penyalahgunaan Narkotika',
	'Penyalahgunaan Zat Adiktif',
	'Lainnya',
];

export function getIncomingReports() {
	return USE_MOCK
		? withMockDelay(INITIAL_REPORTS)
		: api.get('/reports').then((response) => response.data);
}

export function getReportFilterCategories() {
	return USE_MOCK
		? withMockDelay(REPORT_FILTER_CATEGORIES)
		: api.get('/reports/categories').then((response) => response.data);
}

export function getReportFormCategories() {
	return USE_MOCK
		? withMockDelay(REPORT_FORM_CATEGORIES)
		: api.get('/reports/categories').then((response) => response.data);
}

export function getReportArchives() {
	return USE_MOCK
		? withMockDelay(REPORT_ARCHIVES)
		: api.get('/reports/archives').then((response) => response.data);
}

export function updateReport(id, updates) {
	return USE_MOCK
		? withMockDelay({ ...INITIAL_REPORTS.find((report) => report.idTiket === id), ...updates })
		: api.patch(`/reports/${encodeURIComponent(id)}`, updates).then((response) => response.data);
}
