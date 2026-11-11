import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout';
import Icon from '../../../components/common/Icon';
import { initialKategori } from './KelolaKategoriColumns';

export default function FormKategori({ mode = 'create', initialValues = {} }) {
	const { id } = useParams();
	const isEditing = mode === 'edit';
	const selectedKategori = initialValues.id
		? initialValues
		: initialKategori.find((kategori) => String(kategori.id) === id);
	const values = isEditing ? selectedKategori : initialValues;
	const [namaKategori, setNamaKategori] = useState(values?.nama_kategori ?? '');
	const [message, setMessage] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		setMessage('Tampilan form sudah siap. Penyimpanan kategori belum terhubung.');
	}

	if (isEditing && !selectedKategori) {
		return (
			<DashboardLayout>
				<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
					<h2 className="text-xl font-bold text-[#0B3C65]">Kategori tidak ditemukan</h2>
					<Link to="/dashboard/kategori" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:underline">
						Kembali ke Kelola Kategori
					</Link>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="max-w-full">
				<div className="mb-6">
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">
						{isEditing ? 'Edit Kategori' : 'Tambah Kategori'}
					</h2>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						Manajemen publikasi berita, edukasi bahaya narkoba, dan sosialisasi kampus POLINELA.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<label htmlFor="nama-kategori" className="block text-sm font-semibold text-slate-700">
						Nama Kategori <span className="text-rose-500">*</span>
					</label>
					<input
						id="nama-kategori"
						name="nama_kategori"
						type="text"
						required
						maxLength={80}
						value={namaKategori}
						onChange={(event) => setNamaKategori(event.target.value)}
						placeholder="Contoh: Edukasi Narkotika"
						className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
					/>
					<p className="mt-2 text-xs text-slate-500">
						Nama kategori akan tampil sebagai filter utama artikel edukasi bagi pembaca di portal publik SIPANELA.
					</p>

					<div className="mt-6 flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
						<Icon name="info-circle" className="mt-0.5 text-lg text-sky-600" />
						<div>
							<p className="font-semibold text-[#0B3C65]">Catatan Kategori:</p>
							<p className="mt-0.5 max-w-2xl text-xs leading-5 text-slate-500">
								Pastikan nama kategori belum pernah terdaftar sebelumnya agar memudahkan pengelompokan artikel mahasiswa dan kegiatan Satgas P4GN POLINELA.
							</p>
						</div>
					</div>

					{message && (
						<p role="status" className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
							{message}
						</p>
					)}

					<div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-4 sm:flex-row">
						<Link
							to="/dashboard/kategori"
							className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
						>
							Batal
						</Link>
						<button
							type="submit"
							className="rounded-xl bg-[#0B3C65] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2E4D]"
						>
							{isEditing ? 'Simpan Perubahan' : 'Simpan Kategori'}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
