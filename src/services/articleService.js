import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

const sampleImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYuvu6u84ttDqor0c_a4Y1csRVKly_CFsBrnKCFeaXpQ&s=10';

export const INITIAL_ARTICLES = [
	{
		id: 1,
		image: sampleImage,
		judul: 'Ilusi Energi Sesaat: Bagaimana Amfetamin Merusak Fungsi Memori Permanen',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Satgas Medis Polinela',
		konten: 'Artikel edukasi mengenai dampak amfetamin terhadap fungsi memori dan kesehatan.',
		visibility: 'publik',
	},
	{
		id: 2,
		image: sampleImage,
		judul: 'Waspada Vape Berisi Zat Adiktif Narkotika: Fakta & Deteksi Awal',
		kategori: 'Edukasi Narkotika',
		status: 'Diterbitkan',
		penulis: 'Riset BNN & Polinela',
		konten: 'Kenali fakta dan deteksi awal zat adiktif pada produk vape.',
		visibility: 'publik',
	},
	{
		id: 3,
		image: sampleImage,
		judul: 'Konsekuensi Hukum Pidana dan Sanksi Drop Out Tanpa Kompromi',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Biro Hukum Polinela',
		konten: 'Informasi mengenai konsekuensi hukum pidana dan sanksi di lingkungan kampus.',
		visibility: 'publik',
	},
	{
		id: 4,
		image: sampleImage,
		judul: 'Mitos dan Fakta tentang Penggunaan Stimulan di Ujian Akhir',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Satgas Medis Polinela',
		konten: 'Mitos dan fakta penggunaan stimulan beserta dampaknya bagi mahasiswa.',
		visibility: 'publik',
	},
	{
		id: 5,
		image: sampleImage,
		judul: 'Pencegahan Pelanggaran Hukum di Lingkungan Kampus',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Biro Hukum Polinela',
		konten: 'Panduan pencegahan pelanggaran hukum di lingkungan kampus.',
		visibility: 'publik',
	},
];

export const ARTICLE_FILTER_CATEGORIES = [
	'Semua Artikel',
	'Siaran Pers BNN',
	'Edukasi Narkotika',
	'Sosialisasi Kampus',
	'Draf',
];

export const ARTICLE_FORM_CATEGORIES = [
	'Siaran Pers BNN',
	'Edukasi Narkotika',
	'Sosialisasi Kampus',
	'Hukum Kampus',
];

export function getArticles() {
	return USE_MOCK
		? withMockDelay(INITIAL_ARTICLES)
		: api.get('/articles').then((response) => response.data);
}

export function getArticleFilterCategories() {
	return USE_MOCK
		? withMockDelay(ARTICLE_FILTER_CATEGORIES)
		: api.get('/articles/categories').then((response) => response.data);
}

export function getArticleFormCategories() {
	return USE_MOCK
		? withMockDelay(ARTICLE_FORM_CATEGORIES)
		: api.get('/articles/categories').then((response) => response.data);
}

export function getArticleById(id) {
	return USE_MOCK
		? withMockDelay(INITIAL_ARTICLES.find((article) => String(article.id) === String(id)))
		: api.get(`/articles/${id}`).then((response) => response.data);
}

export function createArticle(article) {
	return USE_MOCK
		? withMockDelay(article)
		: api.post('/articles', article).then((response) => response.data);
}

export function updateArticle(id, article) {
	return USE_MOCK
		? withMockDelay({ ...INITIAL_ARTICLES.find((item) => String(item.id) === String(id)), ...article })
		: api.put(`/articles/${id}`, article).then((response) => response.data);
}
