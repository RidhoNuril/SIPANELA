import { useCallback, useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout.jsx';
import DataTable from '../../../components/common/DataTable.jsx';
import KelolaArtikelColumns from './KelolaArtikelColumns.jsx';
import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon.jsx';
import { demoArticleCategories, demoArticles } from '../../../data/demoData.js';
import { getArticles, deleteArticle } from '../../../services/articleService.js';
import { getArticleCategories } from '../../../services/articleCategoryService.js';

export default function KelolaArtikel() {
	const [activeCategory, setActiveCategory] = useState('Semua Artikel');
	const [articles, setArticles] = useState(demoArticles);
	const [categories, setCategories] = useState(demoArticleCategories);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isDemoData, setIsDemoData] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let isMounted = true;

		async function loadData() {
			setLoading(true);
			setError('');
			try {
				const [articleResponse, categoryResponse] = await Promise.all([
					getArticles({ signal: controller.signal }),
					getArticleCategories({ signal: controller.signal }),
				]);
				const articleRows = Array.isArray(articleResponse) ? articleResponse : articleResponse?.data;
				const categoryRows = Array.isArray(categoryResponse) ? categoryResponse : categoryResponse?.data;
				if (!Array.isArray(articleRows) || !Array.isArray(categoryRows)) {
					throw new Error('Respons artikel dan kategori harus berupa array atau memiliki properti data berbentuk array.');
				}
				if (isMounted) {
					setArticles(articleRows);
					setCategories(categoryRows);
					setIsDemoData(false);
				}
			} catch (loadError) {
				if (isMounted && loadError.name !== 'AbortError') {
					setError(loadError.message || 'Artikel gagal dimuat.');
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		loadData();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const categoryNameById = useMemo(
		() => new Map(categories.map((category) => [String(category.id_category), category.nama_kategori])),
		[categories],
	);
	const displayedArticles = useMemo(() => articles.map((article) => ({
		...article,
		id: article.id_artikel,
		image: article.file_foto,
		kategori: categoryNameById.get(String(article.id_category)) ?? article.kategori?.nama_kategori ?? '—',
		status: article.is_public ? 'Diterbitkan' : 'Draf',
		penulis: article.penulis?.nama ?? article.user?.nama ?? article.id_user ?? '—',
	})), [articles, categoryNameById]);
	const filteredData = useMemo(() => {
		if (activeCategory === 'Semua Artikel') return displayedArticles;
		if (activeCategory === 'Draf') return displayedArticles.filter((item) => item.status === 'Draf');
		return displayedArticles.filter((item) => item.kategori === activeCategory);
	}, [activeCategory, displayedArticles]);

	const removeArticle = useCallback(async (article) => {
		if (!window.confirm(`Hapus artikel "${article.judul}"?`)) return;
		try {
			await deleteArticle(article.id_artikel);
			setArticles((current) => current.filter((item) => item.id_artikel !== article.id_artikel));
		} catch (deleteError) {
			setError(deleteError.message || 'Artikel gagal dihapus.');
		}
	}, []);
	const columns = useMemo(
		() => KelolaArtikelColumns(removeArticle, isDemoData),
		[isDemoData, removeArticle],
	);
	const categoryFilters = ['Semua Artikel', ...categories.map((category) => category.nama_kategori), 'Draf'];

	return (
		<DashboardLayout>
			{/* Top Header */}
			<div className="flex flex-wrap items-center justify-between mb-6">
				<div className="mb-6 lg:mb-0">
					<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Kelola Artikel</h2>
					<p className="text-sm text-gray-500 mt-1">Pengelolaan artikel edukasi di lingkungan kampus.</p>
				</div>
					<Link to="/dashboard/artikel/tambah" className="flex items-center px-4 py-3 bg-[#0B3C65] text-white rounded-xl text-sm font-medium hover:bg-[#0A2E4D] transition-colors">
						<Icon name="plus-lg" className="me-2" /> Tambah Artikel Baru
					</Link>
			</div>

			{/* Category Filter Pills */}
			<div className="flex flex-wrap items-center gap-2 mb-6">
				{categoryFilters.map((cat) => (
					<button
						key={cat}
						onClick={() => setActiveCategory(cat)}
						className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat
								? 'bg-[#0B3C65] text-white shadow-xs'
								: 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
							}`}
					>
						{cat}
					</button>
				))}
			</div>

			{isDemoData && (
				<p role={error ? 'alert' : 'status'} className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
					{error ? `API belum tersedia (${error}). Menampilkan data demo; perubahan tidak tersimpan ke server.` : 'Menampilkan data demo sambil mencoba memuat API.'}
				</p>
			)}
			{error && !isDemoData && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
			{loading && <p role="status" className="mb-3 text-xs text-slate-500">Menyinkronkan data artikel...</p>}
			<DataTable
				data={filteredData}
				columns={columns}
				pageSizeOptions={[5, 10, 25, 50, 100]}
				searchPlaceholder="Cari judul atau penulis"
				infoLabel="artikel"
				emptyMessage="Tidak ada artikel yang ditemukan."
			/>
		</DashboardLayout>
	);
}