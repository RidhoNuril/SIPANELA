import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon';

export const initialKategori = [
	{ id: 1, nama_kategori: 'Sosialisasi Kampus' },
	{ id: 2, nama_kategori: 'Edukasi Narkotika' },
	{ id: 3, nama_kategori: 'Siaran Pers BNN' },
	{ id: 4, nama_kategori: 'Hukum Kampus' },
	{ id: 5, nama_kategori: 'Regulasi Kampus' },
	{ id: 6, nama_kategori: 'Pencurian' },
	{ id: 7, nama_kategori: 'Pelanggaran Hukum' },
];

const columns = () => [
	{
		accessorKey: 'no',
		header: 'NO',
		cell: (info) => <span className="font-bold text-[#0B3C65] text-sm">{info.row.index + 1}</span>,
	},
	{
		accessorKey: 'nama_kategori',
		header: 'NAMA KATEGORI',
		cell: (info) => (
			<div className="flex items-center space-x-2">
				<span className="font-medium text-gray-800">{info.getValue()}</span>
			</div>
		),
	},
	{
		id: 'aksi',
		header: 'AKSI',
		cell: (info) => (
			<div className="flex items-center">
				<Link
					to={`/dashboard/kategori/${info.row.original.id}/edit`}
					aria-label={`Edit kategori ${info.row.original.nama_kategori}`}
					title="Edit kategori"
					className="px-2.5 py-1 text-slate-600 hover:text-[#0B3C65]"
				>
					<Icon name="pencil" />
				</Link>
				<button className="px-2.5 py-1">
					<Icon name="trash" />
				</button>
			</div>
		),
	},
];

export default columns;