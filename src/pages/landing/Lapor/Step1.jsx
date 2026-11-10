const categories = [
    'Peredaran Narkotika',
    'Penyalahgunaan Narkotika',
    'Penyalahgunaan Zat Adiktif',
    'Lainnya'
];

export default function Step1({
    description,
    setDescription,
    selectedFile,
    fileError,
    isDragging,
    setIsDragging,
    selectFile,
    clearDraft,
    fileInputRef,
    onNext
}) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E1E8EF] bg-white">
            <div className="h-1.5 bg-[#1CA1C7]" />
            <form id="report-form" className="p-6 sm:p-8" onSubmit={(event) => { event.preventDefault(); onNext(); }}>
                <div className="border-b border-[#EDF1F5] pb-5">
                    <h1 className="text-xl font-bold leading-tight text-[#0B3C65] sm:text-2xl">Formulir Pelaporan Publik</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#71849B]">
                        Langkah 1 dari 3: Masukkan rincian insiden yang Anda ketahui secara obyektif tanpa menyebut identitas pribadi Anda.
                    </p>
                </div>

                <div className="mt-6">
                    <label htmlFor="category" className="block text-sm font-semibold text-[#172B45]">
                        Kategori Jenis Pelanggaran <span className="text-[#E54646]">*</span>
                    </label>
                    <p className="mt-1 text-xs text-[#71849B]">Pilih klasifikasi yang paling mendekati situasi yang Anda saksikan.</p>
                    <select id="category" name="category" required defaultValue="" className="mt-2 h-11 w-full rounded-lg border border-[#DCE5EE] bg-white px-3 text-sm text-[#52657C] outline-none focus:border-[#168BCC] focus:ring-2 focus:ring-[#168BCC]/15">
                        <option value="" disabled>-- Pilih Kategori Pelanggaran --</option>
                        {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                        <label htmlFor="description" className="text-sm font-semibold text-[#172B45]">
                            Kronologi Kejadian <span className="text-[#E54646]">*</span>
                        </label>
                        <span className="shrink-0 text-xs text-[#8EA2B9]">{description.length} / 2000 Karakter</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#71849B]">Jelaskan apa yang terjadi, waktu perkiraan, indikasi pola, ciri-ciri pelaku tanpa membahayakan keselamatan Anda.</p>
                    <textarea
                        id="description"
                        name="description"
                        required
                        maxLength={2000}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Contoh: Terlihat aktivitas mencurigakan berupa transaksi paket kecil berulang pada pukul 23:00 WIB di gang&#10;sempit..."
                        className="mt-2 h-36 w-full resize-y rounded-lg border border-[#DCE5EE] px-3 py-3 text-sm leading-relaxed text-[#263D58] outline-none placeholder:text-[#91A3B8] focus:border-[#168BCC] focus:ring-2 focus:ring-[#168BCC]/15 sm:h-40"
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-semibold text-[#172B45]">Unggah Bukti Pendukung (Opsional)</label>
                    <p className="mt-1 text-xs text-[#71849B]">Format yang didukung: JPG, PNG, MP4 (Maks. 25MB per berkas).</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.mp4,image/jpeg,image/png,video/mp4"
                        className="sr-only"
                        aria-label="Pilih file bukti pendukung"
                        onChange={(event) => selectFile(event.target.files?.[0])}
                    />
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                fileInputRef.current?.click();
                            }
                        }}
                        onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(event) => {
                            event.preventDefault();
                            setIsDragging(false);
                            selectFile(event.dataTransfer.files?.[0]);
                        }}
                        className={`mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-5 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#168BCC]/30 sm:min-h-36 ${isDragging ? 'border-[#0B83C5] bg-[#EAF7FC]' : 'border-[#168BCC] bg-[#F9FCFE] hover:bg-[#F0F9FD]'}`}
                    >
                        <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C65] text-white">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0L9 11m3-3 3 3M7 16.5a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17 9a3.5 3.5 0 0 1 .5 6.97" />
                            </svg>
                        </span>
                        {selectedFile ? (
                            <span className="max-w-[90%] truncate text-sm text-[#172B45]">{selectedFile.name}</span>
                        ) : (
                            <span className="text-sm text-[#172B45]">
                                Tarik dan lepaskan file bukti di sini, atau <span className="font-semibold text-[#0878B8] underline">pilih dari perangkat</span>
                            </span>
                        )}
                    </div>
                    {fileError && <p role="alert" className="mt-2 text-xs text-red-600">{fileError}</p>}
                </div>

                <aside className="mt-5 flex min-h-16 items-start gap-3 border-l-4 border-[#0B3C65] bg-[#F7F9FB] px-4 py-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#0B3C65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" d="M12 11v5m0-8h.01" />
                    </svg>
                    <p className="text-xs leading-relaxed text-[#52657C]">
                        <strong className="mb-0.5 block text-sm text-[#172B45]">Penting demi keselamatan Anda:</strong>
                        Jangan mengambil gambar atau mengumpulkan bukti apabila situasi membahayakan fisik Anda. Keselamatan diri Anda adalah prioritas utama kami.
                    </p>
                </aside>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF1F5] pt-5">
                    <button type="button" onClick={clearDraft} className="rounded-lg border border-[#DCE5EE] bg-white px-4 py-2.5 text-sm text-[#263D58] transition-colors hover:bg-[#F7F9FB]">
                        Batal &amp; Hapus Draft
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#0B3C65] px-4 py-2.5 text-sm font-medium text-white shadow-[0_2px_4px_rgba(11,60,101,0.22)] transition-colors hover:bg-[#082F50]">
                        Selanjutnya: Tentukan Lokasi
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M3.5 10a.75.75 0 0 1 .75-.75h10.19L11.22 6.03a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H4.25A.75.75 0 0 1 3.5 10Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </form>
        </section>
    );
}
