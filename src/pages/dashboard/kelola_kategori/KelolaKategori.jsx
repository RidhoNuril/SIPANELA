import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout.jsx';
import DataTable from '../../../components/common/DataTable.jsx';
import Icon from '../../../components/common/Icon.jsx';
import { demoArticleCategories } from '../../../data/demoData.js';
import { deleteArticleCategory, getArticleCategories } from '../../../services/articleCategoryService.js';
import KelolaKategoriColumns from './KelolaKategoriColumns.jsx';

function unwrapItems(response) {
	const items = Array.isArray(response) ? response : response?.data;
	if (!Array.isArray(items)) {
		throw new Error('Respons kategori harus berupa array atau memiliki properti data berbentuk array.');
	}
	return items;
}

export default function KelolaKategori() {
	const [kategori, setKategori] = useState(demoArticleCategories);
	const [loading, setLoading] = useState(true);
	const [isDemoData, setIsDemoData] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const controller = new AbortController();
		let isMounted = true;

		async function loadCategories() {
			try {
				const response = await getArticleCategories({ signal: controller.signal });
				const items = unwrapItems(response);
				if (isMounted) {
					setKategori(items);
					setIsDemoData(false);
				}
			} catch (loadError) {
				if (isMounted && loadError.name !== 'AbortError') {
					setError(loadError.message || 'Kategori gagal dimuat.');
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		loadCategories();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const removeCategory = useCallback(async (category) => {
		if (!window.confirm(`Hapus kategori "${category.nama_kategori}"?`)) return;
		try {
			await deleteArticleCategory(category.id_category);
			setKategori((current) => current.filter((item) => item.id_category !== category.id_category));
		} catch (deleteError) {
			setError(deleteError.message || 'Kategori gagal dihapus.');
		}
	}, []);

	const columns = useMemo(
		() => KelolaKategoriColumns(removeCategory, isDemoData),
		[isDemoData, removeCategory],
	);

	return (
		<DashboardLayout>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">Kelola Kategori</h2>
					<p className="mt-1 text-sm text-gray-500">Pengelolaan kategori artikel edukasi di lingkungan kampus.</p>
				</div>
				<Link to="/dashboard/kategori/tambah" className="flex items-center rounded-xl bg-[#0B3C65] px-4 py-3 text-sm font-medium text-white hover:bg-[#0A2E4D]">
					<Icon name="plus-lg" className="mr-2" /> Tambah Kategori Baru
				</Link>
			</div>

			{isDemoData && (
				<p role={error ? 'alert' : 'status'} className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
					{error ? `API belum tersedia (${error}). Menampilkan data demo; perubahan tidak tersimpan ke server.` : 'Menampilkan data demo sambil mencoba memuat API.'}
				</p>
			)}
			{error && !isDemoData && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
			{loading && <p role="status" className="mb-3 text-xs text-slate-500">Menyinkronkan data kategori...</p>}
			<DataTable
				data={kategori}
				columns={columns}
				pageSizeOptions={[5, 10, 25, 50, 100]}
				searchPlaceholder="Cari nama kategori"
				infoLabel="kategori"
				emptyMessage="Tidak ada kategori yang ditemukan."
			/>
		</DashboardLayout>
	);
}
