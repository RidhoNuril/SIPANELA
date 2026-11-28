import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/common/Icon';
import DashboardLayout from '../../../components/common/DashboardLayout';
import { getIncomingReports, updateReport } from '../../../services/reportService.js';

const reportStatuses = ['Menunggu', 'Verifikasi', 'Investigasi', 'Selesai', 'Di Tolak'];

const statusDescriptions = {
	Menunggu: 'Registrasi aduan baru',
	Verifikasi: 'Uji validitas bukti',
	Investigasi: 'Disposisi tim lapangan',
	Selesai: 'Kasus dituntaskan',
	'Di Tolak': 'Laporan tidak valid',
};

function ReadOnlyField({ label, value, icon, trailing }) {
	return (
		<div>
			<p className="mb-1.5 text-[11px] font-semibold text-[#163B5B]">{label}</p>
			<div className="flex min-h-10 items-center justify-between gap-2 rounded-lg bg-[#EFF5FF] px-3 py-2 text-xs text-slate-700">
				<span className="flex min-w-0 items-center gap-2">
					{icon && <Icon name={icon} className="shrink-0 text-slate-500" />}
					<span className="truncate">{value || 'Tidak tersedia'}</span>
				</span>
				{trailing && (
					<span className="shrink-0 rounded bg-white px-2 py-1 text-[10px] text-slate-500">
						{trailing}
					</span>
				)}
			</div>
		</div>
	);
}

function FormSectionTitle({ icon, title, description, trailing }) {
	return (
		<div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
			<div className="flex min-w-0 items-start gap-2">
				<span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#EFF5FF] text-[#0B3C65]">
					<Icon name={icon} />
				</span>
				<div>
					<h3 className="text-lg font-bold text-[#163B5B]">{title}</h3>
					{description && <p className="mt-0.5 text-[10px] text-slate-500">{description}</p>}
				</div>
			</div>
			{trailing}
		</div>
	);
}

