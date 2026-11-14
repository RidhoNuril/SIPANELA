import Icon from '../../../components/common/Icon';

const columns = (onVerify, onDelete, readOnly) => [
	{
		accessorKey: 'idTiket',
		header: 'ID TIKET',
		cell: (info) => <span className="font-bold text-[#0B3C65]">{info.getValue()}</span>,
	},
	{
		accessorKey: 'pelapor',
		header: 'PELAPOR',
		cell: (info) => <span className="text-gray-700 font-medium">{info.getValue()}</span>,
	},
	{
		accessorKey: 'kategori',
		header: 'KATEGORI KASUS',
		cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
	},
	{
		accessorKey: 'lokasi',
		header: 'LOKASI KEJADIAN (KAMPUS)',
		cell: (info) => (
			<div className="text-gray-600 flex items-center space-x-1.5">
				<Icon name="geo-alt" className="text-gray-400 text-base shrink-0" />
				<span className="leading-tight">{info.getValue()}</span>
			</div>
		),
	},
	{
		accessorKey: 'waktu',
		header: 'WAKTU LAPORAN',
		cell: (info) => <span className="text-gray-500 text-xs leading-relaxed">{info.getValue()}</span>,
	},
	{
		accessorKey: 'status',
		header: 'STATUS',
		cell: (info) => (
			<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            info.getValue() === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
            info.getValue() === 'Investigasi' ? 'bg-amber-100 text-amber-700' :
            info.getValue() === 'Verifikasi' ? 'bg-sky-100 text-sky-700' :
            info.getValue() === 'Menunggu' ? 'bg-gray-100 text-gray-700' :
            'bg-rose-100 text-rose-700'
        }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                info.getValue() === 'Selesai' ? 'bg-emerald-500' :
                info.getValue() === 'Investigasi' ? 'bg-amber-500' :
                info.getValue() === 'Verifikasi' ? 'bg-sky-500' :
                info.getValue() === 'Menunggu' ? 'bg-gray-400' :
                'bg-rose-500'
            }`}></span>
            {info.getValue()}
        </span>
		),
	},
	{
		id: 'tindakan',
		header: 'TINDAKAN',
		cell: (info) => (
			readOnly ? <span className="text-xs text-slate-400">Demo</span> : (
				<div className="flex items-center justify-center gap-2">
					<button
						type="button"
						onClick={() => onVerify(info.row.original)}
						className="px-5 py-1.5 bg-[#0B3C65] hover:bg-blue-900 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
					>
						Verifikasi
					</button>
					<button
						type="button"
						onClick={() => onDelete(info.row.original)}
						aria-label={`Hapus laporan ${info.row.original.idTiket}`}
						className="rounded-lg border border-rose-200 px-2.5 py-1.5 text-rose-700 hover:bg-rose-50"
					>
						<Icon name="trash" />
					</button>
				</div>
			)
		),
	},
];

export default columns;
