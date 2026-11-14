import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout';
import Icon from '../../../components/common/Icon';
import { getArticleById, createArticle, updateArticle } from '../../../services/articleService.js';
import { getArticleCategories } from '../../../services/articleCategoryService.js';
import { demoArticleCategories, demoArticles } from '../../../data/demoData.js';

export default function FormArtikel({ mode = 'create', initialValues = {} }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditing = mode === 'edit';
	const initialValuesRef = useRef(initialValues);
	const [values, setValues] = useState(initialValues);
	const [categories, setCategories] = useState(demoArticleCategories);
	const [loading, setLoading] = useState(isEditing);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [isDemoData, setIsDemoData] = useState(true);
	const [isDemoArticle, setIsDemoArticle] = useState(false);
	const [judul, setJudul] = useState(initialValues.judul ?? '');
	const [kategori, setKategori] = useState(initialValues.id_category ? String(initialValues.id_category) : '');
	const [konten, setKonten] = useState(initialValues.deskripsi ?? '');
	const [thumbnail, setThumbnail] = useState(null);
	const [visibility, setVisibility] = useState(initialValues.is_public === false ? 'privasi' : 'publik');
	const mutationController = useRef(null);
	const mountedRef = useRef(true);

	useEffect(() => {
		const controller = new AbortController();
		let isMounted = true;
		mountedRef.current = true;

		async function loadFormData() {
			try {
				let categoryRows = demoArticleCategories;
				let article = initialValuesRef.current;
				let fallbackErrors = [];
				let articleIsDemo = false;
				try {
					const categoryResponse = await getArticleCategories({ signal: controller.signal });
					const responseCategories = Array.isArray(categoryResponse) ? categoryResponse : categoryResponse?.data;
					if (!Array.isArray(responseCategories)) {
						throw new Error('Respons kategori artikel harus berupa array atau memiliki properti data berbentuk array.');
					}
					categoryRows = responseCategories;
				} catch (loadError) {
					if (loadError.name === 'AbortError') return;
					fallbackErrors.push(loadError.message || 'Kategori artikel gagal dimuat.');
				}

				if (isEditing) {
					try {
						const articleResponse = await getArticleById(id, { signal: controller.signal });
						article = articleResponse?.data ?? articleResponse;
					} catch (loadError) {
						if (loadError.name === 'AbortError') return;
						article = demoArticles.find((item) => String(item.id_artikel) === id);
						articleIsDemo = Boolean(article);
						fallbackErrors.push(loadError.message || 'Artikel gagal dimuat.');
					}
				}

				if (isMounted) {
					setCategories(categoryRows);
					setValues(article);
					setJudul(article?.judul ?? '');
					setKategori(article?.id_category ? String(article.id_category) : '');
					setKonten(article?.deskripsi ?? '');
					setVisibility(article?.is_public === false ? 'privasi' : 'publik');
					setIsDemoData(fallbackErrors.length > 0);
					setIsDemoArticle(articleIsDemo);
					if (fallbackErrors.length) setError(fallbackErrors.join(' '));
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		loadFormData();
		return () => {
			isMounted = false;
			mountedRef.current = false;
			controller.abort();
			mutationController.current?.abort();
		};
	}, [id, isEditing]);

	async function handleSubmit(event) {
		event.preventDefault();
		if (isDemoArticle) {
			setError('Artikel demo tidak dapat disimpan. Sambungkan ke API untuk memperbarui artikel.');
			return;
		}
		const payload = {
			judul,
			id_category: Number(kategori),
			deskripsi: konten,
			is_public: visibility === 'publik',
		};
		if (thumbnail) {
			const formData = new FormData();
			Object.entries(payload).forEach(([key, value]) => formData.append(key, String(value)));
			formData.append('file_foto', thumbnail);
			mutationController.current = new AbortController();
			setSaving(true);
			setError('');
			try {
				if (isEditing) await updateArticle(id, formData, { signal: mutationController.current.signal });
				else await createArticle(formData, { signal: mutationController.current.signal });
				if (mountedRef.current) navigate('/dashboard/artikel');
			} catch (submitError) {
				if (mountedRef.current && submitError.name !== 'AbortError') setError(submitError.message || 'Artikel gagal disimpan.');
			} finally {
				if (mountedRef.current) setSaving(false);
			}
			return;
		}

		mutationController.current = new AbortController();
		setSaving(true);
		setError('');
		try {
			if (isEditing) await updateArticle(id, payload, { signal: mutationController.current.signal });
			else await createArticle(payload, { signal: mutationController.current.signal });
			if (mountedRef.current) navigate('/dashboard/artikel');
		} catch (submitError) {
			if (mountedRef.current && submitError.name !== 'AbortError') setError(submitError.message || 'Artikel gagal disimpan.');
		} finally {
			if (mountedRef.current) setSaving(false);
		}
	}

	if (loading) {
		return <DashboardLayout><p role="status" className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Memuat formulir artikel...</p></DashboardLayout>;
	}

	if (isEditing && !values?.id_artikel) {
		return (
			<DashboardLayout>
				<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
					<h2 className="text-xl font-bold text-[#0B3C65]">{error || 'Artikel tidak ditemukan'}</h2>
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
								<span className="text-xs text-slate-500">{judul.length} / 150 Karakter</span>
							</div>
							<input
								id="judul-artikel"
								name="judul"
								type="text"
								required
								maxLength={150}
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
								{categories.map((category) => <option key={category.id_category} value={category.id_category}>{category.nama_kategori}</option>)}
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
										<Icon name="cloud-arrow-up" />
									</span>
									<span className="text-xs font-semibold text-[#0B3C65]">
										{thumbnail?.name ?? (isEditing ? 'Ganti thumbnail (opsional)' : 'Tarik berkas ke sini, atau telusuri')}
									</span>
									{isEditing && values?.file_foto && !thumbnail && (
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

					{isDemoData && error && (
						<p role="alert" className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
							API tidak tersedia ({error}). Form menampilkan data demo; penyimpanan tetap memerlukan API.
						</p>
					)}

					{error && !isDemoData && (
						<p role="alert" className="mt-5 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
							{error}
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
							disabled={saving || categories.length === 0 || isDemoArticle}
							className="rounded-xl bg-[#0B3C65] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2E4D] disabled:opacity-60"
						>
							{saving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Simpan Artikel'}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
