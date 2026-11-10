export default function Step4({ submittedAt }) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E1E8EF] bg-white">
            <div className="h-1.5 bg-[#1CA1C7]" />
            <div className="p-6 sm:p-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F0F3F5]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#16803C] text-white shadow-md">
                        <svg className="h-9 w-9" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                            <path d="m16 2 3.1 3.2 4.4-.2 1.8 4 4 1.8-.2 4.4L32 18l-3.2 3.1.2 4.4-4 1.8-1.8 4-4.4-.2L16 34l-3.1-3.2-4.4.2-1.8-4-4-1.8.2-4.4L0 18l3.2-3.1L3 10.5l4-1.8 1.8-4 4.4.2L16 2Z" transform="translate(0 -2) scale(.94)" />
                            <path d="m13.5 18.5-3-3-1.8 1.8 4.8 4.8 9.8-9.8-1.8-1.8-8 8Z" fill="#16803C" />
                        </svg>
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
                            <svg className="h-3.5 w-3.5 text-[#64748B]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                                <circle cx="10" cy="10" r="7" />
                                <path strokeLinecap="round" d="M10 6v4l2.5 1.5" />
                            </svg>
                            {submittedAt ? submittedAt.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Jakarta' }) : '—'} WIB
                        </p>
                    </div>
                </div>

                <aside className="mt-1.5 rounded-lg bg-[#EFF6FF] px-4 py-4">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-[#163C5B]">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M8 13h8m-8 4h8" />
                            <circle cx="18" cy="18" r="3" fill="white" />
                            <path strokeLinecap="round" d="m17 18 1 1 2-2" />
                        </svg>
                        Apa tahapan berikutnya?
                    </h2>
                    <ul className="mt-2 space-y-2 text-xs leading-relaxed text-[#5B6573]">
                        <li className="flex items-start gap-2">
                            <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#159447]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                <circle cx="10" cy="10" r="7" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="m7 10 2 2 4-4" />
                            </svg>
                            Tim Verifikator Satgas POLINELA akan meninjau patokan lokasi fisik dan kronologi kasus dalam kurun waktu <strong>1×24 jam kerja.</strong>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748B]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                <circle cx="10" cy="10" r="7" />
                                <path strokeLinecap="round" d="M10 9v4m0-6h.01" />
                            </svg>
                            Sesuai status POLINELA, perlindungan saksi dijamin penuh selama laporan diajukan secara objektif dan beritikad baik.
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    );
}
