import { Link } from 'react-router-dom';

const columns = () => [
	{
		accessorKey: 'idTiket',
		header: 'ID TIKET',
		cell: (info) => (
			<span className="font-bold text-[#0B3C65]">{info.getValue()}</span>
		),
	},
	{
		accessorKey: 'kategori',
		header: 'KATEGORI KASUS',
		cell: (info) => (
			<span className="font-medium text-[#53647a]">{info.getValue()}</span>
		),
	},
	{
		accessorKey: 'tanggal',
		header: 'TANGGAL SELESAI',
		cell: (info) => (
			<div>
				<p className="font-medium text-[#53647a]">{info.row.original.tanggal}</p>
				<p className="mt-1 text-[10px] font-medium text-[#a8b4c2]">
					{info.row.original.waktu}
				</p>
			</div>
		),
	},
	{
		id: 'tindakan',
		header: 'TINDAKAN',
		cell: (info) => {
			const sudahDiisi = info.row.original.sudahDiisi;
			const ticketId = encodeURIComponent(info.row.original.idTiket);

			return (
				<div className="flex">
					<Link
						to={`/dashboard/survey/${ticketId}`}
						className={`rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors ${
							sudahDiisi
								? 'bg-emerald-500 hover:bg-emerald-600'
								: 'bg-[#0B3C65] hover:bg-[#092f50]'
						}`}
					>
						{sudahDiisi ? 'Isi Survei' : 'Lihat Survei'}
					</Link>
				</div>
			);
		},
	},
];

export default columns;
