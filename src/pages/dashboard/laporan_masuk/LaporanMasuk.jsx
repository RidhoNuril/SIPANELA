import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import LaporanMasukColumns from './LaporanMasukColumns';

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

	const saveVerification = (report, status, note) => {
		setLaporan((currentReports) =>
			currentReports.map((item) =>
				item.idTiket === report.idTiket ? { ...item, status, catatan: note } : item,
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

const stages = [
	{
		title: 'Menunggu',
		description: 'Menunggu petugas memverifikasi laporan.',
	},
	{
		title: 'Verifikasi',
		description: 'Verifikasi kelengkapan bukti awal laporan.',
	},
	{
		title: 'Investigasi',
		description: 'Melakukan pengecekan langsung ke lapangan.',
	},
	{
		title: 'Selesai',
		description: 'Menentukan hasil akhir dari laporan.',
	},
];

const statusToStage = {
	Menunggu: 0,
	Verifikasi: 1,
	Investigasi: 2,
	Selesai: 3,
	'Di Tolak': 1,
};

function VerifikasiOverlay({ report, onClose, onSave }) {
	const currentStage = statusToStage[report.status] ?? 0;
	const isRejected = report.status === 'Di Tolak';
	const isComplete = report.status === 'Selesai' || isRejected;
	const [decision, setDecision] = useState(isRejected ? 'reject' : 'continue');
	const [continueNote, setContinueNote] = useState(report.catatan ?? '');
	const [rejectNote, setRejectNote] = useState('');

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	const handleSave = () => {
		const note = decision === 'reject' ? rejectNote : continueNote;
		const nextStatus = decision === 'reject'
			? 'Di Tolak'
			: stages[Math.min(currentStage + 1, stages.length - 1)].title;
		onSave(report, nextStatus, note);
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-[#07395f]/95 p-3 sm:p-6"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="verifikasi-title"
				className="flex max-h-[92vh] w-full max-w-165 flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
			>
				<header className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
					<div>
						<h2 id="verifikasi-title" className="text-lg font-bold tracking-tight text-[#0B3C65]">
							Verifikasi Penindakan
						</h2>
						<p className="mt-1 text-[10px] text-slate-500">
							<strong className="text-[#0B3C65]">{report.idTiket}</strong>
							<span className="mx-1.5">·</span>
							{report.pelapor}
							<span className="mx-1.5">·</span>
							{report.waktu}
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Tutup overlay verifikasi"
						className="ml-3 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
					>
						<i className="bi bi-x-lg text-xs" aria-hidden="true"></i>
					</button>
				</header>

				<div className="space-y-4 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5">
					<section className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-3.5">
						<h3 className="mb-3 border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C65]">
							<i className="bi bi-link-45deg mr-1.5 text-sm" aria-hidden="true"></i>
							Alur Prosedur &amp; Tahapan Penanganan BAP
						</h3>
						<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
							{stages.map((stage, index) => {
								const isPast = index < currentStage || (report.status === 'Selesai' && index === currentStage);
								const isActive = index === currentStage && !isComplete;
								const isCurrentFinished = index === currentStage && isComplete;

								return (
									<div
										key={stage.title}
										className={`min-h-25.5] rounded-lg border p-2.5 ${
											isActive
												? 'border-sky-500 bg-white shadow-[0_0_0_1px_rgba(14,165,233,0.12)]'
												: isPast || isCurrentFinished
													? 'border-emerald-200 bg-white'
													: 'border-slate-200 bg-slate-50 text-slate-400'
										}`}
									>
										<div className="mb-1.5 flex items-center justify-between">
											<span className="text-[8px] font-bold uppercase tracking-wide">
												Tahap {index + 1}{isActive ? ' •' : ''}
											</span>
											<span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] ${
												isPast || isCurrentFinished
													? 'bg-emerald-100 text-emerald-600'
													: isActive
														? 'bg-sky-100 text-sky-700'
														: 'bg-slate-200 text-slate-500'
											}`}>
												{isPast || isCurrentFinished
													? <i className="bi bi-check-lg" aria-hidden="true"></i>
													: index + 1}
											</span>
										</div>
										<p className="text-[10px] font-bold">{stage.title}</p>
										<p className="mt-1 text-[9px] leading-relaxed">{stage.description}</p>
										{isActive && (
											<p className="mt-2 border-t border-slate-100 pt-1.5 text-[8px] font-semibold text-sky-700">
												Sedang Diproses
											</p>
										)}
										{!isActive && index > currentStage && (
											<p className="mt-2 border-t border-slate-200 pt-1.5 text-[8px]">
												Menunggu Tahap {index}
											</p>
										)}
									</div>
								);
							})}
						</div>
					</section>

					<section>
						<h3 className="mb-2.5 text-[10px] font-bold uppercase tracking-wide text-[#0B3C65]">
							<i className="bi bi-clipboard2-check mr-1.5 text-sm" aria-hidden="true"></i>
							Riwayat Catatan
						</h3>
						<div className="rounded-xl border border-slate-200 p-3.5 sm:p-4">
							<div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-slate-700">
								<span className="rounded-md bg-emerald-100 px-2 py-1 text-[9px] text-emerald-700">
									Tahap {currentStage + 1}
								</span>
								{stages[currentStage].title}
								{isRejected && <span className="text-rose-600">· Laporan ditolak</span>}
							</div>

							{isComplete ? (
								<div className={`rounded-lg border p-3 text-xs ${
									isRejected
										? 'border-rose-200 bg-rose-50 text-rose-800'
										: 'border-emerald-200 bg-emerald-50 text-emerald-800'
								}`}>
									<p className="font-semibold">{isRejected ? 'Laporan Ditolak' : 'Penanganan Selesai'}</p>
									<p className="mt-1 text-[10px]">{report.catatan || 'Belum ada catatan pada tahap ini.'}</p>
								</div>
							) : (
								<div className="grid gap-2.5 md:grid-cols-2">
									<DecisionCard
										selected={decision === 'continue'}
										variant="continue"
										title="Opsi: Laporan Dilanjutkan"
										badge="Status Terpilih"
										note={continueNote}
										placeholder="Tambahkan catatan untuk melanjutkan laporan"
										onSelect={() => setDecision('continue')}
										onNoteChange={setContinueNote}
										nextStep={`Tindak lanjut: Masuk ke tahap ${Math.min(currentStage + 2, stages.length)} berikutnya`}
									/>
									<DecisionCard
										selected={decision === 'reject'}
										variant="reject"
										title="Opsi: Laporan Ditolak"
										badge="Opsi Penolakan"
										note={rejectNote}
										placeholder="Masukkan catatan penolakan"
										onSelect={() => setDecision('reject')}
										onNoteChange={setRejectNote}
										nextStep="Tindak lanjut: Laporan selesai dengan status ditolak"
									/>
								</div>
							)}

							<div className="mt-3 flex justify-end">
								{isComplete ? (
									<button
										type="button"
										onClick={onClose}
										className="rounded-lg bg-[#0B3C65] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-blue-900"
									>
										Tutup
									</button>
								) : (
									<button
										type="button"
										onClick={handleSave}
										className={`rounded-lg px-4 py-2 text-[10px] font-semibold text-white transition ${
											decision === 'reject'
												? 'bg-rose-600 hover:bg-rose-700'
												: 'bg-emerald-600 hover:bg-emerald-700'
										}`}
									>
										Simpan &amp; Lanjutkan
										<i className="bi bi-arrow-right ml-2" aria-hidden="true"></i>
									</button>
								)}
							</div>
						</div>
					</section>

					{stages.slice(currentStage + 1).map((stage, index) => (
						<div
							key={stage.title}
							className="flex items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-3.5 py-3 text-[10px] text-slate-400"
						>
							<div className="flex items-center gap-2">
								<span className="rounded-md bg-slate-200 px-2 py-1 text-[9px] font-semibold">
									Tahap {currentStage + index + 2} Terkunci
								</span>
								<span className="font-semibold text-slate-500">{stage.title}</span>
							</div>
							<span className="hidden items-center gap-1 sm:flex">
								<i className="bi bi-lock" aria-hidden="true"></i>
								Menunggu Penyelesaian Catatan Tahap {currentStage + index + 1}
							</span>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

function DecisionCard({
	selected,
	variant,
	title,
	badge,
	note,
	placeholder,
	onSelect,
	onNoteChange,
	nextStep,
}) {
	const isContinue = variant === 'continue';

	return (
		<div className={`rounded-lg border p-2.5 ${
			selected
				? isContinue
					? 'border-emerald-300 bg-emerald-50/40'
					: 'border-rose-300 bg-rose-50/40'
				: 'border-slate-200 bg-white'
		}`}>
			<div className="mb-2 flex items-center justify-between gap-2">
				<button
					type="button"
					onClick={onSelect}
					aria-pressed={selected}
					className={`flex min-w-0 items-center gap-1.5 text-left text-[9px] font-semibold ${
						isContinue ? 'text-slate-700' : 'text-slate-600'
					}`}
				>
					<span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
						selected ? (isContinue ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-slate-400'
					}`}></span>
					{title}
				</button>
				<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-medium ${
					selected
						? isContinue
							? 'bg-emerald-100 text-emerald-700'
							: 'bg-rose-100 text-rose-700'
						: 'bg-slate-100 text-slate-500'
				}`}>
					{badge}
				</span>
			</div>
			<textarea
				value={note}
				onChange={(event) => onNoteChange(event.target.value)}
				onFocus={onSelect}
				aria-label={`Catatan ${isContinue ? 'laporan dilanjutkan' : 'penolakan'}`}
				placeholder={placeholder}
				rows={2}
				className="w-full resize-none rounded-md border border-slate-100 bg-white px-2 py-2 text-[9px] italic text-slate-600 outline-none placeholder:text-slate-400 focus:border-sky-300"
			/>
			<p className={`mt-2 border-t pt-1.5 text-[8px] font-medium ${
				isContinue ? 'border-emerald-100 text-emerald-700' : 'border-slate-100 text-slate-500'
			}`}>
				{nextStep}
				<span className={`float-right ${isContinue ? 'text-emerald-700' : 'text-rose-600'}`}>
					{isContinue ? 'Pilih Verifikasi' : 'Pilih Ditolak'}
				</span>
			</p>
		</div>
	);
}
