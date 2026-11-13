import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function DashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    // Menutup jika pengguna mengklik di luar area
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }

            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white border-b border-gray-100 h-20 px-8 flex items-center justify-end sticky top-0 z-30">
            <div className="flex items-center space-x-4">

                <div className="relative" ref={notifRef}>
                    {/* Notification Button */}
                    <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                        <Icon name="bell-outline" className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                            3
                        </span>
                    </button>

                    {/* Pop-up Notification Dropdown */}
                    {isNotifOpen && (
                        <div className="absolute -right-25 sm:right-0 mt-3 w-95 sm:w-105 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 text-left">
                            {/* Header Pemberitahuan */}
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <div className="p-1.5 bg-blue-50 text-[#0B3C65] rounded-lg">
                                        <Icon name="bell-outline" className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 leading-tight">Pemberitahuan</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">3 laporan baru memerlukan tindakan</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className="text-xs font-semibold text-[#0B3C65] hover:underline">
                                        Tandai Dibaca
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600">
                                    </button>
                                </div>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex items-center space-x-2 py-3 overflow-x-auto scrollbar-none">
                                <button className="px-3.5 py-1.5 bg-[#0B3C65] text-white text-xs font-semibold rounded-full flex items-center space-x-1.5 shrink-0">
                                    <span>Semua</span>
                                    <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">4</span>
                                </button>
                                <button className="px-3.5 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full flex items-center space-x-1.5 shrink-0 hover:bg-gray-200 transition-colors">
                                    <span>Darurat</span>
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                </button>
                                <button className="px-3.5 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full shrink-0 hover:bg-gray-200 transition-colors">
                                    Investigasi
                                </button>
                                <button className="px-3.5 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full shrink-0 hover:bg-gray-200 transition-colors">
                                    Sistem
                                </button>
                            </div>

                            {/* Notification List Items */}
                            <div className="space-y-3 max-h-90 overflow-y-auto pr-1">
                                {/* Item 1: Darurat / Kritis */}
                                <div className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-100/60 relative">
                                    <div className="flex items-center justify-between">
                                        <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                            DARURAT / KRITIS
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[11px] text-gray-400">3 menit yang lalu</span>
                                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-900 mt-2">
                                        Laporan Baru: Dugaan Narkotika Gol. I (Ganja)
                                    </h4>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                        Laporan anonim terenkripsi masuk di area Parkir Gedung Sakura. Tiket #SPN-2024-089 siap ditriage.
                                    </p>
                                    <div className="flex items-center space-x-2 mt-3">
                                        <button className="px-3 py-1.5 bg-[#0B3C65] text-white text-xs font-semibold rounded-lg hover:bg-[#092d4e] transition-colors flex items-center space-x-1">
                                            <span>Buka Tiket</span>
                                            <span>&rarr;</span>
                                        </button>
                                        <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                            Triage Cepat
                                        </button>
                                    </div>
                                </div>

                                {/* Item 2: Investigasi Lapangan */}
                                <div className="p-3.5 rounded-xl bg-blue-50/30 border border-blue-100/50 relative">
                                    <div className="flex items-center justify-between">
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                            INVESTIGASI LAPANGAN
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[11px] text-gray-400">25 menit yang lalu</span>
                                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-900 mt-2">
                                        Bukti BAP Ditambahkan: #SPN-2024-088
                                    </h4>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                        Petugas Patroli mengunggah rekaman CCTV koridor Asrama Mahasiswa Putra (Sektor Barat).
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-2 flex items-center space-x-1">
                                        <span>📎</span>
                                        <span>2 Berkas Gambar (EXIF Sanitized)</span>
                                    </p>
                                </div>

                                {/* Item 3: Status Berubah */}
                                <div className="p-3.5 rounded-xl bg-amber-50/30 border border-amber-100/50 relative">
                                    <div className="flex items-center justify-between">
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase tracking-wider">
                                            STATUS BERUBAH
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[11px] text-gray-400">1 jam yang lalu</span>
                                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-900 mt-2">
                                        Notifikasi Sinkron ke Pelapor Publik
                                    </h4>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                        Laporan #SPN-2024-087 (Transaksi Obat Daftar G di Kantin Baru) status dinaikkan ke tahap validasi berkas.
                                    </p>
                                </div>
                            </div>

                            {/* Footer Dropdown */}
                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-[11px] text-gray-400">
                                <span>Notifikasi disimpan selama 30 hari</span>
                                <a href="#log" className="font-semibold text-[#0B3C65] hover:underline flex items-center space-x-1">
                                    <span>Lihat Seluruh Log Notifikasi</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Admin Profile Dropdown Container */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center space-x-3 pl-4 border-l border-gray-200 focus:outline-none hover:bg-gray-100 py-2 transition-colors rounded-lg"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0B3C65] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            AD
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-bold text-gray-800 leading-none">Admin</p>
                            <p className="text-xs text-gray-400 mt-1">Satgas Anti Narkoba</p>
                        </div>
                        <Icon name="chevron-down" className={`w-4 h-4 text-gray-400 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Pop-up Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50">
                            {/* Profile Info Header */}
                            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                                <div className="w-12 h-12 rounded-xl bg-[#0B3C65] text-white flex items-center justify-center font-bold text-base shrink-0">
                                    AD
                                </div>
                                <div className="text-left overflow-hidden">
                                    <h4 className="text-base font-bold text-[#0B3C65] leading-tight truncate">
                                        Admin
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                                        Satgas Anti Narkoba
                                    </p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="pt-2">
                                <Link
                                    to="/dashboard/profil"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-3 py-3 px-2 text-[#0B3C65] font-semibold text-sm hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                                >
                                    <Icon name="user" className="w-4 h-4 text-[#0B3C65]" />
                                    <span>Lihat Profil</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        // Handle logout action
                                        console.log('Logout clicked');
                                    }}
                                    className="w-full flex items-center justify-between py-3 px-2 text-rose-500 font-semibold text-sm hover:bg-rose-50/50 rounded-lg transition-colors mt-1"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Icon name="log-out" className="w-4 h-4 text-rose-400" />
                                        <span>Keluar / Logout</span>
                                    </div>
                                    <Icon name="chevron-right" className="w-4 h-4 text-rose-400" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}