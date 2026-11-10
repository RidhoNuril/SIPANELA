import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout';
import { initialArtikel } from './KelolaArtikelColumns';

const categories = ['Siaran Pers BNN', 'Edukasi Narkotika', 'Sosialisasi Kampus', 'Hukum Kampus'];

export default function FormArtikel({ mode = 'create', initialValues = {} }) {
	const { id } = useParams();
	const isEditing = mode === 'edit';
	const selectedArtikel = initialValues.id
		? initialValues
		: initialArtikel.find((artikel) => String(artikel.id) === id);
	const values = isEditing ? selectedArtikel : initialValues;
	const [judul, setJudul] = useState(values?.judul ?? '');
	const [kategori, setKategori] = useState(values?.kategori ?? '');
	const [konten, setKonten] = useState(values?.konten ?? '');
	const [thumbnail, setThumbnail] = useState(null);
	const [visibility, setVisibility] = useState(values?.visibility ?? 'publik');
	const [message, setMessage] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		setMessage('Tampilan form sudah siap. Penyimpanan artikel belum terhubung.');
	}

	if (isEditing && !selectedArtikel) {
		return (
			<DashboardLayout>
				<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
					<h2 className="text-xl font-bold text-[#0B3C65]">Artikel tidak ditemukan</h2>
					<Link to="/dashboard/artikel" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:underline">
						Kembali ke Kelola Artikel
					</Link>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="mx-auto max-w-full">
				<div className="mb-6">
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">
						{isEditing ? 'Edit Artikel' : 'Tambah Artikel'}
					</h2>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						Publikasikan informasi siaran pers, artikel edukasi bahaya narkoba, atau materi sosialisasi kampus.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
						<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
							<div className="flex items-center justify-between gap-3">
								<label htmlFor="judul-artikel" className="text-sm font-semibold text-slate-700">
									Judul Artikel <span className="text-rose-500">*</span>
								</label>
								<span className="text-xs text-slate-500">{judul.length} / 120 Karakter</span>
							</div>
							<input
								id="judul-artikel"
								name="judul"
								type="text"
								required
								maxLength={120}
								value={judul}
								onChange={(event) => setJudul(event.target.value)}
								placeholder="Isi judul artikel"
								className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
							/>

							<label htmlFor="kategori-artikel" className="mt-5 block text-sm font-semibold text-slate-700">
								Kategori Konten <span className="text-rose-500">*</span>
							</label>
							<select
								id="kategori-artikel"
								name="kategori"
								required
								value={kategori}
								onChange={(event) => setKategori(event.target.value)}
								className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
							>
								<option value="">== Pilih Kategori ==</option>
								{categories.map((category) => <option key={category} value={category}>{category}</option>)}
							</select>

							<label htmlFor="isi-artikel" className="mt-5 block text-sm font-semibold text-slate-700">
								Isi Konten Artikel <span className="text-rose-500">*</span>
							</label>
							<div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
								<div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-blue-50 px-2 py-2 text-slate-500" aria-hidden="true">
									{['B', 'I', 'U', 'H1', 'H2', '☷', '☰', '❞', '↗', '▧', '▦'].map((tool, index) => (
										<span key={`${tool}-${index}`} className="flex h-7 min-w-7 items-center justify-center rounded px-1.5 text-xs font-semibold">
											{tool}
										</span>
									))}
									<span className="ml-auto flex h-7 items-center px-2 text-sm">↶ ↷</span>
								</div>
								<textarea
									id="isi-artikel"
									name="konten"
									required
									value={konten}
									onChange={(event) => setKonten(event.target.value)}
									placeholder="Tuliskan isi artikel"
									className="min-h-64 w-full resize-y px-4 py-3 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-sky-100 sm:min-h-82.5"
								/>
							</div>
						</section>

						<aside className="space-y-5">
							<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
								<label htmlFor="thumbnail-artikel" className="flex items-center justify-between text-sm font-semibold text-[#0B3C65]">
									Thumbnail <span className="text-rose-500">*</span>
								</label>
								<label
									htmlFor="thumbnail-artikel"
									className="mt-3 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-300 bg-slate-50 px-4 py-4 text-center transition hover:bg-sky-50"
								>
									<span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-lg text-sky-700">
										<i className="bi bi-cloud-arrow-up" aria-hidden="true"></i>
									</span>
									<span className="text-xs font-semibold text-[#0B3C65]">
										{thumbnail?.name ?? (isEditing ? 'Ganti thumbnail (opsional)' : 'Tarik berkas ke sini, atau telusuri')}
									</span>
									{isEditing && values?.image && !thumbnail && (
										<span className="mt-1 text-[11px] text-slate-500">Thumbnail saat ini sudah tersedia</span>
									)}
									<span className="mt-1 text-[11px] leading-4 text-slate-500">Format: JPG, PNG, atau WEBP<br />(Maks. 5MB, rasio ideal 16:9)</span>
								</label>
								<input
									id="thumbnail-artikel"
									name="thumbnail"
									type="file"
									required={!isEditing}
									accept="image/jpeg,image/png,image/webp"
									onChange={(event) => setThumbnail(event.target.files?.[0] ?? null)}
									className="sr-only"
								/>
							</section>

							<fieldset className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
								<h1 className="px-1 text-sm font-semibold mb-5 text-[#0B3C65]">Visibilitas</h1>
								<div className="mt-2 space-y-2">
									{[
										{ value: 'publik', title: 'Publik (Semua Civitas & Terbuka)', description: 'Dapat diakses oleh publik luas dan indeks mesin pencari.' },
										{ value: 'privasi', title: 'Privasi', description: 'Memerlukan autentikasi akun POLINELA untuk membaca.' },
									].map((option) => (
										<label key={option.value} className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-3">
											<input
												type="radio"
												name="visibility"
												value={option.value}
												checked={visibility === option.value}
												onChange={(event) => setVisibility(event.target.value)}
												className="mt-0.5 accent-[#0B3C65]"
											/>
											<span>
												<span className="block text-xs font-semibold text-slate-700">{option.title}</span>
												<span className="mt-1 block text-[11px] leading-4 text-slate-500">{option.description}</span>
											</span>
										</label>
									))}
								</div>
							</fieldset>
						</aside>
					</div>

					{message && (
						<p role="status" className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
							{message}
						</p>
					)}

					<div className="mt-5 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-4 sm:flex-row">
						<Link
							to="/dashboard/artikel"
							className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
						>
							Batal
						</Link>
						<button
							type="submit"
							className="rounded-xl bg-[#0B3C65] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2E4D]"
						>
							{isEditing ? 'Simpan Perubahan' : 'Simpan Artikel'}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
