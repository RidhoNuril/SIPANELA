import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import SurveyKepuasanColumns from './SurveyKepuasanColumns';

const SURVEY_REPORTS = [
	{
		idTiket: '#SPN-2026-089',
		kategori: 'Dugaan Narkotika',
		tanggal: '24 Okt 2024',
		waktu: '21:15 WIB',
		sudahDiisi: false,
	},
	{
		idTiket: '#SPN-2026-088',
		kategori: 'Dugaan Narkotika',
		tanggal: '24 Okt 2024',
		waktu: '19:40 WIB',
		sudahDiisi: false,
	},
	{
		idTiket: '#SPN-2026-087',
		kategori: 'Transaksi Obat',
		tanggal: '23 Okt 2024',
		waktu: '14:10 WIB',
		sudahDiisi: true,
	},
	{
		idTiket: '#SPN-2026-086',
		kategori: 'Transaksi Obat',
		tanggal: '22 Okt 2024',
		waktu: '22:50 WIB',
		sudahDiisi: false,
	},
	{
		idTiket: '#SPN-2026-085',
		kategori: 'Pemakai / Zat Adiktif',
		tanggal: '21 Okt 2024',
		waktu: '08:30 WIB',
		sudahDiisi: false,
	},
];

export default function SurveyKepuasan() {
	const [surveys] = useState(SURVEY_REPORTS);
	const columns = useMemo(() => SurveyKepuasanColumns(), []);

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">
						Survei Kepuasan Layanan
					</h2>
					<p className="mt-1 text-xs text-[#8292a5]">
						Evaluasi dan permintaan riwayat pengisian survei kepuasan penanganan laporan kampus.
					</p>
				</div>

				<DataTable
					data={surveys}
					columns={columns}
					initialPageSize={5}
					infoLabel="riwayat laporan"
					emptyMessage="Tidak ada data survei yang ditemukan."
				/>
			</div>
		</DashboardLayout>
	);
}