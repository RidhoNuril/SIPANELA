import Footer from '../../components/common/Footer.jsx';
import Navbar from '../../components/common/Navbar.jsx';
import Icon from '../../components/common/Icon';

const leaders = [
    {
        name: 'Prof. Novita Tresiana, S.Sos., M.Si.',
        role: 'Penanggung Jawab Satgas P4GN POLINELA',
        image: 47
    },
    {
        name: 'Indrayati Putri Idrus, S.H., M.H.',
        role: 'Koordinator Regulasi & Penindakan Hukum',
        image: 44
    },
    {
        name: 'Eko Budi Sulistio, S.Sos., M.Ap.',
        role: 'Manajemen Administrasi & Pelaporan Terpadu',
        image: 12
    }
];

const members = [
    { name: 'Rengga Fransseda, A.Md.', role: 'Logistik & Operasional Lapangan', image: 13 },
    { name: 'Muhammad Ubaidillah', role: 'Edukasi Mahasiswa & Kampanye Kreatif', image: 14 },
    { name: 'Ahmad Suntara, S.Kom.', role: 'Infrastruktur SIPANELA & Data Keamanan', image: 15 },
    { name: 'Yusrizal, S.P., MM.', role: 'Koordinasi Antar Jurusan & Ormawa', image: 16 },
    { name: 'M. Yhoga Ismail Ibn Ibrahim, M.T.I.', role: 'Analisis Siber & Pengaduan Anonim', image: 18 },
    { name: 'dr. Tri Umiana Soleha', role: 'Pemeriksaan Medis & Triase Screening', image: 20 },
    { name: 'Nidia Putri, S.Pd.', role: 'Bimbingan Perkuliahan & Pencegahan Dini', image: 21 },
    { name: 'Hanny Nurluthfiah Rianti, A.A.', role: 'Liaison Mahasiswa & Hubungan Masyarakat', image: 24, light: true },
    { name: 'M. Semario Ibrahim Habib Al Huda', role: 'Divisi Relawan & Peer Counselor', image: 33 },
    { name: 'Niabi Rahma Wati', role: 'Advokasi Gender & Perlindungan Saksi', image: 32 },
    { name: 'Mayang Atika Sekar Kirani', role: 'Sosialisasi Asrama & Unit Kegiatan', image: 25 },
    { name: 'Olivia Elizabeth Sekar Lumbantobing', role: 'Penerimaan & Validasi Berkas Pelapor', image: 26 },
    { name: 'Martha Vinencia Putri Singga', role: 'Dokumentasi & Arsip Kasus Rahasia', image: 28 },
    { name: 'Kurnia Tri Rahayu', role: 'Pendampingan Psikososial Awal', image: 44 },
    { name: 'Prof. Dr. Noverman Budiadi, M.Si.', role: 'Pakar Kebijakan Publik & Konseling Pemulihan', image: 60, consultant: true },
    { name: 'Dr. Budiyono, MH.', role: 'Pakar Hukum Pidana Narkotika & Advokasi', image: 68, consultant: true }
];

function MemberCard({ member, leadership = false }) {
    return (
        <article className={`flex min-h-51.25 flex-col items-center rounded-lg border p-4 text-center shadow-sm transition-transform hover:-translate-y-1 ${member.light
                ? 'border-[#D8E2EA] bg-white text-[#0B3C65]'
                : 'border-[#1B527C] bg-[#10436B] text-white'
            }`}>
            <img
                src={`https://i.pravatar.cc/160?img=${member.image}`}
                alt=""
                loading="lazy"
                className="mb-2 h-19 w-19 rounded-xl border-[3px] border-white/70 object-cover shadow-sm"
            />
            <span className={`mb-2 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${member.consultant
                    ? 'bg-[#0D7A3A] text-white'
                    : member.light
                        ? 'bg-[#E8F0F6] text-[#42607A]'
                        : 'bg-white/15 text-[#C4D7E6]'
                }`}>
                {member.consultant ? 'Konselor / Fasilitator' : leadership ? ['Ketua', 'Wakil Ketua', 'Sekretaris'][leaders.indexOf(member)] : member.light ? 'Anggota Satgas' : 'Anggota'}
            </span>
            <h3 className="text-sm font-bold leading-snug">{member.name}</h3>
            <p className={`mt-1 text-[10px] leading-relaxed ${member.light ? 'text-[#52657C]' : 'text-[#D0DFEA]'}`}>{member.role}</p>
            {member.light && (
                <div className="mt-auto flex w-full justify-center gap-2 border-t border-[#EDF1F5] pt-3 text-[10px] text-[#73869A]" aria-label="Media sosial">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF2F5]">in</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF2F5]">◎</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF2F5]">✉</span>
                </div>
            )}
        </article>
    );
}

