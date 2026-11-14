import { useCallback, useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import LaporanMasukColumns from './LaporanMasukColumns';
import VerifikasiOverlay from './VerifikasiOverlay';
import { getReports, updateReport, deleteReport } from '../../../services/reportService.js';
import { getReportTypes } from '../../../services/reportTypeService.js';
import { createReportVerification } from '../../../services/reportVerificationService.js';
import { demoReportTypes, demoReports } from '../../../data/demoData.js';

function unwrapItems(response, label) {
	const items = Array.isArray(response) ? response : response?.data;
	if (!Array.isArray(items)) {
		throw new Error(`Respons ${label} harus berupa array atau memiliki properti data berbentuk array.`);
	}
	return items;
}

function getCurrentUserId() {
	const savedUser = localStorage.getItem('user');
	if (!savedUser) return null;

	try {
		return JSON.parse(savedUser)?.id_user ?? null;
	} catch {
		return null;
	}
}

export default function LaporanMasuk() {
	const [laporan, setLaporan] = useState(demoReports.map((report) => ({
		...report,
		idTiket: `#SPN-${report.id_laporan}`,
		pelapor: report.is_anonymous ? 'Anonim' : report.user?.nama ?? report.id_user ?? '—',
		kategori: report.jenis_laporan?.nama_jenis ?? '—',
		lokasi: report.lokasi_kejadian,
		waktu: report.waktu_kejadian ? new Date(report.waktu_kejadian).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }) : '—',
		status: report.status === 'Ditolak' ? 'Di Tolak' : report.status,
		raw: report,
	})));
	const [reportTypes, setReportTypes] = useState(demoReportTypes);
	const [isDemoData, setIsDemoData] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [activeCategory, setActiveCategory] = useState('Semua Kategori');
	const [selectedReport, setSelectedReport] = useState(null);
	const [savingVerification, setSavingVerification] = useState(false);
	const [pendingVerificationUpdate, setPendingVerificationUpdate] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		let isMounted = true;

		async function loadReports() {
			setLoading(true);
			setError('');
			try {
				const [reportsResponse, typesResponse] = await Promise.all([
					getReports({ signal: controller.signal }),
					getReportTypes({ signal: controller.signal }),
				]);
				const reportRows = unwrapItems(reportsResponse, 'laporan');
				const typeRows = unwrapItems(typesResponse, 'jenis laporan');
				const typeNames = new Map(typeRows.map((type) => [String(type.id_jenis), type.nama_jenis]));
				if (isMounted) {
					setReportTypes(typeRows);
					setLaporan(reportRows.map((report) => ({
						...report,
						idTiket: `#SPN-${report.id_laporan}`,
						pelapor: report.is_anonymous ? 'Anonim' : report.user?.nama ?? report.id_user ?? '—',
						kategori: typeNames.get(String(report.id_jenis)) ?? report.jenis_laporan?.nama_jenis ?? '—',
						lokasi: report.lokasi_kejadian,
						waktu: report.waktu_kejadian ? new Date(report.waktu_kejadian).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }) : '—',
						status: report.status === 'Ditolak' ? 'Di Tolak' : report.status,
						raw: report,
					})));
					setIsDemoData(false);
				}
			} catch (loadError) {
				if (isMounted && loadError.name !== 'AbortError') {
					setError(loadError.message || 'Laporan gagal dimuat.');
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		loadReports();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const categories = useMemo(
		() => ['Semua Kategori', ...reportTypes.map((type) => type.nama_jenis)],
		[reportTypes],
	);

	const filteredData = useMemo(() => {
		if (activeCategory === 'Semua Kategori') {
			return laporan;
		}
		return laporan.filter((item) => item.kategori === activeCategory);
	}, [activeCategory, laporan]);

	const removeReport = useCallback(async (report) => {
		if (!window.confirm(`Hapus laporan ${report.idTiket}?`)) return;
		const controller = new AbortController();
		setError('');
		try {
			await deleteReport(report.id_laporan, { signal: controller.signal });
			setLaporan((current) => current.filter((item) => item.id_laporan !== report.id_laporan));
		} catch (deleteError) {
			if (deleteError.name !== 'AbortError') {
				setError(deleteError.message || 'Laporan gagal dihapus.');
			}
		}
	}, []);

	const columns = useMemo(
		() => LaporanMasukColumns((report) => setSelectedReport(report), removeReport, isDemoData),
		[isDemoData, removeReport],
	);

	const saveVerification = async (report, updates) => {
		const controller = new AbortController();
		let verificationSaved = pendingVerificationUpdate?.reportId === report.id_laporan;
		setSavingVerification(true);
		setError('');
		try {
			const pending = pendingVerificationUpdate?.reportId === report.id_laporan
				? pendingVerificationUpdate
				: null;
			const effectiveUpdates = pending?.updates ?? updates;
			const status = effectiveUpdates.status === 'Di Tolak' ? 'Ditolak' : effectiveUpdates.status;
			if (!pending) {
				const idUser = getCurrentUserId();
				if (!idUser) {
					throw new Error('Sesi pengguna tidak ditemukan. Silakan masuk kembali sebelum memverifikasi laporan.');
				}

				await createReportVerification({
					id_laporan: report.id_laporan,
					id_user: idUser,
					status_verifikasi: status,
					catatan: effectiveUpdates.catatan,
					tanggal_verifikasi: new Date().toISOString(),
				}, { signal: controller.signal });
				verificationSaved = true;
				setPendingVerificationUpdate({ reportId: report.id_laporan, updates: effectiveUpdates });
			}

			await updateReport(report.id_laporan, {
				...report.raw,
				status,
			}, { signal: controller.signal });
			setLaporan((currentReports) => currentReports.map((item) => (
				item.id_laporan === report.id_laporan ? { ...item, ...effectiveUpdates } : item
			)));
			setPendingVerificationUpdate(null);
			setSelectedReport(null);
		} catch (saveError) {
			if (saveError.name !== 'AbortError') {
				const message = verificationSaved
					? `Catatan verifikasi tersimpan, tetapi status laporan gagal diperbarui: ${saveError.message}`
					: saveError.message || 'Verifikasi laporan gagal disimpan.';
				setError(message);
			}
		} finally {
			setSavingVerification(false);
		}
	};

	return (
		<DashboardLayout>
			{/* Top Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Laporan Masuk</h2>
				<p className="text-sm text-gray-500 mt-1">Pemantauan laporan di lingkungan kampus.</p>
			</div>
			{isDemoData && (
				<p role={error ? 'alert' : 'status'} className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
					{error ? `API belum tersedia (${error}). Menampilkan data demo; verifikasi dan perubahan tidak tersimpan ke server.` : 'Menampilkan data demo sambil mencoba memuat API.'}
				</p>
			)}
			{error && !isDemoData && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

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

			{loading && <p role="status" className="mb-3 text-xs text-slate-500">Menyinkronkan data laporan...</p>}
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
					saving={savingVerification}
					errorMessage={error}
				/>
			)}
		</DashboardLayout>
	);
}
