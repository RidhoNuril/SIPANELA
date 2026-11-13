import { useEffect, useState } from 'react';
import Icon from '../../../components/common/Icon';

const stages = [
	{ title: 'Menunggu', description: 'Menunggu satgas memverifikasi laporan.' },
	{ title: 'Verifikasi', description: 'Verifikasi kelengkapan bukti awal pelaporan.' },
	{ title: 'Investigasi', description: 'Melakukan pengecekan langsung ke lapangan.' },
	{ title: 'Selesai', description: 'Menentukan hasil akhir dari laporan.' },
];

const statusToStage = {
	Menunggu: 1,
	Verifikasi: 1,
	Investigasi: 2,
	Selesai: 4,
	'Di Tolak': 1,
};

function ProgressPanel({ report, currentStage, isRejected }) {
	return (
		<section className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-3.5">
			<h3 className="flex items-center mb-2.5 border-b border-slate-200 pb-2 text-[11px] font-bold uppercase tracking-wide text-[#0B3C65]">
				<Icon name="link-45deg" className="mr-1.5 text-sm" />
				Alur Prosedur &amp; Tahapan Penanganan BAP
			</h3>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
				{stages.map((stage, index) => {
					const isRejectedStage = isRejected && index > 0;
					const isDone = isRejected ? index === 0 : index < currentStage;
					const isActive = !isRejected && !isDone && index === currentStage && currentStage < stages.length;
					const className = isRejectedStage
						? 'border-rose-300 bg-white text-rose-700'
						: isActive
							? 'border-sky-500 bg-white shadow-[0_0_0_1px_rgba(14,165,233,0.12)]'
							: isDone
								? 'border-emerald-200 bg-white'
								: 'border-slate-200 bg-slate-50 text-slate-400';

					return (
						<div key={stage.title} className={`flex min-h-26.5 flex-col rounded-lg border p-2.5 ${className}`}>
							<div className="mb-1.5 flex items-center justify-between">
								<span className="text-[10px] font-bold uppercase tracking-wide">
									Tahap {index + 1}{isActive ? ' •' : ''}
								</span>
								<span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
									isRejectedStage
										? 'bg-rose-100 text-rose-600'
										: isDone
											? 'bg-emerald-100 text-emerald-600'
											: isActive
												? 'bg-amber-100 text-amber-700'
												: 'bg-slate-200 text-slate-500'
								}`}>
									{isRejectedStage
										? <Icon name="x-lg" />
										: isDone
											? <Icon name="check-lg" />
											: isActive
												? <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
												: index + 1}
								</span>
							</div>
							<p className="text-[10px] font-bold">
								{isRejected && index === 3 ? 'Selesai (Di Tolak)' : stage.title}
							</p>
							<p className="mt-1 text-[10px] leading-relaxed text-slate-500">{stage.description}</p>
							<div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-1.5 text-[10px]">
								{isActive ? (
									<span className="flex items-center font-semibold text-sky-600">
										<Icon name="record-circle" className="mr-1" />
										Sedang Proses
									</span>
								) : isDone || isRejectedStage ? (
									<span className={`flex items-center ${isRejectedStage ? 'text-rose-600' : 'text-slate-400'}`}>
										<Icon name="calendar3" className="mr-1" />
										{report.waktu.split(',')[0]}
									</span>
								) : (
									<span className="text-slate-400">Menunggu Tahap {index}</span>
								)}
								{(isActive || isDone || isRejectedStage) && (
									<span className={`font-semibold ${isRejectedStage ? 'text-rose-600' : isActive ? 'text-[#0B3C65]' : 'text-slate-500'}`}>
										{isActive ? 'Satgas' : isDone ? 'Satgas' : ''}
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

function StagePanel({
	stage,
	title,
	children,
	onSave,
	saveLabel = 'Simpan & Lanjutkan',
	canSave = true,
}) {
	return (
		<section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
			<div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5">
				<span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
					Tahap {stage + 1}
				</span>
				<h4 className="text-[11px] font-bold text-[#0B3C65]">{title}</h4>
			</div>
			{children}
			<div className="mt-3 flex justify-end">
				<button
					type="button"
					onClick={onSave}
					disabled={!canSave}
					className="flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{saveLabel}
					{saveLabel.includes('Lanjutkan') && (
						<Icon name="arrow-right" className="ml-2" />
					)}
				</button>
			</div>
		</section>
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
	actionLabel,
}) {
	const isContinue = variant === 'continue';
	return (
		<div className={`rounded-lg border p-2.5 ${
			selected
				? isContinue
					? 'border-emerald-300 bg-emerald-50/30'
					: 'border-rose-300 bg-rose-50/30'
				: 'border-dashed border-slate-200 bg-slate-50/50'
		}`}>
			<div className="mb-2 flex items-center justify-between gap-2">
				<button
					type="button"
					onClick={onSelect}
					aria-pressed={selected}
					className={`flex min-w-0 items-center gap-1.5 text-left text-[10px] font-bold ${
						selected
							? isContinue ? 'text-emerald-700' : 'text-rose-600'
							: 'text-slate-600'
					}`}
				>
					<span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
						selected
							? isContinue ? 'bg-emerald-500' : 'bg-rose-500'
							: 'bg-slate-400'
					}`}></span>
					{title}
				</button>
				<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
					selected
						? isContinue ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
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
				className="w-full resize-none rounded-md border border-slate-100 bg-white px-2 py-2 text-[11px] italic text-slate-700 outline-none placeholder:text-slate-500 focus:border-sky-300"
			/>
			<p className={`mt-2 border-t pt-1.5 text-[10px] font-medium ${
				isContinue ? 'border-emerald-100 text-emerald-700' : 'border-rose-100 text-rose-600'
			}`}>
				{nextStep}
				<button
					type="button"
					onClick={onSelect}
					className="float-right font-semibold hover:underline"
				>
					{actionLabel} →
				</button>
			</p>
		</div>
	);
}

function StageNoteField({ label, value, onChange, placeholder, required = false }) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-600">
				{label}{required && <span className="ml-1 text-rose-500">*</span>}
			</span>
			<textarea
				value={value}
				onChange={(event) => onChange(event.target.value)}
				aria-label={label}
				placeholder={placeholder}
				required={required}
				rows={3}
				className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] leading-relaxed text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400"
			/>
		</label>
	);
}

