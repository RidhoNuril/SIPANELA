import Icon from '../../../components/common/Icon';

export default function Step3({
    agreedToAccuracy,
    setAgreedToAccuracy,
    agreedToRisk,
    setAgreedToRisk,
    onPrevious,
    onSubmitSuccess,
    submitting,
    submissionError,
    retryingEvidence,
}) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E1E8EF] bg-white">
            <div className="h-1.5 bg-[#1CA1C7]" />
            <form
                className="p-6 sm:p-8"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!agreedToAccuracy || !agreedToRisk) return;
                    onSubmitSuccess();
                }}
            >
                <header>
                    <h1 className="text-xl font-bold leading-tight text-[#0B3C65] sm:text-2xl">Pernyataan &amp; Persetujuan Pelapor</h1>
                    <p className="mt-1 text-sm leading-relaxed text-[#71849B]">
                        Langkah 3 dari 3: Verifikasi ringkasan dan setujui komitmen integritas sebelum mengirimkan laporan terenkripsi.
                    </p>
                </header>

                <div className="mt-7 space-y-6">
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 text-sm leading-relaxed text-[#40536D] transition-colors hover:bg-[#F7FAFC]">
                        <input type="checkbox" checked={agreedToAccuracy} onChange={(event) => setAgreedToAccuracy(event.target.checked)} className="peer sr-only" />
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#9AAEC1] bg-white text-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-[#168BCC] peer-checked:border-[#0B3C65] peer-checked:bg-[#0B3C65] peer-checked:text-white">
                            <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        <span>Saya menyatakan informasi yang saya laporkan benar adanya dan bertujuan untuk menjaga integritas serta keamanan kampus <strong className="text-[#0B3C65]">POLINELA</strong>.</span>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 text-sm leading-relaxed text-[#40536D] transition-colors hover:bg-[#F7FAFC]">
                        <input type="checkbox" checked={agreedToRisk} onChange={(event) => setAgreedToRisk(event.target.checked)} className="peer sr-only" />
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#9AAEC1] bg-white text-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-[#168BCC] peer-checked:border-[#0B3C65] peer-checked:bg-[#0B3C65] peer-checked:text-white">
                            <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        <span>Saya bersedia menerima risiko sesuai dengan peraturan jika pelaporan yang saya laporkan palsu atau berbohong.</span>
                    </label>
                </div>

                {submissionError && <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{submissionError}</p>}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF1F5] pt-5">
                    <button type="button" onClick={onPrevious} className="rounded-lg border border-[#DCE5EE] bg-white px-4 py-2.5 text-sm font-medium text-[#263D58] transition-colors hover:bg-[#F7F9FB]">
                        ← Sebelumnya: Ubah Lokasi
                    </button>
                    <button type="submit" disabled={!agreedToAccuracy || !agreedToRisk || submitting} className="rounded-lg bg-[#0B3C65] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_4px_rgba(11,60,101,0.22)] transition-colors hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50">
                        {submitting ? 'Mengirim...' : retryingEvidence ? 'Coba Ulang Unggah Bukti' : 'Kirim Laporan'}
                    </button>
                </div>
            </form>
        </section>

    );
}
