import Icon from '../../../components/common/Icon';

export default function Step4({ submittedAt }) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E1E8EF] bg-white">
            <div className="h-1.5 bg-[#1CA1C7]" />
            <div className="p-6 sm:p-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F0F3F5]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#16803C] text-white shadow-md">
                        <Icon name="verified-badge" className="h-9 w-9" />
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-[#0B2F4D] sm:text-[28px]">Laporan Berhasil Dikirimkan</h1>
                    <p className="mx-auto mt-1.5 max-w-lg text-sm leading-relaxed text-[#6B7280]">
                        Terima kasih atas kontribusi Anda dalam menjaga integritas, etika, dan keamanan lingkungan kampus <strong className="text-[#0B3C65]">Politeknik Negeri Lampung</strong>.
                    </p>
                </div>

                <div className="mt-5 grid gap-3 rounded-lg bg-[#F1F3F5] p-4 sm:grid-cols-2">
                    <div className="rounded-md bg-white px-3 py-3">
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-[#718096]">Status Tindak Lanjut</p>
                        <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E8] px-2.5 py-1 text-[10px] font-medium text-[#B45309]">
                            <span className="h-2 w-2 rounded-full bg-[#D97706]" />
                            Menunggu Triage Verifikator Satgas
                        </p>
                    </div>
                    <div className="rounded-md bg-white px-3 py-3">
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-[#718096]">Waktu Pencatatan Log</p>
                        <p className="mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-[#374151]">
                            <Icon name="clock" className="h-3.5 w-3.5 text-[#64748B]" />
                            {submittedAt ? submittedAt.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Jakarta' }) : '—'} WIB
                        </p>
                    </div>
                </div>

                <aside className="mt-1.5 rounded-lg bg-[#EFF6FF] px-4 py-4">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-[#163C5B]">
                        <Icon name="file-check" className="h-4 w-4" />
                        Apa tahapan berikutnya?
                    </h2>
                    <ul className="mt-2 space-y-2 text-xs leading-relaxed text-[#5B6573]">
                        <li className="flex items-start gap-2">
                            <Icon name="circle-check-outline" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#159447]" />
                            Tim Verifikator Satgas POLINELA akan meninjau patokan lokasi fisik dan kronologi kasus dalam kurun waktu <strong>1×24 jam kerja.</strong>
                        </li>
                        <li className="flex items-start gap-2">
                            <Icon name="circle-info-outline" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748B]" />
                            Sesuai status POLINELA, perlindungan saksi dijamin penuh selama laporan diajukan secara objektif dan beritikad baik.
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    );
}
