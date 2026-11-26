import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

export const ORGANIZATION = {
	leaders: [
		{
			name: 'Prof. Novita Tresiana, S.Sos., M.Si.',
			role: 'Penanggung Jawab Satgas P4GN POLINELA',
			image: 47,
		},
		{
			name: 'Indrayati Putri Idrus, S.H., M.H.',
			role: 'Koordinator Regulasi & Penindakan Hukum',
			image: 44,
		},
		{
			name: 'Eko Budi Sulistio, S.Sos., M.Ap.',
			role: 'Manajemen Administrasi & Pelaporan Terpadu',
			image: 12,
		},
	],
	members: [
		{ name: 'Rengga Fransseda, A.Md.', role: 'Logistik & Operasional Lapangan', image: 13 },
		{ name: 'Muhammad Ubaidillah', role: 'Edukasi Mahasiswa & Kampanye Kreatif', image: 14 },
		{ name: 'Ahmad Suntara, S.Kom.', role: 'Infrastruktur SIPANELA & Data Keamanan', image: 15 },
		{ name: 'Yusrizal, S.P., MM.', role: 'Koordinasi Antar Jurusan & Ormawa', image: 16 },
		{ name: 'M. Yhoga Ismail Ibn Ibrahim, M.T.I.', role: 'Analisis Siber & Pengaduan Anonim', image: 18 },
		{ name: 'dr. Tri Umiana Soleha', role: 'Pemeriksaan Medis & Triase Screening', image: 20 },
		{ name: 'Nidia Putri, S.Pd.', role: 'Bimbingan Perkuliahan & Pencegahan Dini', image: 21 },
		{ name: 'Hanny Nurluthfiah Rianti, A.A.', role: 'Liaison Mahasiswa & Hubungan Masyarakat', image: 24, light: true },
		{ name: 'M. Semario Ibrahim Habib Al Huda', role: 'Divisi Relawan & Peer Counselor', image: 33 },
		{ name: 'Niabi Rahma Wati', role: 'Advokasi Gender & Perlindungan Saksi', image: 32 },
		{ name: 'Mayang Atika Sekar Kirani', role: 'Sosialisasi Asrama & Unit Kegiatan', image: 25 },
		{ name: 'Olivia Elizabeth Sekar Lumbantobing', role: 'Penerimaan & Validasi Berkas Pelapor', image: 26 },
		{ name: 'Martha Vinencia Putri Singga', role: 'Dokumentasi & Arsip Kasus Rahasia', image: 28 },
		{ name: 'Kurnia Tri Rahayu', role: 'Pendampingan Psikososial Awal', image: 44 },
		{ name: 'Prof. Dr. Noverman Budiadi, M.Si.', role: 'Pakar Kebijakan Publik & Konseling Pemulihan', image: 60, consultant: true },
		{ name: 'Dr. Budiyono, MH.', role: 'Pakar Hukum Pidana Narkotika & Advokasi', image: 68, consultant: true },
	],
};

export function getOrganization() {
	return USE_MOCK
		? withMockDelay(ORGANIZATION)
		: api.get('/organization').then((response) => response.data);
}
