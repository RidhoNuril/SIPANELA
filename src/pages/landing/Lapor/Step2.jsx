import Icon from '../../../components/common/Icon';

export default function Step2({
    zone,
    setZone,
    specificLocation,
    setSpecificLocation,
    mapRef,
    locateCurrentPosition,
    locationError,
    movePin,
    pinPosition,
    setPinPosition,
    coordinates,
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
                        Gedung / Zona Kampus POLINELA <span className="text-[#E54646]">*</span>
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

                <div className="mt-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#172B45]">
                            <Icon name="location-pin-outline" className="h-3.5 w-3.5 text-[#08A5CF]" />
                            Simulasi Peta Kampus &amp; Pin Titik Koordinat
                        </h2>
                        <button type="button" onClick={locateCurrentPosition} className="inline-flex items-center gap-1 rounded-md border border-[#A5E8F6] bg-[#F0FCFF] px-2 py-1 text-xs font-medium text-[#075985] hover:bg-[#DFF7FD]">
                            <Icon name="crosshair" className="h-3 w-3" />
                            Gunakan Pin Lokasi Saat Ini
                        </button>
                    </div>

                    <div
                        ref={mapRef}
                        onClick={(event) => {
                            if (!event.target.closest('button')) movePin(event);
                        }}
                        className="relative h-54 overflow-hidden rounded-lg border border-[#D8E0EA] bg-[#E2E8F0] sm:h-54"
                        aria-label="Peta simulasi kampus. Geser pin untuk mengubah titik lokasi."
                    >
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 440" preserveAspectRatio="none" aria-hidden="true">
                            <rect width="1000" height="440" fill="#e2e8f0" />
                            <path d="M0 300H1000M490 0V440" stroke="#fff" strokeWidth="34" />
                            <path d="M0 300H1000M490 0V440" stroke="#cbd5e1" strokeWidth="2" />
                            <path d="M0 365H1000M550 0V440" stroke="#fff" strokeWidth="24" />
                            <path d="M0 365H1000M550 0V440" stroke="#cbd5e1" strokeWidth="2" />
                            <path d="M30 50 365 34 385 245 45 260Z" fill="#dcfce7" stroke="#86efac" strokeDasharray="5 6" />
                            <path d="M600 38 955 56 945 255 590 240Z" fill="#dcfce7" stroke="#86efac" strokeDasharray="5 6" />
                            <rect x="375" y="115" width="145" height="82" rx="8" fill="#cbd5e1" stroke="#94a3b8" />
                            <rect x="270" y="280" width="215" height="82" rx="8" fill="#cbd5e1" stroke="#94a3b8" />
                            <rect x="520" y="0" width="180" height="36" rx="8" fill="#cbd5e1" stroke="#94a3b8" />
                        </svg>
                        <span className="absolute left-2 top-2 rounded-full border border-[#BDE9D1] bg-white/95 px-2 py-1 text-[8px] font-medium text-[#24415C]">● Kawasan Kampus POLINELA Bandar Lampung</span>
                        <span className="absolute left-[51%] top-[4%] rounded-md border border-[#94a3b8] bg-[#cbd5e1] px-4 py-1 text-[8px] font-medium text-[#334155]">Lab Terpadu</span>
                        <span className="absolute left-[39%] top-[31%] flex h-[18%] w-[16%] items-center justify-center rounded-lg border border-[#94a3b8] bg-[#cbd5e1] text-[8px] font-medium text-[#334155]">GSG POLINELA</span>
                        <span className="absolute left-[28%] top-[65%] flex h-[19%] w-[23%] items-center justify-center rounded-lg border border-[#94a3b8] bg-[#cbd5e1] text-[8px] font-medium text-[#334155]">Budidaya Perkebunan</span>
                        <div className="absolute right-2 top-2 flex flex-col gap-1">
                            <button type="button" aria-label="Perbesar peta" className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs text-[#334155] shadow">+</button>
                            <button type="button" aria-label="Perkecil peta" className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs text-[#334155] shadow">−</button>
                            <button type="button" aria-label="Atur ulang peta" onClick={() => setPinPosition({ x: 50, y: 48 })} className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[10px] text-[#334155] shadow">⛶</button>
                        </div>
                        <button
                            type="button"
                            aria-label="Geser pin lokasi"
                            onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
                            onPointerMove={(event) => { if (event.buttons === 1) movePin(event); }}
                            onClick={(event) => event.stopPropagation()}
                            style={{ left: `${pinPosition.x}%`, top: `${pinPosition.y}%` }}
                            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center touch-none"
                        >
                            <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#E11D48] shadow-md">
                                <span className="h-2 w-2 rounded-full bg-white" />
                            </span>
                            <span className="-mt-0.5 rounded-full bg-[#064B70] px-2 py-0.5 text-[8px] font-medium text-white shadow">● Titik Geser (Ketuk untuk memindah)</span>
                        </button>
                        <div className="absolute bottom-2 left-2 rounded-md bg-[#075985] px-2 py-1 text-[8px] text-white shadow">
                            ♧ &nbsp;Lat/Long: {coordinates.latitude.toFixed(5)}, {coordinates.longitude.toFixed(5)} &nbsp; [WGS-84]
                        </div>
                        <span className="absolute bottom-2 right-2 rounded bg-white/95 px-2 py-1 text-[8px] text-[#52657C]">Ketuk area mana saja di peta untuk memindahkan pin</span>
                    </div>
                    {locationError && <p role="alert" className="mt-1 text-[10px] text-[#B42318]">{locationError}</p>}
                    <p className="mt-1.5 text-[10px] italic text-[#71849B]">*Pin dapat digeser secara manual untuk menentukan posisi yang akurat tanpa perlu berada di tempat kejadian.</p>
                </div>

                <aside className="mt-3 flex items-start gap-2 rounded-lg border-l-[3px] border-[#F43F5E] bg-[#FFF7F7] px-3 py-2.5 text-[10px] leading-relaxed text-[#52657C]">
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#E11D48] text-[9px] font-bold text-white">!</span>
                    <p><strong className="block text-[10px] text-[#BE123C]">Peringatan Protokol Keselamatan Saksi &amp; Pelapor</strong>
                        Pastikan Anda menentukan titik lokasi dari jarak aman. Tidak perlu mendekati pelaku atau kerumunan berisiko untuk mengambil titik koordinat langsung. Keselamatan diri Anda adalah prioritas mutlak.
                    </p>
                </aside>

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
