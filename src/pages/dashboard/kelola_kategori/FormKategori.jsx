import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout.jsx';
import { demoArticleCategories } from '../../../data/demoData.js';
import {
	createArticleCategory,
	getArticleCategoryById,
	updateArticleCategory,
} from '../../../services/articleCategoryService.js';

export default function FormKategori({ mode = 'create' }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditing = mode === 'edit';
	const [namaKategori, setNamaKategori] = useState('');
	const [loading, setLoading] = useState(isEditing);
	const [saving, setSaving] = useState(false);
	const [isDemoData, setIsDemoData] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!isEditing) return undefined;
		const controller = new AbortController();
		let isMounted = true;

		async function loadCategory() {
			try {
				const response = await getArticleCategoryById(id, { signal: controller.signal });
				const category = response?.data ?? response;
				if (isMounted) setNamaKategori(category.nama_kategori ?? '');
			} catch (loadError) {
				if (isMounted && loadError.name !== 'AbortError') {
					const demoCategory = demoArticleCategories.find((item) => String(item.id_category) === id);
					if (demoCategory) {
						setNamaKategori(demoCategory.nama_kategori);
						setIsDemoData(true);
					}
					setError(loadError.message || 'Kategori gagal dimuat.');
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		loadCategory();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [id, isEditing]);

	async function handleSubmit(event) {
		event.preventDefault();
		if (isDemoData) {
			setError('Data demo tidak dapat disimpan. Sambungkan ke API untuk memperbarui kategori.');
			return;
		}
		setSaving(true);
		setError('');
		try {
			if (isEditing) await updateArticleCategory(id, { nama_kategori: namaKategori });
			else await createArticleCategory({ nama_kategori: namaKategori });
			navigate('/dashboard/kategori');
		} catch (saveError) {
			setError(saveError.message || 'Kategori gagal disimpan.');
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return <DashboardLayout><p role="status" className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Memuat kategori...</p></DashboardLayout>;
	}

	if (isEditing && !namaKategori) {
		return (
			<DashboardLayout>
				<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
					<h2 className="text-xl font-bold text-[#0B3C65]">{error || 'Kategori tidak ditemukan'}</h2>
					<Link to="/dashboard/kategori" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:underline">Kembali ke Kelola Kategori</Link>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="mb-6">
				<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">{isEditing ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">Kelola kategori artikel edukasi SIPANELA.</p>
			</div>
			{isDemoData && (
				<p role={error ? 'alert' : 'status'} className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
					{error ? `API belum tersedia (${error}). Data yang ditampilkan adalah data demo dan tidak dapat disimpan.` : 'Data yang ditampilkan adalah data demo dan tidak dapat disimpan.'}
				</p>
			)}
			<form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<label htmlFor="nama-kategori" className="block text-sm font-semibold text-slate-700">
					Nama Kategori <span className="text-rose-500">*</span>
				</label>
				<input
					id="nama-kategori"
					name="nama_kategori"
					type="text"
					required
					maxLength={50}
					value={namaKategori}
					onChange={(event) => setNamaKategori(event.target.value)}
					placeholder="Contoh: Edukasi Narkotika"
					className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
				/>
				{error && !isDemoData && <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
				<div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-4 sm:flex-row">
					<Link to="/dashboard/kategori" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">Batal</Link>
					<button type="submit" disabled={saving || isDemoData} className="rounded-xl bg-[#0B3C65] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A2E4D] disabled:opacity-60">
						{saving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Simpan Kategori'}
					</button>
				</div>
			</form>
		</DashboardLayout>
	);
}