export default function Tentang() {
    return (
        <div className="min-h-screen bg-white text-[#102B49]">
            <Navbar activePage="Tentang" />

            <main>
                <section className="mx-auto max-w-7xl px-6 pb-12 pt-10 sm:px-8 sm:pt-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E2EC] bg-[#F0F6FA] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0B3C65]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1A9CC8]" />
                            Profil Organisasi
                        </span>
                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B3C65] sm:text-4xl">TENTANG KAMI</h1>
                        <span className="mx-auto mt-2 block h-1 w-12 rounded-full bg-[#0B3C65]" />
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#52657C]">
                            Mengenal lebih dekat SATGAS P4GN POLINELA dalam mewujudkan lingkungan pendidikan vokasi yang bersih, aman, dan berintegritas tanpa toleransi terhadap peredaran dan penyalahgunaan narkoba.
                        </p>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2">
                        <article className="relative overflow-hidden rounded-lg border border-[#E0E7ED] bg-[#F7F9FA] p-6 shadow-sm">
                            <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-[#0B3C65]/4" />
                            <div className="relative">
                                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#E4EBF0] text-[#0B3C65]">
                                    <Icon name="eye-outline" className="h-5 w-5" />
                                </span>
                                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#71849B]">Pedoman Utama</p>
                                <h2 className="mt-1 text-2xl font-extrabold text-[#0B3C65]">VISI</h2>
                                <p className="mt-2 max-w-md text-sm font-semibold italic leading-relaxed text-[#1E293B]">
                                    “Menjadi Kampus Bersinar (Bersih dari Narkoba) dan Berintegritas Tinggi.”
                                </p>
                                <p className="mt-10 flex items-center gap-1.5 text-[10px] text-[#52657C]">
                                    <span className="text-emerald-600">◎</span> Standar Nasional Kemendiktisaintek &amp; BNN RI
                                </p>
                            </div>
                        </article>

                        <article className="relative overflow-hidden rounded-lg border border-[#0B3C65] bg-[#0D3D64] p-6 text-white shadow-sm">
                            <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-black/10" />
                            <div className="relative">
                                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15">
                                    <Icon name="power" className="h-5 w-5" />
                                </span>
                                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B7CADA]">Misi Operasional</p>
                                <h2 className="mt-1 text-2xl font-extrabold">MISI</h2>
                                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#E1EAF1]">
                                    “Melakukan deteksi dini dan screening komprehensif, edukasi preventif terstruktur, serta penyelenggaraan layanan advokasi, rehabilitasi dan konseling dalam upaya P4GN terpadu di lingkungan kampus Politeknik Negeri Lampung.”
                                </p>
                                <p className="mt-5 flex items-center gap-1.5 text-[10px] text-[#B7CADA]">
                                    <span>◉</span> Tindakan Berkelanjutan &amp; Perlindungan Korban
                                </p>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="bg-[#F1F6FA] px-6 py-12 sm:px-8 sm:py-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center">
                            <h2 className="text-2xl font-extrabold tracking-tight text-[#0B3C65] sm:text-3xl">STRUKTUR ORGANISASI</h2>
                            <span className="mx-auto mt-2 block h-1 w-12 rounded-full bg-[#0B3C65]" />
                            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52657C]">
                                Dedikasi untuk Almamater &amp; Integritas Kampus
                            </p>
                        </div>

                        <div className="mx-auto mt-9 max-w-3xl">
                            <div className="mb-4 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-wider text-[#52657C]">
                                <span className="h-px flex-1 bg-[#D9E3EB]" />
                                Pimpinan Utama Satgas
                                <span className="h-px flex-1 bg-[#D9E3EB]" />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {leaders.map((leader) => <MemberCard key={leader.name} member={leader} leadership />)}
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {members.map((member) => <MemberCard key={member.name} member={member} />)}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
