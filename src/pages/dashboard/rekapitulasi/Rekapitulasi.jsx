import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/common/DashboardLayout';
import DataTable from '../../../components/common/DataTable';
import RekapitulasiColumns from './RekapitulasiColumns';
import Icon from '../../../components/common/Icon';

const allReports = [
    { period: 'Maret 2026', year: 'Tahun 2026', month: 'Oktober', status: 'Terkini & Berjalan', cases: '982 Aduan Terverifikasi', size: '3,4 MB', note: 'Diperbarui 3 jam lalu' },
    { period: 'Februari 2026', year: 'Tahun 2026', month: 'Oktober', status: 'PDF + XLSX', cases: '1.185 Kasus & Bukti Sitaan', size: '5,1 MB', note: 'Ditandatangani Deputi Penindakan' },
    { period: 'Januari 2026', year: 'Tahun 2026', month: 'Oktober', status: 'PDF + XLSX', cases: '1.240 Kasus/Aduan Masuk', size: '4,8 MB', note: 'Diverifikasi BNN RI' },
    { period: 'Desember 2025', year: 'Tahun 2025', month: 'Oktober', status: 'PDF + XLSX', cases: '1.320 Kasus Selesai', size: '4,6 MB', note: '' },
    { period: 'November 2025', year: 'Tahun 2025', month: 'Oktober', status: 'PDF + XLSX', cases: '1.290 Kasus Selesai', size: '4,4 MB', note: '' },
];

export default function Rekapitulasi() {
    const [year, setYear] = useState('Tahun 2026');
    const [month, setMonth] = useState('Oktober');
    const [range, setRange] = useState('12 Okt 2026 - 24 Okt 2024');
    
    // Inisialisasi awal menggunakan filter aktif agar langsung menyaring data
    const [activeFilters, setActiveFilters] = useState({ year: 'Tahun 2026', month: 'Oktober' });
    const [applied, setApplied] = useState(false);

    // Memfilter data berdasarkan state aktif yang dikunci saat tombol "Terapkan Filter" diklik
    const filteredReports = useMemo(() => {
        return allReports.filter((item) => {
            const matchYear = activeFilters.year ? item.year === activeFilters.year : true;
            const matchMonth = activeFilters.month ? item.month === activeFilters.month : true;
            return matchYear && matchMonth;
        });
    }, [activeFilters]);

	const columns = useMemo(() => RekapitulasiColumns(), []);

    const handleApplyFilter = () => {
        setActiveFilters({ year, month });
        setApplied(true);
    };

    const resetFilters = () => { 
        setYear('Tahun 2026'); 
        setMonth('Oktober'); 
        setRange('12 Okt 2026 - 24 Okt 2024'); 
        setActiveFilters({ year: 'Tahun 2026', month: 'Oktober' });
        setApplied(false); 
    };

    const field = (label, value, setter, options) => (
        <label className="block flex-1">
            <span className="mb-2 block text-[11px] font-bold text-[#44556b]">{label}</span>
            <div className="relative">
                <select value={value} onChange={(event) => setter(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-[#53647a] outline-none focus:border-[#0B3C65]">
                    {options.map((option) => <option key={option}>{option}</option>)}
                </select>
                <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400" />
            </div>
        </label>
    );

    return (
        <DashboardLayout>
            <div className="space-y-5">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">Rekapitulasi</h2>
                    <p className="mt-1 text-xs text-[#8292a5]">Rekapitulasi laporan di lingkungan kampus</p>
                </div>
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="grid gap-4 md:grid-cols-3">
                        {field('Periode Tahun', year, setYear, ['Tahun 2026', 'Tahun 2025'])}
                        {field('Periode Bulan', month, setMonth, ['Oktober', 'September', 'Agustus'])}
                        {field('Rentang Tanggal', range, setRange, ['12 Okt 2026 - 24 Okt 2024', '01 Okt 2026 - 31 Okt 2026'])}
                    </div>
                    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-[10px] text-[#8292a5] sm:flex-row sm:items-center sm:justify-between">
                        <span><Icon name="info-circle" className="mr-2 text-[#0B3C65]" />Menampilkan {filteredReports.length} arsip bundel resmi sesuai parameter filter aktif</span>
                        <div className="flex items-center gap-4">
                            <button onClick={resetFilters} className="font-semibold text-[#53647a] hover:text-[#0B3C65]">Reset Filter</button>
                            <button onClick={handleApplyFilter} className="rounded-lg bg-[#0B3C65] px-4 py-2 font-semibold text-white hover:bg-[#092f50]">
                                <Icon name="filter" className="mr-1" /> Terapkan Filter
                            </button>
                        </div>
                    </div>
                    
                    {applied && <p className="mt-2 text-[10px] text-emerald-600">Filter berhasil diterapkan.</p>}
                </section>
                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-[#0B3C65]">Rekap Pelaporan Anti Narkoba</h3>
                            <p className="text-[10px] text-[#8292a5]">Daftar rekapitulasi berkas tersertifikasi digital siap unduh</p>
                        </div>
                        <div className="text-xs font-semibold text-[#53647a]">
                            Export Rekap <Icon name="download" className="ml-1" />
                        </div>
                    </div>
                    <DataTable data={filteredReports} columns={columns} initialPageSize={5} infoLabel="arsip" />
                </section>
            </div>
        </DashboardLayout>
    );
}