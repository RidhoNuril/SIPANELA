import { useMemo } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import KelolaKategoriColumns from './KelolaKategoriColumns';
import { Link } from 'react-router-dom';
import { initialKategori } from './KelolaKategoriColumns';

export default function KelolaKategori() {

	const columns = useMemo(() => KelolaKategoriColumns(), []);

	return (
		<DashboardLayout>
			{/* Top Header */}
			<div className="flex flex-wrap items-center justify-between mb-6">
				<div className="mb-6 lg:mb-0">
					<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Kelola Kategori</h2>
					<p className="text-sm text-gray-500 mt-1">Pengelolaan kategori kasus di lingkungan kampus.</p>
				</div>
					<Link to="/dashboard/kategori/tambah" className="px-4 py-3 bg-[#0B3C65] text-white rounded-xl text-sm font-medium hover:bg-[#0A2E4D] transition-colors">
						<i className="bi bi-plus-lg me-2"></i> Tambah Kategori Baru
					</Link>
			</div>

			<DataTable
				data={initialKategori}
				columns={columns}
				pageSizeOptions={[5, 10, 25, 50, 100]}
				searchPlaceholder="Cari nama kategori"
				infoLabel="kategori"
				emptyMessage="Tidak ada kategori yang ditemukan."
			/>
		</DashboardLayout>
	);
}