function formatHistoryDate(value) {
	return new Intl.DateTimeFormat('id-ID', {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(new Date(value));
}

function HistoryRecord({ record }) {
	const isRejected = record.decision === 'reject';
	const title = isRejected
		? 'Opsi: Laporan Ditolak'
		: record.stage === 1
			? 'Laporan Dilanjutkan / Terverifikasi'
			: record.stage === 2
				? 'Catatan Hasil Investigasi'
				: 'Hasil Akhir Laporan';

	return (
		<article className="rounded-lg border border-slate-200 bg-slate-50/50 p-2.5">
			<div className="mb-2 flex flex-wrap items-center justify-between gap-1.5">
				<p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
					<span className={`h-1.5 w-1.5 rounded-full ${isRejected ? 'bg-rose-500' : 'bg-slate-400'}`}></span>
					<span>Tahap {record.stage + 1} · {title}</span>
				</p>
				<div className="flex items-center gap-2 text-[10px] text-slate-500">
					{record.createdAt && <span>{formatHistoryDate(record.createdAt)}</span>}
					{record.createdAt && <span>·</span>}
					{record.actor && <span>{record.actor}</span>}
					<span className={`rounded-full px-1.5 py-0.5 ${isRejected ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
						{record.isPlaceholder ? 'Catatan lama' : isRejected ? 'Opsi Penolakan' : 'Terverifikasi'}
					</span>
				</div>
			</div>
			<div className={`rounded-md border border-slate-100 bg-white px-2.5 py-2 text-[11px] leading-relaxed ${
				record.isPlaceholder ? 'text-slate-400' : 'text-slate-700'
			} ${record.note && !record.isPlaceholder ? 'italic' : ''}`}>
				{record.note || 'Catatan belum tersedia untuk tahap ini.'}
			</div>
			<p className={`mt-1.5 border-t border-slate-100 pt-1.5 text-[10px] ${isRejected ? 'text-rose-600' : 'text-slate-500'}`}>
				{isRejected
					? 'Tindak Lanjut: Laporan selesai dengan status ditolak'
					: record.stage === 3
						? 'Tindak Lanjut: Penanganan laporan telah selesai'
						: 'Tindak Lanjut: Masuk ke tahap selanjutnya'}
			</p>
		</article>
	);
}

function getVisibleHistory(report, currentStage, isRejected) {
	const history = [...(report.history ?? [])];
	const passedStages = isRejected
		? [1]
		: Array.from({ length: Math.max(0, currentStage - 1) }, (_, index) => index + 1);

	passedStages.forEach((stage) => {
		if (history.some((record) => record.stage === stage)) return;

		const rejectedAtThisStage = isRejected && stage === 1;
		history.push({
			stage,
			decision: rejectedAtThisStage ? 'reject' : 'continue',
			note: rejectedAtThisStage
				? report.catatan || ''
				: '',
			createdAt: '',
			actor: '',
			isPlaceholder: true,
		});
	});

	return history.sort((first, second) => first.stage - second.stage);
}

export default function VerifikasiOverlay({ report, onClose, onSave }) {
	const currentStage = report.activeStage ?? statusToStage[report.status] ?? 1;
	const isRejected = report.status === 'Di Tolak';
	const isComplete = currentStage >= stages.length && !isRejected;
	const [decision, setDecision] = useState('continue');
	const [continueNote, setContinueNote] = useState('');
	const [rejectNote, setRejectNote] = useState('');
	const [stageNote, setStageNote] = useState('');
	const history = getVisibleHistory(report, currentStage, isRejected);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') onClose();
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
		const isDecisionStage = currentStage === 1;
		const isRejecting = isDecisionStage && decision === 'reject';
		const note = isDecisionStage
			? (isRejecting ? rejectNote : continueNote)
			: stageNote;
		const record = {
			stage: currentStage,
			decision: isRejecting ? 'reject' : 'continue',
			note,
			createdAt: '',
			actor: 'Satgas',
		};

		onSave(report, {
			status: isRejecting
				? 'Di Tolak'
				: currentStage === 1
					? 'Investigasi'
					: 'Selesai',
			activeStage: isRejecting ? currentStage : currentStage + 1,
			catatan: note,
			history: [...history, record],
		});
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-[#07395f]/50 p-6"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="verifikasi-title"
				className="flex max-h-[92vh] w-full max-w-240 flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
			>
				<header className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
					<div>
						<h2 id="verifikasi-title" className="text-lg font-bold tracking-tight text-[#0B3C65]">
							Verifikasi Penindakan
						</h2>
						<p className="mt-1 text-[11px] text-slate-500">
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
						<Icon name="x-lg" className="text-xs" />
					</button>
				</header>

				<div className="space-y-4 overflow-y-auto px-5 py-4 sm:px-6 sm:py-4">
					<ProgressPanel
						report={report}
						currentStage={currentStage}
						isRejected={isRejected}
					/>

					<section>
						<h3 className="flex items-center mb-2.5 text-[11px] font-bold uppercase tracking-wide text-[#0B3C65]">
							<Icon name="clipboard2-check" className="mr-1.5 text-sm" />
							Riwayat Catatan
						</h3>
						<div className="space-y-2.5 rounded-xl border border-slate-200 p-3.5 sm:p-4">
							{history.map((record, index) => (
								<HistoryRecord key={`${record.stage}-${index}`} record={record} />
							))}

							{!isComplete && !isRejected && currentStage === 1 && (
								<StagePanel
									stage={1}
									title="Verifikasi"
									onSave={handleSave}
								>
									<div className="grid gap-2 md:grid-cols-2">
										<DecisionCard
											selected={decision === 'continue'}
											variant="continue"
											title="Opsi: Laporan Dilanjutkan / Terverifikasi"
											badge={decision === 'continue' ? 'Status Terpilih' : 'Opsi Verifikasi'}
											note={continueNote}
											placeholder="Masukkan catatan"
											onSelect={() => setDecision('continue')}
											onNoteChange={setContinueNote}
											nextStep="Tindak Lanjut: Masuk ke tahap selanjutnya"
											actionLabel="Pilih Verifikasi"
										/>
										<DecisionCard
											selected={decision === 'reject'}
											variant="reject"
											title="Opsi: Laporan Ditolak"
											badge={decision === 'reject' ? 'Status Terpilih' : 'Opsi Penolakan'}
											note={rejectNote}
											placeholder="Masukkan catatan"
											onSelect={() => setDecision('reject')}
											onNoteChange={setRejectNote}
											nextStep="Tindak Lanjut: Laporan selesai dengan status ditolak"
											actionLabel="Pilih Ditolak"
										/>
									</div>
								</StagePanel>
							)}

							{!isComplete && !isRejected && currentStage === 2 && (
								<StagePanel
									stage={2}
									title="Investigasi"
									onSave={handleSave}
									saveLabel="Simpan & Lanjutkan"
								>
									<StageNoteField
										label="Catatan Hasil Investigasi"
										value={stageNote}
										onChange={setStageNote}
										placeholder="Tuliskan hasil investigasi..."
									/>
								</StagePanel>
							)}

							{!isComplete && !isRejected && currentStage === 3 && (
								<StagePanel
									stage={3}
									title="Selesai"
									onSave={handleSave}
									saveLabel="Simpan"
									canSave={Boolean(stageNote.trim())}
								>
									<StageNoteField
										label="Hasil Akhir Laporan"
										value={stageNote}
										onChange={setStageNote}
										placeholder="Tuliskan hasil akhir laporan..."
										required
									/>
								</StagePanel>
							)}

							{isComplete && history.length === 0 && (
								<p className="rounded-lg bg-slate-50 px-3 py-4 text-xs text-slate-500">
									Seluruh tahapan penanganan laporan telah selesai.
								</p>
							)}
						</div>
					</section>

					{(isRejected ? stages.slice(2) : stages.slice(currentStage + 1)).map((stage, index) => {
						const stageIndex = isRejected ? index + 2 : currentStage + index + 1;
						return (
							<div
								key={stage.title}
								className={`flex items-center justify-between rounded-xl border ${
									isRejected ? 'border-rose-200' : 'border-slate-200'
								} ${stageIndex === 3 ? 'border-dashed' : ''} bg-slate-50/60 px-3.5 py-3 text-[11px] text-slate-500`}
							>
								<div className="flex items-center gap-2">
									<span className="rounded-md bg-slate-200 px-2 py-1 text-[10px] font-semibold">
										Tahap {stageIndex + 1} Terkunci
									</span>
									<span className="font-semibold text-slate-600">{stage.title}</span>
								</div>
								<span className="hidden items-center gap-1 sm:flex">
									<Icon name="unlock" />
									Menunggu Penyelesaian Catatan Tahap {stageIndex}
								</span>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}




