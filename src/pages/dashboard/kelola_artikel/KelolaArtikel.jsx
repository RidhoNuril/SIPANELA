import { useState, useMemo } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import KelolaArtikelColumns from './KelolaArtikelColumns';
import { Link } from 'react-router-dom';
import { initialArtikel } from './KelolaArtikelColumns';


export default function KelolaArtikel() {
	const [activeCategory, setActiveCategory] = useState('Semua Artikel');
	const categories = ['Semua Artikel', 'Siaran Pers BNN', 'Edukasi Narkotika', 'Sosialisasi Kampus', 'Draf'];

	const filteredData = useMemo(() => {
		if (activeCategory === 'Semua Artikel') {
			return initialArtikel;
		}
		return initialArtikel.filter((item) => item.kategori === activeCategory);
	}, [activeCategory]);

	const columns = useMemo(() => KelolaArtikelColumns(filteredData), [filteredData]);

	return (
		<DashboardLayout>
			{/* Top Header */}
			<div className="flex flex-wrap items-center justify-between mb-6">
				<div className="mb-6 lg:mb-0">
					<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Kelola Artikel</h2>
					<p className="text-sm text-gray-500 mt-1">Pengelolaan artikel edukasi di lingkungan kampus.</p>
				</div>
					<Link to="/dashboard/artikel/tambah" className="px-4 py-3 bg-[#0B3C65] text-white rounded-xl text-sm font-medium hover:bg-[#0A2E4D] transition-colors">
						<i className="bi bi-plus-lg me-2"></i> Tambah Artikel Baru
					</Link>
			</div>

			{/* Metric Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{/* Card 1 */}
					<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
						<div className="flex justify-between items-start">
							<span className="text-xs font-bold text-gray-400 tracking-wider">TOTAL ARTIKEL TERBIT</span>
							<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
								<i className="bi bi-box-arrow-in-down"></i>
							</div>
						</div>
						<div className="mt-6">
							<span className="text-4xl font-semibold text-[#0B3C65]">12</span>
						</div>
					</div>

					{/* Card 2 */}
					<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
						<div className="flex justify-between items-start">
							<span className="text-xs font-bold text-gray-400 tracking-wider">DRAF ARTIKEL</span>
							<div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
								<i className="bi bi-check-circle-fill"></i>
							</div>
						</div>
						<div className="mt-6">
							<span className="text-4xl font-semibold text-[#0B3C65]">40</span>
						</div>
					</div>

					{/* Card 3 */}
					<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
						<div className="flex justify-between items-start">
							<span className="text-xs font-bold text-gray-400 tracking-wider">KATEGORI EDUKASI</span>
							<div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
								<i className="bi bi-exclamation-triangle-fill"></i>
							</div>
						</div>
						<div className="mt-6">
							<span className="text-4xl font-semibold text-[#0B3C65]">30</span>
						</div>
					</div>
				</div>

			{/* Category Filter Pills */}
			<div className="flex flex-wrap items-center gap-2 mb-6">
				{categories.map((cat) => (
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