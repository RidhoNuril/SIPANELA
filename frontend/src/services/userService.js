import api from '../api/axiosConfig.js';
import { withMockDelay } from './mockUtils.js';

const USE_MOCK = true;

export const INITIAL_PROFILE = {
	nama: 'Admin, S.Kom., M.T.I.',
	nip: '19880412 201503 1 002',
	unit: 'Satgas Anti Narkoba - POLINELA',
	email: 'satgas.antinarkoba@polinela.ac.id',
	whatsapp: '+62 812-7890-1122',
	kontakDarurat: 'Posko Induk Keamanan (Ext. 1109)',
	deskripsi: 'Bertanggung jawab sebagai koordinator lapangan investigasi dugaan penyalahgunaan zat adiktif, pelaksanaan verifikasi lapangan, pendampingan saksi pelapor anonim, serta koordinasi rujukan.',
};

export function getProfile() {
	return USE_MOCK
		? withMockDelay(INITIAL_PROFILE)
		: api.get('/users/me').then((response) => response.data);
}

export function updateProfile(profile) {
	return USE_MOCK
		? withMockDelay(profile)
		: api.put('/users/me', profile).then((response) => response.data);
}
