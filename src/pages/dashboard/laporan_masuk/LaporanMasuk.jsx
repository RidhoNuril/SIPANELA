import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import LaporanMasukColumns from './LaporanMasukColumns';
import {
	getIncomingReports,
	getReportFilterCategories,
	INITIAL_REPORTS,
	REPORT_FILTER_CATEGORIES,
} from '../../../services/reportService.js';

export default function LaporanMasuk() {
	const location = useLocation();
	const navigate = useNavigate();
	const updatedReport = location.state?.updatedReport;
	const [laporan, setLaporan] = useState(INITIAL_REPORTS);
	const [activeCategory, setActiveCategory] = useState('Semua Kategori');
	const [categories, setCategories] = useState(REPORT_FILTER_CATEGORIES);

	useEffect(() => {
		Promise.all([getIncomingReports(), getReportFilterCategories()])
			.then(([reports, reportCategories]) => {
				setLaporan(
					updatedReport
						? reports.map((item) =>
								item.idTiket === updatedReport.idTiket ? updatedReport : item,
							)
						: reports,
				);
				setCategories(reportCategories);
			})
			.catch((error) => console.error('Gagal memuat laporan masuk.', error));
	}, [updatedReport]);

	const filteredData = useMemo(() => {
		if (activeCategory === 'Semua Kategori') {
			return laporan;
		}
		return laporan.filter((item) => item.kategori === activeCategory);
	}, [activeCategory, laporan]);

	const columns = useMemo(
		() =>
			LaporanMasukColumns((report) =>
				navigate(`/dashboard/laporan/${encodeURIComponent(report.idTiket)}`, {
					state: { report },
				}),
			),
		[navigate],
	);

	return (
		<DashboardLayout>
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Laporan Masuk</h2>
				<p className="text-sm text-gray-500 mt-1">Pemantauan laporan di lingkungan kampus.</p>
			</div>

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
				searchPlaceholder="Cari nama atau id tiket pelapor"
				infoLabel="laporan masuk"
				emptyMessage="Tidak ada laporan yang ditemukan."
			/>
		</DashboardLayout>
	);
}
