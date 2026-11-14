import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer.jsx';
import Navbar from '../../components/common/Navbar.jsx';
import Icon from '../../components/common/Icon';
import { getHeroImages, HERO_IMAGES } from '../../services/educationService.js';

function HeroSection({ heroImages, activeImage, changeImage }) {
    return (

        <section className="max-w-7xl mx-auto  sm:px-6 sm:py-6">
            <div className="relative sm:rounded-xl overflow-hidden shadow-2xl sm:h-auto h-[calc(100vh-80px)] sm:min-h-130 flex items-center text-white">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div
                        className="flex h-full w-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${activeImage * 100}%)` }}
                    >
                        {heroImages.map((image, index) => (
                            <div key={index} className="relative h-full w-full shrink-0 grow-0">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Gradient overlay di atas gambar */}
                    <div className="absolute inset-0 bg-linear-to-r from-[#0B3C65]/95 sm:via-[#0B3C65]/60 via-[#0B3C65]/80 sm:to-[#0B3C65]/0 to-[#0B3C65]/60 pointer-events-none"></div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => changeImage('left')}
                    className="absolute sm:left-4 left-2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg"
                    aria-label="Foto sebelumnya"
                >
                    <Icon name="arrow-left-outline" className="w-5 h-5" />
                </button>
                <button
                    onClick={() => changeImage('right')}
                    className="absolute sm:right-4 right-2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg"
                    aria-label="Foto berikutnya"
                >
                    <Icon name="arrow-right-outline" className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative z-10 max-w-2xl sm:px-16 px-14 md:px-20 py-12">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 text-white">
                        Wujudkan Kampus POLINELA yang Aman, Bersih, dan Terbebas dari Bahaya Narkoba
                    </h1>
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8">
                        Laporaan tertutup, perlindungan saksi, dan bimbingan ahli tanpa catatan diskriminasi akademik.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link to="/lapor" className="px-6 py-3 rounded-xl bg-[#27AED2] hover:bg-[#1A9CC8] text-white font-medium text-sm flex items-center gap-2 shadow-lg transition-all">
                            <span>Buat Laporan</span>
                            <Icon name="arrow-right-outline" className="w-4 h-4" />
                        </Link>
                        <a href="/#edukasi" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm flex items-center gap-2 transition-all">
                            <Icon name="book-open" className="w-4 h-4 text-[#27AED2]" />
                            <span>Jelajahi Edukasi</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LandasanHukumSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0B3C65] mb-3">
                    Landasan Hukum & Regulasi Narkotika
                </h2>
                <p className="text-gray-500 text-sm">
                    Payung hukum resmi yang melindungi pelapor, menjamin hak rehabilitasi, dan menindak tegas peredaran gelap zat adiktif di lingkungan perguruan tinggi.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] font-semibold bg-[#AFE4F6] text-[#0B3C65] px-3 py-1 rounded-xl">
                                UU No. 35 Th 2009
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-[#AFE4F6]/50 flex items-center justify-center text-[#0B3C65]">
                                <Icon name="shield-check" className="w-4 h-4 text-[#1A9CC8]" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B3C65] mb-1">
                            Hak Rehabilitasi & Perlindungan Pelapor
                        </h3>
                        <p className="text-xs font-semibold text-[#1A9CC8] mb-4">
                            Pasal 54 & Pasal 106 UU Narkotika
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Menegaskan pecandu wajib direhabilitasi medis & sosial, serta masyarakat yang memberikan informasi dugaan tindak pidana berhak atas perlindungan hukum dan jaminan kerahasiaan identitas seutuhnya.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] font-semibold bg-[#AFE4F6] text-[#0B3C65] px-3 py-1 rounded-xl">
                                UU No. 31 Th 2014
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-[#AFE4F6]/50 flex items-center justify-center text-[#0B3C65]">
                                <Icon name="shield-check" className="w-4 h-4 text-[#1A9CC8]" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B3C65] mb-1">
                            Imunitas & Kerahasiaan Whistleblower
                        </h3>
                        <p className="text-xs font-semibold text-[#1A9CC8] mb-4">
                            Pasal 10 jo UU No. 13 Tahun 2006 (LPSK)
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Saksi, korban, atau pelapor tidak dapat dituntut pidana maupun perdata atas laporan yang diberikan dengan iktikad baik, serta identitas diri wajib dirahasiakan oleh seluruh instansi pemeriksa.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] font-semibold bg-[#AFE4F6] text-[#0B3C65] px-3 py-1 rounded-xl">
                                Inpres No. 2 Th 2020
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-[#AFE4F6]/50 flex items-center justify-center text-[#0B3C65]">
                                <Icon name="shield-check" className="w-4 h-4 text-[#1A9CC8]" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B3C65] mb-1">
                            Mandat Aksi Nasional P4GN Kampus
                        </h3>
                        <p className="text-xs font-semibold text-[#1A9CC8] mb-4">
                            SK Rektor POLINELA & Satgas P4GN
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Instruksi pencegahan & pemberantasan penyalahgunaan peredaran gelap narkotika di satuan perguruan tinggi vokasi dengan sanksi tegas Zero Tolerance dan komitmen Kampus Bersih Narkoba (Bersinar).
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function EdukasiNarkobaSection() {
    // State untuk melacak tab aktif: 'jenis', 'pencegah', 'gejala', atau 'dampak'
    const [activeTab, setActiveTab] = useState('jenis');

    // Daftar tab navigasi dan page dots
    const tabs = [
        { id: 'jenis', label: 'Jenis-Jenis Narkoba' },
        { id: 'pencegah', label: 'Cara Mencegah' },
        { id: 'gejala', label: 'Kenali Gejala' },
        { id: 'dampak', label: 'Dampak Narkoba' }
    ];

    return (
        <section id="edukasi" className="bg-slate-50 py-16">
            <div className="max-w-7xl mx-auto space-y-8 px-6">

                {/* Header Utama */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Edukasi & Pencegahan Narkoba
                    </h2>
                    <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        Komitmen terintegrasi Politeknik Negeri Lampung dalam mewujudkan lingkungan akademik yang bersih dari peredaran gelap narkotika melalui pemahaman gejala, perlindungan hukum, dan tindakan preventif terukur.
                    </p>

                    {/* Navigasi Tab / Pill Menu (Interaktif) */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 pb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-[#0B3C65] text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-[#0B3C65]/5'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 1. TAB: JENIS-JENIS NARKOBA */}
                {activeTab === 'jenis' && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Sub-Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Jenis-Jenis Narkoba</h3>
                                <p className="text-slate-500 text-sm">
                                    Pahami golongan, efek ketergantungan, serta zat terlarang berdasarkan regulasi UU RI No. 35/2009.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto shadow-xs">
                                <span>⚖️</span>
                                <span>UU RI No. 35 Tahun 2009 Tentang Narkotika</span>
                            </div>
                        </div>

                        {/* Banner Biru Tua */}
                        <div className="bg-[#0B3C65] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="space-y-2 relative z-10">
                                <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    <span>🛡️</span>
                                    <span>Kategori Hukum & Medis</span>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                                    Penggolongan Narkotika & Zat Terlarang
                                </h4>
                                <p className="text-blue-100 text-sm max-w-xl">
                                    Klasifikasi resmi menurut potensi adiksi & penggunaan terapeutik.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 relative z-10">
                                <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    • 3 Golongan Utama
                                </span>
                                <span className="bg-rose-500/20 text-rose-200 px-3.5 py-1.5 rounded-full text-xs font-medium border border-rose-500/30 backdrop-blur-xs">
                                    • Tinggi Risiko
                                </span>
                            </div>
                        </div>

                        {/* Grid 3 Kartu Golongan Narkoba */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* GOLONGAN I */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-100">
                                            <span>🚫</span> Dilarang Total & Pidana Berat
                                        </span>
                                        <span className="text-rose-500 text-sm font-bold">⚠️</span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Golongan I <span className="block text-rose-600 font-semibold">(Sangat Berbahaya)</span>
                                        </h5>
                                        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                                            Tidak digunakan untuk terapi medis, daya adiksi sangat tinggi.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                            <span>📄</span> <span>Contoh Zat:</span>
                                        </div>
                                        <p className="text-slate-600 text-xs leading-relaxed pl-5">
                                            Ganja (Cannabis), Sabu (Metamfetamin), Ekstasi (MDMA), Kokain.
                                        </p>
                                    </div>
                                    <div className="bg-rose-50/50 rounded-xl p-3.5 border border-rose-100/60 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                                            <span>⚡</span> <span>Efek Utama:</span>
                                        </div>
                                        <p className="text-rose-900/80 text-xs leading-relaxed pl-5">
                                            Halusinasi akut, adiksi instan, kerusakan sel otak permanen.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                                    <span className="text-slate-400">Status Regulasi</span>
                                    <span className="text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-md">Ilegal Penuh (Pidana)</span>
                                </div>
                            </div>

                            {/* GOLONGAN II */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-100">
                                            <span>💊</span> Medis Ketat / Resep Khusus
                                        </span>
                                        <span className="text-amber-500 text-sm font-bold">🏛️</span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Golongan II <span className="block text-amber-600 font-semibold">(Potensi Tinggi)</span>
                                        </h5>
                                        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                                            Bisa digunakan untuk terapi & penelitian sebagai pilihan terakhir, potensi adiksi sangat tinggi.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                            <span>📄</span> <span>Contoh Zat:</span>
                                        </div>
                                        <p className="text-slate-600 text-xs leading-relaxed pl-5">
                                            Morfin, Petidin, Metadon, Fentanil.
                                        </p>
                                    </div>
                                    <div className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-100/60 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                                            <span>⚡</span> <span>Efek Utama:</span>
                                        </div>
                                        <p className="text-amber-900/80 text-xs leading-relaxed pl-5">
                                            Pereda nyeri ekstrem, depresi pernapasan parah jika disalahgunakan.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                                    <span className="text-slate-400">Status Regulasi</span>
                                    <span className="text-amber-700 font-bold">Pengawasan Dokter Ketat</span>
                                </div>
                            </div>

                            {/* GOLONGAN III */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
                                            <span>🌿</span> Terapi Medis Luas
                                        </span>
                                        <span className="text-emerald-500 text-sm font-bold">🏥</span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Golongan III <span className="block text-emerald-600 font-semibold">(Potensi Ringan)</span>
                                        </h5>
                                        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                                            Banyak digunakan dalam terapi dan pengobatan, potensi adiksi lebih ringan dibandingkan Golongan I & II.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                            <span>📄</span> <span>Contoh Zat:</span>
                                        </div>
                                        <p className="text-slate-600 text-xs leading-relaxed pl-5">
                                            Kodein, Buprenorfin, Etilmorfin.
                                        </p>
                                    </div>
                                    <div className="bg-sky-50/50 rounded-xl p-3.5 border border-sky-100/60 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
                                            <span>⚡</span> <span>Efek Utama:</span>
                                        </div>
                                        <p className="text-sky-900/80 text-xs leading-relaxed pl-5">
                                            Pereda batuk dan nyeri sedang, tetap berisiko ketergantungan fisik.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                                    <span className="text-slate-400">Status Regulasi</span>
                                    <span className="text-emerald-700 font-bold">Resep Medis Terbatas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. TAB: CARA MENCEGAH */}
                {activeTab === 'pencegah' && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Sub-Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Cara Mencegah Narkoba</h3>
                                <p className="text-slate-500 text-sm">
                                    Langkah preventif perlindungan diri, pergaulan, dan lingkungan kampus bebas narkotika.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto shadow-xs">
                                <span>🛡️</span>
                                <span>Protokol Terpadu Satgas P4GN POLINELA</span>
                            </div>
                        </div>

                        {/* Banner Biru Tua */}
                        <div className="bg-[#0B3C65] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="space-y-2 relative z-10">
                                <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    <span>🛡️</span>
                                    <span>Protokol Satgas Anti - Narkoba Polinela</span>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                                    Bangun Benteng Pertahanan Diri
                                </h4>
                                <p className="text-blue-100 text-sm max-w-xl">
                                    Strategi teruji membentengi civitas akademika dari ancaman dan bujukan zat adiktif.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 relative z-10">
                                <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    3 Pilar Utama
                                </span>
                                <span className="bg-emerald-500/20 text-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30 backdrop-blur-xs">
                                    Aman & Terlindungi
                                </span>
                            </div>
                        </div>

                        {/* Grid 3 Kartu Pencegahan */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Langkah 1 */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                            01. Langkah Awal
                                        </span>
                                        <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold border border-sky-100">
                                            INDIVIDU
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Penguatan Diri & Mental
                                        </h5>
                                    </div>
                                    <div className="space-y-3 text-slate-600 text-xs leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                            <p>Kenali risiko fatal narkoba bagi masa depan, kesehatan fisik, dan kestabilan mental.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                            <p>Kelola beban stres akademik dengan aktivitas produktif, olahraga, dan hobi positif.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                    <span className="text-xs font-bold text-slate-800 block">Tips Tangguh:</span>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        Katakan "TIDAK" secara tegas pada tawaran pertama tanpa rasa ragu.
                                    </p>
                                </div>
                            </div>

                            {/* Langkah 2 */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                            02. Langkah Sosial
                                        </span>
                                        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-100">
                                            SOSIAL & RELASI
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Selektif Memilih Teman
                                        </h5>
                                    </div>
                                    <div className="space-y-3 text-slate-600 text-xs leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                            <p>Hindari pergaulan yang mentolerir atau menormalisasi konsumsi zat terlarang.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                            <p>Bangun lingkaran pertemanan positif dan saling mengingatkan nilai integritas kampus.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                    <span className="text-xs font-bold text-slate-800 block">Tips Lingkungan:</span>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        Berani meninggalkan kelompok yang memberi tekanan negatif (peer pressure).
                                    </p>
                                </div>
                            </div>

                            {/* Langkah 3 */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                            03. Langkah Institusi
                                        </span>
                                        <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold border border-sky-100">
                                            KAMPUS & CIVITAS
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Partisipasi Lingkungan Kampus Bebas Narkoba
                                        </h5>
                                    </div>
                                    <div className="space-y-3 text-slate-600 text-xs leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                            <p>Ikuti kegiatan sosialisasi, seminar P4GN, dan tes skrining berkala kampus POLINELA.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                            <p>Laporkan segera setiap indikasi peredaran mencurigakan melalui kanal SIPANELA secara rahasia & aman.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                    <span className="text-xs font-bold text-slate-800 block">Komitmen POLINELA:</span>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        Kerahasiaan pelapor dijamin 100% terlindungi oleh satgas resmi institusi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. TAB: KENALI GEJALA */}
                {activeTab === 'gejala' && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Sub-Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Kenali Gejala Sejak Awal</h3>
                                <p className="text-slate-500 text-sm">
                                    Kenali indikasi awal sedini mungkin untuk penanganan tepat.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto shadow-xs">
                                <span>*</span>
                                <span>Deteksi Cepat & Tindakan Terukur</span>
                            </div>
                        </div>

                        {/* Banner Biru Tua */}
                        <div className="bg-[#0B3C65] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="space-y-2 relative z-10">
                                <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    <span>🔒</span>
                                    <span>100% Terenkripsi & Anonim</span>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                                    Kenali Gejala Sejak Awal
                                </h4>
                                <p className="text-blue-100 text-sm max-w-xl">
                                    Deteksi dini lindungi masa depan rekan di sekitar Anda.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 relative z-10">
                                <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-sm">
                                    💬 Konsultasi Cepat
                                </button>
                            </div>
                        </div>

                        {/* Grid 2 Kartu Gejala */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kartu Fisik */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-100">
                                            KRITIS
                                        </span>
                                        <span className="text-rose-500">🩺</span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Perubahan Fisik
                                        </h5>
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">TANDA BIOLOGIS KASAT MATA</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                                <span>👁️</span> <span>Mata merah & pupil abnormal</span>
                                            </div>
                                            <p className="text-slate-600 text-xs pl-6">Perubahan drastis pada ukuran pupil mata.</p>
                                        </div>
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                                <span>⚡</span> <span>Penurunan fisik & tremor</span>
                                            </div>
                                            <p className="text-slate-600 text-xs pl-6">Berat badan merosot cepat serta gemetar tidak wajar.</p>
                                        </div>
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                                <span>🌙</span> <span>Wajah pucat & pola tidur kacau</span>
                                            </div>
                                            <p className="text-slate-600 text-xs pl-6">Insomnia parah bergantian dengan lemas berkepanjangan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kartu Perilaku & Sosial */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold border border-sky-100">
                                            SOSIAL
                                        </span>
                                        <span className="text-sky-500">🧠</span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Perubahan Perilaku & Sosial
                                        </h5>
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">INTERAKSI SOSIAL DI KAMPUS</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                                <span>🚫</span> <span>Menarik diri & membolos</span>
                                            </div>
                                            <p className="text-slate-600 text-xs pl-6">Meninggalkan pergaulan kampus dan absensi melonjak.</p>
                                        </div>
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                                <span>🛡️</span> <span>Sikap sangat tertutup</span>
                                            </div>
                                            <p className="text-slate-600 text-xs pl-6">Menghindar saat diajak interaksi dan defensif berlebihan.</p>
                                        </div>
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                                <span>💢</span> <span>Fluktuasi emosi drastis</span>
                                            </div>
                                            <p className="text-slate-600 text-xs pl-6">Mudah tersinggung, agresif tiba-tiba, atau tampak sangat cemas tanpa alasan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. TAB: DAMPAK NARKOBA */}
                {activeTab === 'dampak' && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Sub-Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Dampak Bahaya Narkoba</h3>
                                <p className="text-slate-500 text-sm">
                                    Ketahui konsekuensi fatal bagi kesehatan fisik, stabilitas mental, masa depan akademik, serta ancaman pidana hukum.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto shadow-xs">
                                <span>⚖️</span>
                                <span>UU No. 35/2009 & Tata Tertib Mahasiswa POLINELA</span>
                            </div>
                        </div>

                        {/* Banner Biru Tua */}
                        <div className="bg-[#0B3C65] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="space-y-2 relative z-10">
                                <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    <span>⚠️</span>
                                    <span>Konsekuensi Nyata & Fatal</span>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                                    Pahami Risiko Sebelum Terlambat
                                </h4>
                                <p className="text-blue-100 text-sm max-w-xl">
                                    Penyalahgunaan zat adiktif merusak masa depan civitas akademika secara permanen.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 relative z-10">
                                <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 backdrop-blur-xs">
                                    3 Aspek Kerusakan
                                </span>
                                <span className="bg-rose-500/20 text-rose-200 px-3.5 py-1.5 rounded-full text-xs font-medium border border-rose-500/30 backdrop-blur-xs">
                                    Zero Tolerance Kampus
                                </span>
                            </div>
                        </div>

                        {/* Grid 3 Kartu Dampak */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Kartu 1 */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400">01</span>
                                        <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-100">
                                            FISIK & ORGAN
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Kerusakan Otak & Organ Vital
                                        </h5>
                                    </div>
                                    <div className="space-y-3 text-slate-600 text-xs leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <span className="text-rose-500 font-bold mt-0.5">✖</span>
                                            <p>Kerusakan sel saraf otak permanen yang menurunkan daya kognitif, daya ingat, dan konsentrasi belajar.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-rose-500 font-bold mt-0.5">✖</span>
                                            <p>Gangguan fungsi kardiovaskular, risiko gagal jantung akut, serta potensi fatal overdosis mendadak.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                    <span className="text-xs font-bold text-slate-800 block">Fakta Medis:</span>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        Adiksi merusak sistem dopamin alami otak sehingga pemulihan membutuhkan terapi jangka panjang.
                                    </p>
                                </div>
                            </div>

                            {/* Kartu 2 */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400">02</span>
                                        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-100">
                                            PSIKOLOGIS
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Gangguan Mental & Emosional
                                        </h5>
                                    </div>
                                    <div className="space-y-3 text-slate-600 text-xs leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <span className="text-rose-500 font-bold mt-0.5">✖</span>
                                            <p>Depresi berat, kecemasan akut, paranoid tidak beralasan, serta risiko episode psikosis halusinatif.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-rose-500 font-bold mt-0.5">✖</span>
                                            <p>Perubahan kepribadian ekstrem, hilangnya motivasi belajar, dan apatis terhadap masa depan diri.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                    <span className="text-xs font-bold text-slate-800 block">Realitas Klinis:</span>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        Ketergantungan psikologis memicu perubahan perilaku drastis yang merusak relasi keluarga dan teman.
                                    </p>
                                </div>
                            </div>

                            {/* Kartu 3 */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400">03</span>
                                        <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold border border-sky-100">
                                            HUKUM & AKADEMIK
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-slate-900 leading-snug">
                                            Konsekuensi Hukum & Kampus
                                        </h5>
                                    </div>
                                    <div className="space-y-3 text-slate-600 text-xs leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <span className="text-rose-500 font-bold mt-0.5">✖</span>
                                            <p>Ancaman pidana penjara 4 hingga 20 tahun atau seumur hidup berdasarkan regulasi UU RI No. 35 Tahun 2009.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-rose-500 font-bold mt-0.5">✖</span>
                                            <p>Pencabutan status mahasiswa (Drop Out secara tidak hormat), pencabutan beasiswa, dan catatan kriminal permanen di SKCK.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1">
                                    <span className="text-xs font-bold text-emerald-700 block">Ketentuan POLINELA:</span>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        Kebijakan Zero Tolerance menjatuhkan sanksi pemecatan langsung tanpa toleransi bagi pengedar maupun pengguna aktif.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ================= NAVIGATION PAGE DOTS ================= */}
                <div className="flex items-center justify-center gap-3 pt-6">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                aria-label={`Pindah ke tab ${tab.label}`}
                                className={`transition-all duration-300 rounded-full ${
                                    isActive
                                        ? 'w-10 h-3 bg-[#0B3C65]' // Dot aktif berbentuk kapsul melebar sesuai gambar referensi[cite: 5]
                                        : 'w-3 h-3 bg-slate-200 hover:bg-slate-300' // Dot tidak aktif berbentuk lingkaran kecil
                                }`}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

function StepsSection() {
    return (
        <section className="py-16 border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0B3C65] mb-3">
                        3 Langkah Sederhana Melaporkan
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Desain alur yang efisien untuk meminimalkan beban mental pelapor dalam hitungan menit.
                    </p>
                </div>

                {/* Stepper Card Box */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
                    {/* Stepper Header line */}
                    <div className="relative mb-12">
                        <div className="absolute top-1/3 left-[20%] right-[20%] h-0.5 bg-gray-200 z-0"></div>
                        <div className="relative z-10 flex justify-between max-w-xl mx-auto">
                            {/* Step 1 indicator */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-[#0B3C65] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                                    1
                                </div>
                                <span className="text-xs font-semibold text-[#0B3C65] mt-2">Detail Kejadian</span>
                            </div>
                            {/* Step 2 indicator */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                                    2
                                </div>
                                <span className="text-xs font-medium text-gray-400 mt-2">Titik Lokasi</span>
                            </div>
                            {/* Step 3 indicator */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                                    3
                                </div>
                                <span className="text-xs font-medium text-gray-400 mt-2">Konfirmasi</span>
                            </div>
                        </div>
                    </div>

                    {/* Step Descriptions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-gray-100">
                        <div>
                            <span className="text-[10px] font-bold text-[#1A9CC8] bg-[#AFE4F6]/50 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                Tahap 1
                            </span>
                            <h4 className="text-sm font-bold text-[#0B3C65] mt-2 mb-1">
                                Tulis Kronologi
                            </h4>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Pilih kategori dugaan dan tuliskan fakta yang diketahui secara objektif.
                            </p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold text-[#1A9CC8] bg-[#AFE4F6]/50 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                Tahap 2
                            </span>
                            <h4 className="text-sm font-bold text-[#0B3C65] mt-2 mb-1">
                                Tentukan Lokasi
                            </h4>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Pilih gedung perkuliahan, laboratorium, asrama, atau lingkungan lingkar luar POLINELA yang bersangkutan.
                            </p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold text-[#1A9CC8] bg-[#AFE4F6]/50 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                Tahap 3
                            </span>
                            <h4 className="text-sm font-bold text-[#0B3C65] mt-2 mb-1">
                                Konfirmasi
                            </h4>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Konfirmasi bahwa laporan yang anda lakukan bukan laporan palsu dan dapat dipertimbangkan kebenarannya.
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-10 text-center">
                        <Link to="/lapor" className="px-8 py-3.5 rounded-xl bg-[#0B3C65] hover:bg-[#093050] text-white font-medium text-sm inline-flex items-center gap-3 shadow-md transition-all">
                            <span>Buka Formulir Pelaporan</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Beranda() {
    const [activeImage, setActiveImage] = useState(0);
    const [heroImages, setHeroImages] = useState(HERO_IMAGES);

    useEffect(() => {
        getHeroImages()
            .then(setHeroImages)
            .catch((error) => console.error('Gagal memuat gambar utama.', error));
    }, []);

    const changeImage = useCallback((direction) => {
        setActiveImage((current) =>
            direction === 'right'
                ? (current + 1) % heroImages.length
                : (current - 1 + heroImages.length) % heroImages.length
        );
    }, [heroImages.length]);

    useEffect(() => {
        // Set interval berganti gambar setiap 3 detik
        const interval = setInterval(() => {
            changeImage('right');
        }, 3000);

        // Cleanup interval saat komponen di-unmount atau callback berubah
        return () => clearInterval(interval);
    }, [changeImage]);

    return (
        <div className="min-h-screen bg-white flex flex-col text-[#1E293B]">
            <Navbar activePage="Beranda" />

            <main className="flex-1">
                {/* Hero Section */}
                <HeroSection
                    heroImages={heroImages}
                    activeImage={activeImage}
                    changeImage={changeImage}
                />

                {/* Landasan Hukum & Regulasi Narkotika */}
                <LandasanHukumSection />

                {/* Edukasi Narkoba */}
                <EdukasiNarkobaSection />

                {/* 3 Langkah Sederhana Melaporkan */}
                <StepsSection />
            </main>

            <Footer />
        </div>
    );
}
