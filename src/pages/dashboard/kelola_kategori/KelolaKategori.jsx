import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import KelolaKategoriColumns from './KelolaKategoriColumns';
import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon';
import { getCategories, INITIAL_CATEGORIES } from '../../../services/categoryService.js';

export default function KelolaKategori() {
	const [categories, setCategories] = useState(INITIAL_CATEGORIES);

	const columns = useMemo(() => KelolaKategoriColumns(), []);

	useEffect(() => {
		getCategories()
			.then(setCategories)
			.catch((error) => console.error('Gagal memuat daftar kategori.', error));
	}, []);

	return (
		<DashboardLayout>
			{/* Top Header */}
			<div className="flex flex-wrap items-center justify-between mb-6">
				<div className="mb-6 lg:mb-0">
					<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Kelola Kategori</h2>
					<p className="text-sm text-gray-500 mt-1">Pengelolaan kategori kasus di lingkungan kampus.</p>
				</div>
					<Link to="/dashboard/kategori/tambah" className="flex items-center px-4 py-3 bg-[#0B3C65] text-white rounded-xl text-sm font-medium hover:bg-[#0A2E4D] transition-colors">
						<Icon name="plus-lg" className="me-2" /> Tambah Kategori Baru
					</Link>
			</div>

			<DataTable
				data={categories}
				columns={columns}
				pageSizeOptions={[5, 10, 25, 50, 100]}
				searchPlaceholder="Cari nama kategori"
				infoLabel="kategori"
				emptyMessage="Tidak ada kategori yang ditemukan."
			/>
		</DashboardLayout>
	);
}