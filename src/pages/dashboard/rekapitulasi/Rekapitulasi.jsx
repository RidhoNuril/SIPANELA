import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout.jsx';
import DataTable from '../../../components/common/DataTable.jsx';
import Icon from '../../../components/common/Icon.jsx';
import RekapitulasiColumns from './RekapitulasiColumns.jsx';
import { getReports } from '../../../services/reportService.js';
import { getReportTypes } from '../../../services/reportTypeService.js';
import { demoReportTypes, demoReports } from '../../../data/demoData.js';

function unwrapItems(response, label) {
	const items = Array.isArray(response) ? response : response?.data;
	if (!Array.isArray(items)) {
		throw new Error(`Respons ${label} harus berupa array atau memiliki properti data berbentuk array.`);
	}
	return items;
}

export default function Rekapitulasi() {
	const [reports, setReports] = useState(demoReports);
	const [reportTypes, setReportTypes] = useState(demoReportTypes);
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [activeFilters, setActiveFilters] = useState({ year: '', month: '' });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isDemoData, setIsDemoData] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		let isMounted = true;

		async function loadData() {
			try {
				const [reportsResponse, typesResponse] = await Promise.all([
					getReports({ signal: controller.signal }),
					getReportTypes({ signal: controller.signal }),
				]);
				const reportRows = unwrapItems(reportsResponse, 'laporan');
				const typeRows = unwrapItems(typesResponse, 'jenis laporan');
				if (isMounted) {
					setReports(reportRows);
					setReportTypes(typeRows);
					setIsDemoData(false);
				}
			} catch (loadError) {
				if (isMounted && loadError.name !== 'AbortError') {
					setError(loadError.message || 'Rekapitulasi laporan gagal dimuat.');
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

	const rows = useMemo(() => {
		const typeNames = new Map(reportTypes.map((type) => [String(type.id_jenis), type.nama_jenis]));
		return reports.map((report) => ({
			...report,
			jenis_laporan: typeNames.get(String(report.id_jenis)) ?? report.jenis_laporan?.nama_jenis ?? '—',
		}));
	}, [reports, reportTypes]);

	const years = useMemo(() => [...new Set(rows
		.map((report) => report.tanggal_laporan && new Date(report.tanggal_laporan).getFullYear())
		.filter(Boolean))]
		.sort((first, second) => second - first), [rows]);

	const months = useMemo(() => [...new Set(rows
		.map((report) => report.tanggal_laporan && new Date(report.tanggal_laporan).getMonth() + 1)
		.filter(Boolean))]
		.sort((first, second) => first - second), [rows]);

	const filteredReports = useMemo(() => rows.filter((report) => {
		if (!report.tanggal_laporan) return !activeFilters.year && !activeFilters.month;
		const date = new Date(report.tanggal_laporan);
		const matchesYear = !activeFilters.year || date.getFullYear() === Number(activeFilters.year);
		const matchesMonth = !activeFilters.month || date.getMonth() + 1 === Number(activeFilters.month);
		return matchesYear && matchesMonth;
	}), [activeFilters, rows]);

	const columns = useMemo(() => RekapitulasiColumns(), []);
	const monthName = (value) => new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(2026, value - 1, 1));

	function applyFilters() {
		setActiveFilters({ year, month });
	}

	function resetFilters() {
		setYear('');
		setMonth('');
		setActiveFilters({ year: '', month: '' });
	}

	const field = (label, value, setter, options, emptyLabel) => (
		<label className="block flex-1">
			<span className="mb-2 block text-[11px] font-bold text-[#44556b]">{label}</span>
			<div className="relative">
				<select value={value} onChange={(event) => setter(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-[#53647a] outline-none focus:border-[#0B3C65]">
					<option value="">{emptyLabel}</option>
					{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
				</select>
				<Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400" />
			</div>
		</label>
	);

	return (
		<DashboardLayout>
			<div className="space-y-5">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">Rekapitulasi</h2>
					<p className="mt-1 text-xs text-[#8292a5]">Rekap laporan yang tercatat melalui API SIPANELA.</p>
				</div>
				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="grid gap-4 md:grid-cols-2">
						{field('Periode Tahun', year, setYear, years.map((value) => ({ value, label: String(value) })), 'Semua tahun')}
						{field('Periode Bulan', month, setMonth, months.map((value) => ({ value, label: monthName(value) })), 'Semua bulan')}
					</div>
					<div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-[10px] text-[#8292a5] sm:flex-row sm:items-center sm:justify-between">
						<span className="flex items-center"><Icon name="info-circle" className="mr-2 text-[#0B3C65]" />Menampilkan {filteredReports.length} laporan sesuai filter aktif.</span>
						<div className="flex items-center gap-4">
							<button type="button" onClick={resetFilters} className="font-semibold text-[#53647a] hover:text-[#0B3C65]">Reset Filter</button>
							<button type="button" onClick={applyFilters} className="flex items-center rounded-lg bg-[#0B3C65] px-4 py-2 font-semibold text-white hover:bg-[#092f50]">
								<Icon name="filter" className="mr-1" /> Terapkan Filter
							</button>
						</div>
					</div>
				</section>

				{isDemoData && (
					<p role={error ? 'alert' : 'status'} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
						{error ? `API belum tersedia (${error}). Rekap di bawah berisi data demo.` : 'Menampilkan data demo sambil mencoba memuat API.'}
					</p>
				)}
				{error && !isDemoData && <p role="alert" className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
				{loading && <p role="status" className="text-xs text-slate-500">Menyinkronkan rekapitulasi...</p>}
				<DataTable
					data={filteredReports}
					columns={columns}
					pageSizeOptions={[5, 10, 25, 50]}
					searchPlaceholder="Cari ID, lokasi, atau jenis laporan"
					infoLabel="laporan"
					emptyMessage="Tidak ada laporan untuk periode ini."
				/>
			</div>
		</DashboardLayout>
	);
}
