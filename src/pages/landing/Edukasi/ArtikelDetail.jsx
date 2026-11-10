import { Link } from 'react-router-dom';
import Footer from '../../../components/common/Footer.jsx';
import Navbar from '../../../components/common/Navbar.jsx';

const preventionPillars = [
    {
        title: 'Penguatan Literasi Bahaya Zat Psikoaktif Baru (NPS)',
        description:
            'Membedah mitos obat penunjang konsentrasi saat skripsi, serta identifikasi bahaya tembakau sintetis dan cairan rokok elektronik ilegal yang menyasar mahasiswa.',
    },
    {
        title: 'Keterampilan Asertif Teman Sebaya (Peer Refusal)',
        description:
            'Pelatihan intensif bagi Badan Eksekutif Mahasiswa (BEM) dan Unit Kegiatan Mahasiswa (UKM) untuk menolak desakan pergaulan tanpa rasa canggung atau terkucilkan.',
    },
    {
        title: 'Hotline Pelaporan Aman & Kerahasiaan Identitas (Whistleblower)',
        description:
            'Jaminan perlindungan identitas 100% bagi civitas akademika yang melaporkan indikasi peredaran gelap di area indeks maupun asrama kampus.',
    },
    {
        title: 'Rehabilitasi Humanis Tanpa Pengucilan',
        description:
            'Penegakan klausul rehabilitasi medis dan konseling psikologis sebelum penjatuhan sanksi akademik bagi korban penyalahgunaan zat.',
    },
];

export default function ArtikelDetail() {
    return (
        <div className="flex min-h-screen flex-col bg-[#F1F6FA] text-[#102B49]">
            <Navbar activePage="Edukasi" />

            <main className="w-full flex-1 px-5 pb-12 pt-7 sm:px-8 sm:pt-9">
                <article className="mx-auto max-w-3xl">
                    <Link
                        to="/edukasi"
                        className="inline-flex items-center gap-2 text-xs font-medium text-[#42566C] transition-colors hover:text-[#0878B8]"
                    >
                        <span aria-hidden="true">←</span>
                        Kembali ke Beranda Edukasi
                    </Link>

                    <header className="mt-7">
                        <h1 className="text-2xl font-bold leading-[1.15] tracking-tight text-[#111827] sm:text-[30px]">
                            Strategi Komprehensif Pencegahan Penyalahgunaan Narkoba di Lingkungan Kampus
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#718096]">
                            <span className="inline-flex items-center gap-1.5 font-medium text-[#26384B]">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0B3C65] text-[9px] font-semibold text-white">
                                    TS
                                </span>
                                Tim Satgas
                            </span>
                            <span aria-hidden="true" className="text-[#A7B3C0]">•</span>
                            <span className="font-medium text-[#0878B8]">Edukasi Terpadu</span>
                            <span aria-hidden="true" className="text-[#A7B3C0]">•</span>
                            <span>24 Juli 2025</span>
                            <span aria-hidden="true" className="text-[#A7B3C0]">•</span>
                            <span>6 Menit yang lalu</span>
                        </div>
                    </header>

                    <img
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=85"
                        alt="Kawasan perkotaan sebagai ilustrasi lingkungan kampus"
                        className="mt-4 aspect-16/10 w-full rounded-lg object-cover shadow-sm"
                    />

                    <div className="mt-5 space-y-3 text-[13px] leading-[1.75] text-[#42566C]">
                        <p>
                            <strong className="font-semibold text-[#26384B]">Bandar Lampung, Kampus Terpadu</strong>
                            {' '}– Politeknik Negeri Lampung terus mempertegas komitmennya dalam menciptakan ekosistem kampus Bersih Narkoba. Melalui sinergi terpadu antara Satuan Tugas Pencegahan dan Pemberantasan Penyalahgunaan dan Peredaran Gelap Narkotika (P4GN), tenaga medis, dan konselor sebaya mahasiswa, implementasi strategi kuratif dan preventif kini dijalankan secara menyeluruh dan berkelanjutan.
                        </p>
                        <p>
                            Tantangan era digital dan dinamika pergaulan modern menuntut pembaharuan pendekatan edukasi. Pola lama yang bersifat doktriner kini ditransformasikan menjadi literasi kesehatan berbasis bukti (evidence-based health awareness), perlindungan mental emosional yang ramah generasi muda, serta keterbukaan akses bantuan tanpa stigmatisasi moral.
                        </p>
                    </div>

                    <section className="mt-6">
                        <h2 className="text-base font-bold leading-snug text-[#182334]">
                            Pilar Utama Ketahanan Narkoba di Ruang Akademik
                        </h2>
                        <ol className="mt-3 space-y-2.5">
                            {preventionPillars.map((pillar) => (
                                <li key={pillar.title} className="relative pl-4 text-[12px] leading-[1.7] text-[#42566C] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#10A6D3]">
                                    <strong className="font-semibold text-[#26384B]">{pillar.title}:</strong>{' '}
                                    {pillar.description}
                                </li>
                            ))}
                        </ol>
                    </section>
                </article>
            </main>

            <Footer />
        </div>
    );
}
