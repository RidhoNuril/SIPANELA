import Icon from '../../../components/common/Icon';

const columns = () => [
    {
        accessorKey: 'period',
        header: '',
        cell: ({ row }) => (
            <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef3f8] text-[#334b63]">
                    <Icon name="file-earmark-text-fill" />
                </span>
                <div>
                    <div className="flex items-center gap-2 font-semibold text-[#26384c]">
                        {row.original.period}
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.original.status === 'Terkini & Berjalan' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                            {row.original.status}
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-[#8292a5]">{row.original.cases} <span className="mx-1">•</span> Ukuran: {row.original.size} <span className="mx-1">•</span></p>
                    {row.original.note && <p className="mt-1 text-[10px] font-medium text-emerald-600">{row.original.note}</p>}
                </div>
            </div>
        )
    },
    {
        id: 'actions',
        header: '',
        cell: () => (
            <div className="flex justify-end gap-2">
                <button aria-label="Lihat rekap" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-[#0B3C65]">
                    <Icon name="eye" />
                </button>
                <button className="rounded-lg bg-[#0B3C65] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#092f50]">
                    <Icon name="download" className="mr-1" /> UNDUH
                </button>
            </div>
        )
    }
];

export default columns;