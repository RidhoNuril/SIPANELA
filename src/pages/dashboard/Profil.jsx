import { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import Icon from '../../components/common/Icon';

const initialProfile = {
	nama: 'Admin, S.Kom., M.T.I.',
	nip: '19880412 201503 1 002',
	unit: 'Satgas Anti Narkoba - POLINELA',
	email: 'satgas.antinarkoba@polinela.ac.id',
	whatsapp: '+62 812-7890-1122',
	kontakDarurat: 'Posko Induk Keamanan (Ext. 1109)',
	deskripsi: 'Bertanggung jawab sebagai koordinator lapangan investigasi dugaan penyalahgunaan zat adiktif, pelaksanaan verifikasi lapangan, pendampingan saksi pelapor anonim, serta koordinasi rujukan.',
};

function Toggle({ label, description, checked, onChange }) {
	return (
		<div className="flex items-center justify-between gap-4 border-t border-slate-100 py-3">
			<div>
				<p className="text-xs font-semibold text-slate-700">{label}</p>
				<p className="mt-0.5 text-[10px] leading-4 text-slate-500">{description}</p>
			</div>
			<button
				type="button"
				role="switch"
				aria-checked={checked}
				aria-label={label}
				onClick={() => onChange(!checked)}
				className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? 'bg-[#0B3C65]' : 'bg-slate-500'}`}
			>
				<span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-0' : '-translate-x-4'}`} />
			</button>
		</div>
	);
}

export default function Profil() {
	const [profile, setProfile] = useState(initialProfile);
	const [smsEnabled, setSmsEnabled] = useState(false);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
	const [message, setMessage] = useState('');

	function updateField(event) {
		const { name, value } = event.target;
		setProfile((current) => ({ ...current, [name]: value }));
		setMessage('');
	}

	function cancelChanges() {
		setProfile(initialProfile);
		setSmsEnabled(false);
		setTwoFactorEnabled(false);
		setMessage('');
	}

	function saveChanges(event) {
		event.preventDefault();
		setMessage('Profil diperbarui pada sesi ini. Integrasi penyimpanan permanen belum tersedia.');
	}

	function inputField(label, name, type = 'text') {
		return (
			<label className="block min-w-0 text-[11px] font-medium text-slate-500">
				{label}
				<input
					type={type}
					name={name}
					value={profile[name]}
					onChange={updateField}
					className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-[#0B3C65] focus:ring-2 focus:ring-blue-100"
				/>
			</label>
		);
	}

	return (
		<DashboardLayout>
			<div className="space-y-5">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">Profil Akun</h2>
						<p className="mt-1 text-xs text-slate-500">Kelola identitas akun Anda.</p>
					</div>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={cancelChanges}
							className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
						>
							Batal
						</button>
						<button
							type="submit"
							form="profile-form"
							className="flex items-center gap-2 rounded-lg bg-[#0B3C65] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0A2E4D]"
						>
							<Icon name="check" />
							Simpan Perubahan Profil
						</button>
					</div>
				</div>

				<section className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:px-5">
					<div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-700 to-[#0B3C65] text-lg font-bold text-white shadow-sm">
						AD
						<span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">
							<Icon name="check" className="text-[9px]" />
						</span>
					</div>
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="text-base font-bold text-slate-800">Admin</h3>
							<span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
								<Icon name="verified-badge" /> Petugas
							</span>
						</div>
						<p className="mt-0.5 text-xs font-medium text-slate-600">Satgas Anti Narkoba Polinela</p>
						<p className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
							NIP. 19880412 201503 1 002
						</p>
					</div>
				</section>

				<div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
					<form id="profile-form" onSubmit={saveChanges} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
						<div className="border-b border-slate-100 pb-3">
							<h3 className="text-sm font-bold text-slate-800">Informasi Identitas</h3>
							<p className="text-[10px] text-slate-500">Perbarui informasi personal Anda.</p>
						</div>

						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							{inputField('Nama Lengkap & Gelar', 'nama')}
							{inputField('Nomor Induk Pegawai (NIP) / NIDN', 'nip')}
							<label className="block min-w-0 text-[11px] font-medium text-slate-500">
								Unit Kerja / Bagian
								<select
									name="unit"
									value={profile.unit}
									onChange={updateField}
									className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-[#0B3C65] focus:ring-2 focus:ring-blue-100"
								>
									<option>Satgas Anti Narkoba - POLINELA</option>
									<option>Politeknik Negeri Lampung</option>
								</select>
							</label>
							{inputField('Alamat Email', 'email', 'email')}
							{inputField('Nomor WhatsApp', 'whatsapp', 'tel')}
							{inputField('Kontak Darurat', 'kontakDarurat')}
						</div>

						<label className="mt-4 block text-[11px] font-medium text-slate-500">
							Tanggung Jawab
							<textarea
								name="deskripsi"
								rows="3"
								value={profile.deskripsi}
								onChange={updateField}
								className="mt-1 block w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-4 text-slate-700 outline-none transition focus:border-[#0B3C65] focus:ring-2 focus:ring-blue-100"
							/>
						</label>

						{message && (
							<p role="status" className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
								{message}
							</p>
						)}
					</form>

					<aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
						<h3 className="border-b border-slate-100 pb-3 text-xs font-bold text-slate-800">
							Hak Akses &amp; Otoritas Sistem
						</h3>
						<div className="py-3">
							<p className="mb-1.5 text-[10px] font-semibold text-slate-600">Peran Akses Sistem SIPANELA</p>
							<div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
								<span className="text-[10px] font-semibold text-[#0B3C65]">Administrator</span>
								<span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-semibold text-blue-800">Tingkat 1</span>
							</div>
						</div>

						<div className="border-t border-slate-100 py-3">
							<p className="mb-1.5 text-[10px] font-semibold text-slate-600">Tingkat Izin Enkripsi &amp; Audit</p>
							<div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
								<p className="flex items-center gap-1 text-[10px] font-semibold leading-4 text-emerald-700">
									<Icon name="shield-check" className="shrink-0" />
									Otoritas Dekripsi Berkas Laporan Terverifikasi
								</p>
								<p className="mt-1 text-[9px] leading-4 text-slate-500">
									Dapat membuka dokumen lampiran SHA-256 dan Berita Acara.
								</p>
							</div>
						</div>

						<Toggle
							label="Peringatan Kritis SMS / WA"
							description="Notifikasi siaga real-time laporan darurat masuk"
							checked={smsEnabled}
							onChange={setSmsEnabled}
						/>
						<Toggle
							label="Autentikasi 2 Faktor (2FA)"
							description="Google Authenticator / Token Kampus Polinela"
							checked={twoFactorEnabled}
							onChange={setTwoFactorEnabled}
						/>
					</aside>
				</div>
			</div>
		</DashboardLayout>
	);
}
