import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon';

const sampleImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYuvu6u84ttDqor0c_a4Y1csRVKly_CFsBrnKCFeaXpQ&s=10';

export const initialArtikel = [
	{
		id: 1,
		image: sampleImage,
		judul: 'Ilusi Energi Sesaat: Bagaimana Amfetamin Merusak Fungsi Memori Permanen',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Satgas Medis Polinela',
		konten: 'Artikel edukasi mengenai dampak amfetamin terhadap fungsi memori dan kesehatan.',
		visibility: 'publik',
	},
	{
		id: 2,
		image: sampleImage,
		judul: 'Waspada Vape Berisi Zat Adiktif Narkotika: Fakta & Deteksi Awal',
		kategori: 'Edukasi Narkotika',
		status: 'Diterbitkan',
		penulis: 'Riset BNN & Polinela',
		konten: 'Kenali fakta dan deteksi awal zat adiktif pada produk vape.',
		visibility: 'publik',
	},
	{
		id: 3,
		image: sampleImage,
		judul: 'Konsekuensi Hukum Pidana dan Sanksi Drop Out Tanpa Kompromi',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Biro Hukum Polinela',
		konten: 'Informasi mengenai konsekuensi hukum pidana dan sanksi di lingkungan kampus.',
		visibility: 'publik',
	},
	{
		id: 4,
		image: sampleImage,
		judul: 'Mitos dan Fakta tentang Penggunaan Stimulan di Ujian Akhir',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Satgas Medis Polinela',
		konten: 'Mitos dan fakta penggunaan stimulan beserta dampaknya bagi mahasiswa.',
		visibility: 'publik',
	},
	{
		id: 5,
		image: sampleImage,
		judul: 'Pencegahan Pelanggaran Hukum di Lingkungan Kampus',
		kategori: 'Sosialisasi Kampus',
		status: 'Diterbitkan',
		penulis: 'Biro Hukum Polinela',
		konten: 'Panduan pencegahan pelanggaran hukum di lingkungan kampus.',
		visibility: 'publik',
	},
];

const columns = () => [
	{
		accessorKey: 'no',
		header: 'NO',
		cell: (info) => <span className="font-bold text-[#0B3C65] text-sm">{info.row.index + 1}</span>,
	},
	{
		accessorKey: 'image',
		header: 'GAMBAR',
		cell: (info) => (
			<img className="block max-w-40 truncate font-medium text-gray-800 rounded-md"
				src={info.getValue()}
				alt={info.row.original.judul}
				title={info.row.original.judul}
			/>
		),
	},
	{
		accessorKey: 'judul',
		header: 'JUDUL',
		cell: (info) => (
			<span
				className="block max-w-sm truncate font-medium text-gray-800"
				title={info.getValue()}
			>
				{info.getValue()}
			</span>
		),
	},
	{
		accessorKey: 'kategori',
		header: 'KATEGORI',
		cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
	},
	{
		accessorKey: 'penulis',
		header: 'PENULIS',
		cell: (info) => <span className="text-gray-700 font-medium">{info.getValue()}</span>,
	},
	{
		accessorKey: 'status',
		header: 'STATUS',
		cell: (info) => (
			<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${info.getValue() === 'Diterbitkan' ? 'bg-emerald-100 text-emerald-700' :
					info.getValue() === 'Draf' ? 'bg-gray-100 text-gray-700' :
						'bg-amber-100 text-amber-700'
				}`}>
				<span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${info.getValue() === 'Diterbitkan' ? 'bg-emerald-500' :
						info.getValue() === 'Draf' ? 'bg-gray-400' :
							'bg-amber-500'
					}`}></span>
				{info.getValue()}
			</span>
		),
	},
	{
		id: 'aksi',
		header: 'AKSI',
		cell: (info) => (
			<div className="flex items-center">
				<Link
					to={`/dashboard/artikel/${info.row.original.id}/edit`}
					aria-label={`Edit artikel ${info.row.original.judul}`}
					title="Edit artikel"
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