export default function DetailLaporanMasuk() {
	const { ticketId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const routeReport = location.state?.report;
	const [report, setReport] = useState(
		routeReport?.idTiket === ticketId ? routeReport : null,
	);
	const [status, setStatus] = useState(routeReport?.status ?? 'Menunggu');
	const [petugas, setPetugas] = useState(routeReport?.petugas ?? '');
	const [detail, setDetail] = useState(routeReport?.detail ?? '');
	const [hasilAkhir, setHasilAkhir] = useState(routeReport?.hasilAkhir ?? '');
	const [lampiran, setLampiran] = useState(routeReport?.lampiran ?? null);
	const [loadedTicketId, setLoadedTicketId] = useState(
		routeReport?.idTiket === ticketId ? ticketId : null,
	);
	const isLoading = loadedTicketId !== ticketId;
	const [isSaving, setIsSaving] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const previewUrl = useMemo(() => {
		if (!lampiran) return '';
		return typeof lampiran === 'string' ? lampiran : URL.createObjectURL(lampiran);
	}, [lampiran]);

	useEffect(() => {
		if (routeReport?.idTiket === ticketId) {
			return;
		}

		let isActive = true;
		getIncomingReports()
			.then((reports) => {
				if (!isActive) return;
				const foundReport = reports.find((item) => item.idTiket === ticketId);
				if (!foundReport) {
					setErrorMessage('Laporan tidak ditemukan.');
					setLoadedTicketId(ticketId);
					return;
				}
				setReport(foundReport);
				setStatus(foundReport.status ?? 'Menunggu');
				setPetugas(foundReport.petugas ?? '');
				setDetail(foundReport.detail ?? '');
				setHasilAkhir(foundReport.hasilAkhir ?? '');
				setLampiran(foundReport.lampiran ?? null);
			})
			.catch((error) => {
				if (isActive) {
					console.error('Gagal memuat detail laporan.', error);
					setErrorMessage('Detail laporan gagal dimuat. Silakan coba kembali.');
					setLoadedTicketId(ticketId);
				}
			})
			.finally(() => {
				if (isActive) setLoadedTicketId(ticketId);
			});

		return () => {
			isActive = false;
		};
	}, [routeReport, ticketId]);

	useEffect(() => {
		if (!lampiran || typeof lampiran === 'string') return undefined;
		return () => URL.revokeObjectURL(previewUrl);
	}, [lampiran, previewUrl]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const updates = { status, petugas, detail, hasilAkhir };
		setIsSaving(true);
		setErrorMessage('');
		try {
			const savedReport = {
				...report,
				...updates,
				...(await updateReport(report.idTiket, updates)),
			};
			navigate('/dashboard/laporan', { state: { updatedReport: savedReport } });
		} catch (error) {
			console.error('Gagal menyimpan perubahan laporan.', error);
			setErrorMessage('Perubahan laporan gagal disimpan. Silakan coba kembali.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<DashboardLayout>
			{isLoading ? (
				<p className="text-sm text-slate-500">Memuat detail laporan...</p>
			) : !report ? (
				<div>
					<p role="alert" className="mb-4 text-sm text-rose-600">
						{errorMessage || 'Laporan tidak ditemukan.'}
					</p>
					<button
						type="button"
						onClick={() => navigate('/dashboard/laporan')}
						className="rounded-lg bg-[#0B3C65] px-4 py-2 text-xs font-semibold text-white"
					>
						Kembali ke Laporan Masuk
					</button>
				</div>
			) : (
			<>
			<header className="mb-5">
				<button
					type="button"
					onClick={() => navigate('/dashboard/laporan')}
					className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#0B3C65] hover:underline"
				>
					<Icon name="arrow-left-outline" />
					Kembali ke Laporan Masuk
				</button>
				<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">
					Edit Data Laporan Masuk
				</h2>
				<p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
					Perbarui dan sesuaikan rincian informasi laporan dugaan tindak penyalahgunaan atau
					peredaran di lingkungan kampus POLINELA.
				</p>
			</header>
			<form onSubmit={handleSubmit} className="w-full">
			{errorMessage && (
				<p role="alert" className="mb-4 text-xs font-medium text-rose-600">
					{errorMessage}
				</p>
			)}
			<div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)]">
				<section className="rounded-xl border-t-2 border-[#0B3C65] bg-white p-4 shadow-sm sm:p-5">
					<FormSectionTitle
						icon="clipboard2-check"
						title="Informasi Utama Laporan"
						description="Detail kronologi dan identitas pelapor terverifikasi"
						trailing={
							<span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
								Wajib Diisi *
							</span>
						}
					/>

					<div className="space-y-3">
						<ReadOnlyField label="ID Tiket Aduan" value={report.idTiket} icon="lock-keyhole" trailing="Terkunci" />
						<ReadOnlyField label="Identitas Pelapor" value={report.pelapor} />
						<div className="rounded-lg bg-[#EFF5FF] px-3 py-2 text-[10px] leading-relaxed text-slate-500">
							<Icon name="shield-check" className="mr-1.5 text-[#0B698B]" />
							Kerahasiaan data pelapor dilindungi dan undang-undang perlindungan saksi/pelapor internal POLINELA.
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<ReadOnlyField label="Kategori Dugaan Kasus" value={report.kategori} trailing="Terkunci" />
							<ReadOnlyField label="Waktu Pelaporan Masuk" value={report.waktu} icon="clock" />
						</div>

						<ReadOnlyField label="Lokasi Kejadian (Area Kampus)" value={report.lokasi} icon="geo-alt" />

						<label className="block">
							<span className="mb-1.5 block text-[11px] font-semibold text-[#163B5B]">
								Detail Kronologi Aduan
							</span>
							<textarea
								value={detail}
								onChange={(event) => setDetail(event.target.value)}
								rows={7}
								placeholder="Tuliskan detail kronologi aduan..."
								className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-xs leading-relaxed text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400"
							/>
						</label>
					</div>
				</section>

				<div className="space-y-4">
					<section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
						<FormSectionTitle
							icon="arrow-right-outline"
							title="Status Penanganan Laporan"
							description="Tahapan alur resolusi dan penugasan tim investigasi"
						/>

						<fieldset>
							<legend className="mb-2 text-[11px] font-semibold text-[#163B5B]">
								Ubah Status Tiket
							</legend>
							<div className="grid grid-cols-2 gap-2">
								{reportStatuses.map((reportStatus) => (
									<label
										key={reportStatus}
										className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 text-[10px] ${
											status === reportStatus
												? 'border-sky-200 bg-[#EFF5FF] text-[#163B5B]'
												: 'border-transparent bg-white text-slate-600'
										}`}
									>
										<input
											type="radio"
											name="report-status"
											value={reportStatus}
											checked={status === reportStatus}
											onChange={() => setStatus(reportStatus)}
											className="mt-0.5 accent-[#0B3C65]"
										/>
										<span>
											<span className="block font-semibold">{reportStatus}</span>
											<span className="mt-0.5 block text-slate-500">
												{statusDescriptions[reportStatus]}
											</span>
										</span>
									</label>
								))}
							</div>
						</fieldset>

						<label className="mt-4 block">
							<span className="mb-1.5 block text-[11px] font-semibold text-[#163B5B]">
								Petugas yang Ditugaskan <span className="text-rose-500">*</span>
							</span>
							<select
								value={petugas}
								onChange={(event) => setPetugas(event.target.value)}
								required
								className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none focus:border-sky-400"
							>
								<option value="">-- Pilih Petugas Satgas --</option>
								<option value="Satgas Anti Narkoba">Satgas Anti Narkoba</option>
							</select>
						</label>

						<label className="mt-4 block">
							<span className="mb-1.5 block text-[11px] font-semibold text-[#163B5B]">
								Hasil Akhir (Berita Acara)
							</span>
							<textarea
								value={hasilAkhir}
								onChange={(event) => setHasilAkhir(event.target.value)}
								rows={4}
								placeholder="Tuliskan hasil penanganan laporan..."
								className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-xs leading-relaxed text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400"
							/>
						</label>
					</section>

					<section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
						<FormSectionTitle
							icon="image"
							title="Lampiran Bukti Foto"
							description="Dokumentasi visual kejadian terunggah"
						/>
							<div className="overflow-hidden rounded-lg border border-slate-100">
								<img src={previewUrl ? previewUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNuVA_8s_RSw64TP8cOureZ-Hibw7FRRDlMvS8NMXTkUlCmXlJ5yAO46PC&s=10'} alt="Pratinjau lampiran bukti laporan" className="w-full object-contain bg-slate-50" />
							</div>
					</section>
				</div>
			</div>

			<footer className="mt-5 flex flex-wrap justify-end gap-2">
				<button
					type="button"
					onClick={() => navigate('/dashboard/laporan')}
					className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
				>
					Batal
				</button>
				<button
					type="submit"
					disabled={isSaving}
					className="flex items-center rounded-lg bg-[#0B3C65] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-60"
				>
					<Icon name="file-check" className="mr-1.5" />
					{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
				</button>
			</footer>
			</form>
		</>
		)}
		</DashboardLayout>
	);
}
