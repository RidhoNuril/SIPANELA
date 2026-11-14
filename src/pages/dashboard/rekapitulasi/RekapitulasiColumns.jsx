const columns = () => [
    {
        accessorKey: 'id_laporan',
        header: 'ID LAPORAN',
    },
    {
        accessorKey: 'tanggal_laporan',
        header: 'TANGGAL LAPORAN',
        cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '—',
    },
    {
        accessorKey: 'jenis_laporan',
        header: 'JENIS LAPORAN',
    },
    {
        accessorKey: 'lokasi_kejadian',
        header: 'LOKASI',
    },
    {
        accessorKey: 'status',
        header: 'STATUS',
    },
];

export default columns;