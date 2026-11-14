import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import Icon from '../../components/common/Icon.jsx';
import { getUserById, updateUser } from '../../services/userService.js';
import { demoProfile } from '../../data/demoData.js';

function getSavedUserId() {
	const savedUser = localStorage.getItem('user');
	if (!savedUser) return null;

	try {
		return JSON.parse(savedUser)?.id_user ?? null;
	} catch {
		return null;
	}
}

export default function Profil() {
	const [profile, setProfile] = useState(demoProfile);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isDemoData, setIsDemoData] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let isMounted = true;

		async function loadProfile() {
			try {
				const userId = getSavedUserId();
				if (!userId) {
					throw new Error('Sesi pengguna tidak ditemukan. Silakan masuk kembali untuk membuka profil.');
				}
				const response = await getUserById(userId, { signal: controller.signal });
				const user = response?.data ?? response;
				if (isMounted) {
					setProfile(user);
					setIsDemoData(false);
				}
			} catch (loadError) {
				if (isMounted && loadError.name !== 'AbortError') {
					setError(loadError.message || 'Profil gagal dimuat.');
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		loadProfile();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	function updateField(event) {
		const { name, value } = event.target;
		setProfile((current) => ({ ...current, [name]: value }));
		setError('');
		setMessage('');
	}

	async function saveProfile(event) {
		event.preventDefault();
		if (isDemoData) {
			setError('Data profil demo tidak dapat disimpan. Sambungkan ke API dan masuk kembali.');
			return;
		}
		if (!profile?.id_user) {
			setError('ID pengguna tidak tersedia. Muat ulang profil atau masuk kembali.');
			return;
		}

		setSaving(true);
		setError('');
		setMessage('');
		try {
			const payload = {
				nama: profile.nama,
				nomor_identitas: profile.nomor_identitas,
				email: profile.email,
				no_hp: profile.no_hp,
				jabatan: profile.jabatan,
			};
			const response = await updateUser(profile.id_user, payload);
			const updatedUser = response?.data ?? response ?? { ...profile, ...payload };
			setProfile((current) => ({ ...current, ...updatedUser }));
			localStorage.setItem('user', JSON.stringify({ ...profile, ...updatedUser }));
			setMessage('Profil berhasil diperbarui.');
		} catch (saveError) {
			setError(saveError.message || 'Profil gagal diperbarui.');
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return <DashboardLayout><p role="status" className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Memuat profil...</p></DashboardLayout>;
	}

	return (
		<DashboardLayout>
			<div className="space-y-5">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">Profil Akun</h2>
					<p className="mt-1 text-xs text-slate-500">Perbarui data pengguna yang tersimpan di SIPANELA.</p>
				</div>

				{isDemoData && (
					<p role={error ? 'alert' : 'status'} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
						{error ? `API profil belum tersedia (${error}). Data di bawah adalah demo; perubahan memerlukan API.` : 'Menampilkan data profil demo sambil mencoba memuat API.'}
					</p>
				)}
				{error && !isDemoData && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

				{profile && (
					<>
						<section className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:px-5">
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0B3C65] text-lg font-bold text-white">
								{profile.nama?.trim().charAt(0)?.toUpperCase() || <Icon name="user" />}
							</div>
							<div className="min-w-0">
								<h3 className="truncate text-base font-bold text-slate-800">{profile.nama}</h3>
								<p className="mt-0.5 text-xs text-slate-600">{profile.jabatan}</p>
								<p className="mt-1 text-[10px] text-slate-500">ID pengguna: {profile.id_user}</p>
							</div>
						</section>

						<form onSubmit={saveProfile} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
							<div className="border-b border-slate-100 pb-3">
								<h3 className="text-sm font-bold text-slate-800">Informasi Identitas</h3>
								<p className="text-[10px] text-slate-500">Data mengikuti kolom pada entitas Users di ERD.</p>
							</div>

							<div className="mt-4 grid gap-4 sm:grid-cols-2">
								<label className="block text-[11px] font-medium text-slate-500">
									Nama lengkap
									<input name="nama" required maxLength={100} value={profile.nama ?? ''} onChange={updateField} className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#0B3C65]" />
								</label>
								<label className="block text-[11px] font-medium text-slate-500">
									Nomor identitas
									<input name="nomor_identitas" required maxLength={30} value={profile.nomor_identitas ?? ''} onChange={updateField} className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#0B3C65]" />
								</label>
								<label className="block text-[11px] font-medium text-slate-500">
									Email
									<input name="email" type="email" required maxLength={100} value={profile.email ?? ''} onChange={updateField} className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#0B3C65]" />
								</label>
								<label className="block text-[11px] font-medium text-slate-500">
									Nomor HP
									<input name="no_hp" type="tel" required maxLength={20} value={profile.no_hp ?? ''} onChange={updateField} className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#0B3C65]" />
								</label>
								<label className="block text-[11px] font-medium text-slate-500 sm:col-span-2">
									Jabatan
									<input name="jabatan" required value={profile.jabatan ?? ''} onChange={updateField} className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#0B3C65]" />
								</label>
							</div>

							{message && <p role="status" className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{message}</p>}
							<div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
								<button type="submit" disabled={saving || isDemoData} className="flex items-center gap-2 rounded-lg bg-[#0B3C65] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0A2E4D] disabled:opacity-60">
									<Icon name="check" />
									{saving ? 'Menyimpan...' : 'Simpan Perubahan'}
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</DashboardLayout>
	);
}
