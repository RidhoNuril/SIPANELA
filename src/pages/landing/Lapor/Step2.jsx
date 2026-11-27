export default function Step2({
    zone,
    setZone,
    specificLocation,
    setSpecificLocation,
    onPrevious,
    onNext
}) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E1E8EF] bg-white">
            <div className="h-1.5 bg-[#1CA1C7]" />
            <form className="p-6 sm:p-8" onSubmit={(event) => { event.preventDefault(); onNext(); }}>
                <header>
                    <h1 className="text-lg font-bold leading-tight text-[#17243A] sm:text-2xl">Tentukan Titik &amp; Patokan Lokasi Kejadian</h1>
                    <p className="mt-1 text-sm leading-relaxed text-[#52657C]">
                        Pilih area lingkungan kampus Politeknik Negeri Lampung (POLINELA) tempat terjadinya insiden untuk memudahkan verifikasi satgas.
                    </p>
                </header>

                <div className="mt-4">
                    <label htmlFor="campus-zone" className="block text-sm font-semibold text-[#172B45]">
                        Lokasi Kejadian <span className="text-[#E54646]">*</span>
                    </label>
                    <select
                        id="campus-zone"
                        required
                        value={zone}
                        onChange={(event) => setZone(event.target.value)}
                        className="mt-1 h-9 w-full rounded-lg border border-[#DCE5EE] bg-white px-3 text-xs text-[#52657C] outline-none focus:border-[#168BCC] focus:ring-2 focus:ring-[#168BCC]/15"
                    >
                        <option value="" disabled>Pilih salah satu zona/gedung kampus POLINELA...</option>
                        {['Gedung GSG POLINELA', 'Gedung Direktorat', 'Gedung Kuliah Bersama', 'Perpustakaan', 'Laboratorium', 'Area Parkir', 'Lapangan / Ruang Terbuka', 'Area lainnya'].map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <p className="mt-1 text-xs text-[#71849B]">Pilih zona perkiraan jika Anda tidak tahu nama pasti gedung tersebut.</p>
                </div>

                <div className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                        <label htmlFor="specific-location" className="block text-sm font-semibold text-[#172B45]">
                            Detail Patokan Spesifik <span className="text-[#E54646]">*</span>
                        </label>
                    </div>
                    <input
                        id="specific-location"
                        required
                        minLength={10}
                        value={specificLocation}
                        onChange={(event) => setSpecificLocation(event.target.value)}
                        placeholder="Contoh: Di samping tangga lantai 2 belakang lab komputer, dekat pos jaga lama"
                        className="mt-1 h-9 w-full rounded-lg border border-[#DCE5EE] px-3 text-xs text-[#263D58] outline-none placeholder:text-[#91A3B8] focus:border-[#168BCC] focus:ring-2 focus:ring-[#168BCC]/15"
                    />
                    <div className="mt-1 flex justify-between gap-2 text-xs text-[#71849B]">
                        <span>Sertakan petunjuk fisik visual yang mencolok (misal: warna pintu, dekat tong sampah besar, lantai gedung).</span>
                        <span className="shrink-0">Min. 10 karakter</span>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF1F5] pt-4">
                    <button type="button" onClick={onPrevious} className="rounded-lg border border-[#DCE5EE] bg-white px-4 py-2 text-sm font-medium text-[#263D58] transition-colors hover:bg-[#F7F9FB]">
                        ← Sebelumnya: Detail Kejadian
                    </button>
                    <button type="submit" disabled={!zone || specificLocation.trim().length < 10} className="inline-flex items-center gap-2 rounded-lg bg-[#0B3C65] px-4 py-2 text-sm font-medium text-white shadow-[0_2px_4px_rgba(11,60,101,0.22)] transition-colors hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50">
                        Selanjutnya: Konfirmasi &amp; Kirim →
                    </button>
                </div>
            </form>
        </section>

    );
}
