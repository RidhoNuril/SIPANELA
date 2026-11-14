import Icon from '../../../components/common/Icon';

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
    reportTypes,
    reportTypesLoading,
    reportTypesError,
    selectedReportTypeId,
    setSelectedReportTypeId,
    incidentTime,
    setIncidentTime,
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
                    <select id="category" name="id_jenis" required value={selectedReportTypeId} onChange={(event) => setSelectedReportTypeId(event.target.value)} disabled={reportTypesLoading} className="mt-2 h-11 w-full rounded-lg border border-[#DCE5EE] bg-white px-3 text-sm text-[#52657C] outline-none focus:border-[#168BCC] focus:ring-2 focus:ring-[#168BCC]/15 disabled:bg-slate-100">
                        <option value="" disabled>-- Pilih Kategori Pelanggaran --</option>
                        {reportTypes.map((type) => <option key={type.id_jenis} value={type.id_jenis}>{type.nama_jenis}</option>)}
                    </select>
                    {reportTypesError && <p role="alert" className="mt-2 text-xs text-red-600">{reportTypesError}</p>}
                    {!reportTypesLoading && reportTypes.length === 0 && !reportTypesError && <p className="mt-2 text-xs text-amber-700">Jenis laporan belum tersedia.</p>}
                </div>

                <div className="mt-5">
                    <label htmlFor="incident-time" className="block text-sm font-semibold text-[#172B45]">
                        Waktu Kejadian <span className="text-[#E54646]">*</span>
                    </label>
                    <input
                        id="incident-time"
                        name="waktu_kejadian"
                        type="datetime-local"
                        required
                        value={incidentTime}
                        onChange={(event) => setIncidentTime(event.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border border-[#DCE5EE] px-3 text-sm text-[#52657C] outline-none focus:border-[#168BCC] focus:ring-2 focus:ring-[#168BCC]/15"
                    />
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
                            <Icon name="cloud-upload-outline" className="h-5 w-5" />
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
                    <Icon name="info-circle-outline" className="mt-0.5 h-5 w-5 shrink-0 text-[#0B3C65]" />
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
                        <Icon name="arrow-right-long" className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </section>
    );
}
