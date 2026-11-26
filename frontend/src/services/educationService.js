import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

export const EDUCATION_ARTICLES = [
	{
		category: 'Fisiologis · DOPSI · SARAF',
		readTime: '5 menit baca',
		publisher: 'Satgas Medis Polinela',
		title: 'Ilusi Energi Sesaat: Bagaimana Amfetamin Merusak Fungsi Memori Permanen',
		description: 'Banyak mitos di kalangan mahasiswa mengenai zat stimulan penambah fokus saat ujian tugas akhir. Ketahui bagaimana zat ini secara biologis merusak reseptor...',
		image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85',
		imageAlt: 'Ilustrasi otak dan sistem saraf',
		imageClass: 'object-cover',
	},
	{
		category: 'Fisiologis · DOPSI · SARAF',
		readTime: '5 menit baca',
		publisher: 'Satgas Medis Polinela',
		title: 'Ilusi Energi Sesaat: Bagaimana Amfetamin Merusak Fungsi Memori Permanen',
		description: 'Banyak mitos di kalangan mahasiswa mengenai zat stimulan penambah fokus saat ujian tugas akhir. Ketahui bagaimana zat ini secara biologis merusak reseptor...',
		image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85',
		imageAlt: 'Ilustrasi otak dan sistem saraf',
		imageClass: 'object-cover',
	},
	{
		category: 'Tren & Waspada',
		readTime: '7 menit baca',
		publisher: 'Riset BNN & Polinela',
		title: 'Waspada Vape Berisi Zat Adiktif Narkotika: Fakta & Deteksi Awal',
		description: 'Kajian laboratorium mengenai penyalahgunaan cairan rokok elektrik sintetik yang mengandung zat psikotropika golongan baru yang membahayakan...',
		image: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7f9c1?auto=format&fit=crop&w=900&q=85',
		imageAlt: 'Peralatan laboratorium untuk pengujian',
		imageClass: 'object-cover',
	},
	{
		category: 'Hukum Kampus',
		readTime: '4 menit baca',
		publisher: 'Biro Hukum Polinela',
		title: 'Konsekuensi Hukum Pidana dan Sanksi Drop Out Tanpa Kompromi',
		description: 'Penjelasan detail mengenai klausul pakta integritas mahasiswa Politeknik Negeri Lampung dan konsekuensi pidana bila terbukti mengedarkan atau memakai di...',
		image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=85',
		imageAlt: 'Ruang sidang pengadilan',
		imageClass: 'object-cover',
	},
];

export const PREVENTION_PILLARS = [
	{
		title: 'Penguatan Literasi Bahaya Zat Psikoaktif Baru (NPS)',
		description:
			'Membedah mitos obat penunjang konsentrasi saat skripsi, serta identifikasi bahaya tembakau sintetis dan cairan rokok elektronik ilegal yang menyasar mahasiswa.',
	},
	{
		title: 'Keterampilan Asertif Teman Sebaya (Peer Refusal)',
		description:
			'Pelatihan intensif bagi Badan Eksekutif Mahasiswa (BEM) dan Unit Kegiatan Mahasiswa (UKM) untuk menolak desakan pergaulan tanpa rasa canggung atau terkucilkan.',
	},
	{
		title: 'Hotline Pelaporan Aman & Kerahasiaan Identitas (Whistleblower)',
		description:
			'Jaminan perlindungan identitas 100% bagi civitas akademika yang melaporkan indikasi peredaran gelap di area indeks maupun asrama kampus.',
	},
	{
		title: 'Rehabilitasi Humanis Tanpa Pengucilan',
		description:
			'Penegakan klausul rehabilitasi medis dan konseling psikologis sebelum penjatuhan sanksi akademik bagi korban penyalahgunaan zat.',
	},
];

export const HERO_IMAGES = [
	{
		src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
		alt: 'Gedung kampus',
	},
	{
		src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600',
		alt: 'Suasana lingkungan perguruan tinggi',
	},
];

export function getEducationArticles() {
	return USE_MOCK
		? withMockDelay(EDUCATION_ARTICLES)
		: api.get('/education/articles').then((response) => response.data);
}

export function getPreventionPillars() {
	return USE_MOCK
		? withMockDelay(PREVENTION_PILLARS)
		: api.get('/education/prevention-pillars').then((response) => response.data);
}

export function getHeroImages() {
	return USE_MOCK
		? withMockDelay(HERO_IMAGES)
		: api.get('/home/hero-images').then((response) => response.data);
}
