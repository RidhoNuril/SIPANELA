import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import LaporanMasukColumns from './LaporanMasukColumns';
import VerifikasiOverlay from './VerifikasiOverlay';

const initialLaporan = [
	{
		idTiket: '#SPN-2026-089',
		pelapor: 'Anonim (Mahasiswa)',
		kategori: 'Dugaan Narkotika',
		lokasi: 'Area Parkir Belakang Gedung Sakura',
		waktu: '24 Okt 2024, 21:15 WIB',
		status: 'Selesai',
	},
	{
		idTiket: '#SPN-2026-088',
		pelapor: 'Anonim (Tendik)',
		kategori: 'Dugaan Narkotika',
		lokasi: 'Gazebo SFS',
		waktu: '24 Okt 2024, 19:40 WIB',
		status: 'Investigasi',
	},
	{
		idTiket: '#SPN-2026-087',
		pelapor: 'Anonim (Mahasiswa)',
		kategori: 'Transaksi Obat',
		lokasi: 'Sekitar Kantin GKB',
		waktu: '23 Okt 2024, 14:10 WIB',
		status: 'Verifikasi',
	},
	{
		idTiket: '#SPN-2026-086',
		pelapor: 'Petugas Keamanan',
		kategori: 'Transaksi Obat',
		lokasi: 'Lahan Peternakan Politeknik',
		waktu: '22 Okt 2024, 22:50 WIB',
		status: 'Menunggu',
	},
	{
		idTiket: '#SPN-2026-085',
		pelapor: 'Anonim (Warga Kampus)',
		kategori: 'Pemakai',
		lokasi: 'Lobi Gedung Direktorat Lt. 1',
		waktu: '21 Okt 2024, 08:30 WIB',
		status: 'Di Tolak',
	},
	{
		idTiket: '#SPN-2026-084',
		pelapor: 'Mahasiswa A',
		kategori: 'Transaksi Obat',
		lokasi: 'Koridor Gedung Kuliah Bersama',
		waktu: '20 Okt 2024, 10:00 WIB',
		status: 'Selesai',
	},
	{
		idTiket: '#SPN-2026-083',
		pelapor: 'Dosen B',
		kategori: 'Zat Adiktif Lainnya',
		lokasi: 'Kantin Fakultas Teknik',
		waktu: '19 Okt 2024, 13:20 WIB',
		status: 'Investigasi',
	},
];

export default function LaporanMasuk() {
	const [laporan, setLaporan] = useState(initialLaporan);
	const [activeCategory, setActiveCategory] = useState('Semua Kategori');
	const [selectedReport, setSelectedReport] = useState(null);
	const categories = ['Semua Kategori', 'Transaksi Obat', 'Pemakai', 'Zat Adiktif Lainnya', 'Dugaan Narkotika'];

	const filteredData = useMemo(() => {
		if (activeCategory === 'Semua Kategori') {
			return laporan;
		}
		return laporan.filter((item) => item.kategori === activeCategory);
	}, [activeCategory, laporan]);

	const columns = useMemo(
		() => LaporanMasukColumns((report) => setSelectedReport(report)),
		[],
	);

	const saveVerification = (report, updates) => {
		setLaporan((currentReports) =>
			currentReports.map((item) =>
				item.idTiket === report.idTiket ? { ...item, ...updates } : item,
			),
		);
		setSelectedReport(null);
	};

	return (
		<DashboardLayout>
			{/* Top Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Laporan Masuk</h2>
				<p className="text-sm text-gray-500 mt-1">Pemantauan laporan di lingkungan kampus.</p>
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
				searchPlaceholder="Cari nama atau id tiket pelapor"
				infoLabel="laporan masuk"
				emptyMessage="Tidak ada laporan yang ditemukan."
			/>
			{selectedReport && (
				<VerifikasiOverlay
					report={selectedReport}
					onClose={() => setSelectedReport(null)}
					onSave={saveVerification}
				/>
			)}
		</DashboardLayout>
	);
}
