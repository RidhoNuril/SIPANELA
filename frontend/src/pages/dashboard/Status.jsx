import DashboardLayout from '../../components/common/DashboardLayout';
import Icon from '../../components/common/Icon';

const stages = [
	{
		title: 'Menunggu',
		detail: 'Laporan Anda sudah diterima oleh satgas.',
		note: 'Disahkan ke sistem antrean terpusat',
		time: '14:15 WIB',
		state: 'complete',
	},
	{
		title: 'Diverifikasi',
		detail: 'Laporan sedang diverifikasi oleh satgas.',
		note: 'Satgas P4GN POLINELA sedang meneliti kesesuaian koordinat titik lokasi dan validasi material bukti foto yang dilampirkan sebelum pendelegasian regu penindak lapangan.',
		time: 'Sedang Berlangsung',
		state: 'current',
	},
	{
		title: 'Investigasi',
		detail: 'Satgas sedang melakukan investigasi lapangan.',
		note: 'Pemeriksaan langsung oleh petugas keamanan kampus + pendampingan pihak berwenang secara tertutup.',
		time: 'Tahap Lanjutan',
		state: 'upcoming',
	},
	{
		title: 'Selesai',
		detail: 'Laporan telah selesai ditangani.',
		note: 'Pemberian ringkasan berita acara penindakan dan perlindungan pelapor sampai tuntas.',
		time: 'Penyelesaian Kasus',
		state: 'upcoming',
	},
];

function ReportDetail({ icon, label, value }) {
	return (
		<div className="flex min-w-0 items-center gap-2.5">
			<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
				<Icon name={icon} size={17} />
			</span>
			<div className="min-w-0">
				<p className="text-[10px] text-slate-500">{label}</p>
				<p className="truncate text-[11px] font-semibold text-slate-700">{value}</p>
			</div>
		</div>
	);
}

export default function Status() {
	return (
		<DashboardLayout>
			<div className="w-full space-y-5">
				<header>
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">Status Laporan</h2>
					<p className="mt-1 text-xs text-slate-500">
						Pantau perkembangan dan tindak lanjut laporan dugaan insiden secara real-time
					</p>
				</header>

				<section className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="report-title">
					<div className="pointer-events-none absolute -right-5 -top-4 flex h-30 w-30 items-center justify-center rounded-full bg-blue-50 text-blue-100 sm:-right-4">
						<Icon name="shield-check" size={60} />
					</div>
					<div className="relative">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
							<div>
								<p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Kategori Laporan</p>
								<h1 id="report-title" className="mt-0.5 text-xl font-bold leading-tight text-slate-800 sm:text-2xl">
									Dugaan Transaksi Ilegal
								</h1>
							</div>
							<span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-800">
								<span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
								Sedang Diverifikasi
							</span>
						</div>
						<div className="mt-4 grid gap-4 border-t border-blue-100 pt-4 sm:grid-cols-3">
							<ReportDetail icon="calendar3" label="Waktu Masuk" value="24 Okt 2024, 14:15 WIB" />
							<ReportDetail icon="geo-alt" label="Lokasi Kejadian" value="Parkir Belakang Gd. Sakura" />
							<ReportDetail icon="lock-keyhole" label="Tingkat Kerahasiaan" value="Anonim Terenkripsi SHA-256" />
						</div>
					</div>
				</section>

				<div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
					<section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5" aria-labelledby="timeline-title">
						<div className="mb-5 flex flex-wrap items-start justify-between gap-3">
							<div className="flex items-center gap-2">
								<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B3C65] text-white">
									<Icon name="activity" size={17} />
								</span>
								<div>
									<h2 id="timeline-title" className="text-sm font-bold text-slate-800">Alur & Tahapan Penanganan</h2>
									<p className="text-[9px] text-slate-500">Pemutakhiran berkala langsung dari Satgas Pencegahan Polinela</p>
								</div>
							</div>
							<span className="rounded-md bg-blue-100 px-2 py-1 text-[9px] font-medium text-slate-500">Tahap 2 dari 4</span>
						</div>

						<ol className="space-y-0">
							{stages.map((stage, index) => {
								const isComplete = stage.state === 'complete';
								const isCurrent = stage.state === 'current';
								const markerClass = isComplete
									? 'bg-rose-500 text-white ring-4 ring-rose-100'
									: isCurrent
										? 'bg-amber-600 text-white ring-4 ring-amber-100'
										: 'bg-blue-100 text-slate-400 ring-4 ring-white';

								return (
									<li key={stage.title} className="relative flex gap-3 pb-5 last:pb-0 sm:gap-4">
										{index < stages.length - 1 && (
											<span className={`absolute bottom-0 left-2.75 top-6 w-px ${isComplete ? 'bg-rose-500' : 'bg-blue-100'}`} aria-hidden="true" />
										)}
										<span className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${markerClass}`}>
											{isComplete ? <Icon name="check" size={15} /> : isCurrent ? <Icon name="clock" size={14} /> : <span className="h-2 w-2 rounded-full bg-slate-400/50" />}
										</span>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
												<div className="flex flex-wrap items-center gap-2">
													<h3 className={`text-sm font-bold ${isCurrent ? 'text-slate-800' : isComplete ? 'text-slate-700' : 'text-slate-500'}`}>
														{stage.title}
													</h3>
													{isCurrent && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-800">Saat Ini</span>}
												</div>
												<span className="text-[9px] text-slate-500">{stage.time}</span>
											</div>
											<p className="mt-1 text-[10px] leading-4 text-slate-600">{stage.detail}</p>
											{isComplete ? (
												<p className="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-emerald-600">
													<Icon name="circle-check-outline" size={12} /> {stage.note}
												</p>
											) : isCurrent ? (
												<div className="mt-2 rounded-lg bg-blue-50 p-3 text-[10px] leading-4 text-slate-500 sm:p-3.5">
													<p className="flex items-center gap-1.5 font-semibold text-slate-700">
														<Icon name="info-circle-outline" size={13} className="text-sky-700" />
														Catatan Tim Penelaah:
													</p>
													<p className="mt-1">{stage.note}</p>
												</div>
											) : (
												<p className="mt-1 text-[9px] leading-4 text-slate-400">{stage.note}</p>
											)}
										</div>
									</li>
								);
							})}
						</ol>
					</section>

					<section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
						<div className="mb-3 flex items-center justify-between gap-2">
							<h2 id="evidence-title" className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
								<Icon name="image" size={15} className="text-sky-700" />
								Bukti Foto
							</h2>
							<span className="rounded-md bg-blue-100 px-2 py-1 text-[9px] font-medium text-slate-500">1 Berkas</span>
						</div>
						<div className="relative overflow-hidden rounded-lg bg-slate-100">
							<img
                                src="https://lampungpro.co/laravel-filemanager/photos/32/Polinela/IMG-20230429-WA0002.jpg"
                                alt="Bukti TKP"
                                className="w-full object-cover"
                            />
							<span className="absolute bottom-2 left-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 truncate rounded bg-[#0B3C65]/90 px-2 py-1 text-[9px] text-white">
								<Icon name="image" size={11} />
								<span className="truncate">Bukti_TKP_24102024.jpg</span>
							</span>
						</div>
					</section>
				</div>
			</div>
		</DashboardLayout>
	);
}