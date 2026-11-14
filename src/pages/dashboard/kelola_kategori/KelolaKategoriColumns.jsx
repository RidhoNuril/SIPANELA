import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon.jsx';
import { demoArticleCategories } from '../../../data/demoData.js';

export const initialKategori = demoArticleCategories;

const columns = (onDelete, readOnly) => [
	{
		accessorKey: 'id_category',
		header: 'NO',
		cell: (info) => <span className="font-bold text-[#0B3C65]">{info.getValue()}</span>,
	},
	{
		accessorKey: 'nama_kategori',
		header: 'NAMA KATEGORI',
		cell: (info) => <span className="font-medium text-gray-800">{info.getValue()}</span>,
	},
	{
		id: 'aksi',
		header: 'AKSI',
		cell: (info) => (
			readOnly ? <span className="text-xs text-slate-400">Demo</span> : (
				<div className="flex items-center">
					<Link
						to={`/dashboard/kategori/${info.row.original.id_category}/edit`}
						aria-label={`Edit kategori ${info.row.original.nama_kategori}`}
						title="Edit kategori"
						className="px-2.5 py-1 text-slate-600 hover:text-[#0B3C65]"
					>
						<Icon name="pencil" />
					</Link>
					<button
						type="button"
						onClick={() => onDelete(info.row.original)}
						aria-label={`Hapus kategori ${info.row.original.nama_kategori}`}
						className="px-2.5 py-1 text-slate-600 hover:text-rose-600"
					>
						<Icon name="trash" />
					</button>
				</div>
			)
		),
	},
];

export default columns;
