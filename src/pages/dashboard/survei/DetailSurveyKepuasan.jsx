import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/common/DashboardLayout';
import { submitSatisfactionSurvey } from '../../../services/surveyService.js';

const QUESTIONS = [
	'Bagaimana tingkat kepuasan Anda terhadap kemudahan aplikasi SIPANELA dalam membantu proses pelaporan kasus penyalahgunaan atau peredaran narkoba?',
	'Seberapa puas Anda terhadap kesigapan Satgas dalam menindaklanjuti laporan dugaan penyalahgunaan atau peredaran narkoba?',
	'Bagaimana penilaian Anda terhadap kecepatan dan kejelasan proses penanganan laporan kasus narkoba melalui SIPANELA?',
];

export default function DetailSurveyKepuasan() {
	const { ticketId } = useParams();
	const [ratings, setRatings] = useState([null, null, null]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const updateRating = (questionIndex, rating) => {
		setRatings((currentRatings) =>
			currentRatings.map((currentRating, index) =>
				index === questionIndex ? rating : currentRating,
			),
		);
		setErrorMessage('');
		setSuccessMessage('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (ratings.some((rating) => rating === null)) {
			setErrorMessage('Silakan isi semua penilaian sebelum mengirim survei.');
			return;
		}

		setIsSubmitting(true);
		setErrorMessage('');
		setSuccessMessage('');

		try {
			await submitSatisfactionSurvey({
				idTiket: ticketId,
				ratings,
			});
			setSuccessMessage('Survei berhasil dikirim. Terima kasih atas penilaian Anda.');
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message || 'Survei gagal dikirim. Silakan coba kembali.',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<DashboardLayout>
			<div>
				<div className="mb-5">
					<h2 className="text-2xl font-bold tracking-tight text-[#0B3C65]">
						Survei Kepuasan Pelaporan
					</h2>
					<p className="mt-1 text-xs text-[#8292a5]">
						Berikan penilaian Anda terhadap layanan pelaporan dan penanganan Satgas Anti Narkoba POLINELA.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="mx-auto max-w-120 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
				>
					<label
						htmlFor="survey-ticket"
						className="mb-1 block text-[14px] font-bold text-[#344054]"
					>
						Nama Pelapor / ID Tiket
					</label>
					<input
						id="survey-ticket"
						type="text"
						value={ticketId || ''}
						readOnly
						className="w-full rounded-lg bg-[#edf4ff] px-3 py-2 text-xs font-semibold text-[#91a2ba] outline-none"
					/>

					<div className="my-3 border-t border-slate-100" />

					<div className="space-y-4">
						{QUESTIONS.map((question, questionIndex) => (
							<fieldset key={question} className="min-w-0">
								<legend className="mb-3 px-1 text-[14px] font-semibold leading-[1.4] text-[#344054]">
									<span className="mr-1">{questionIndex + 1}.</span>
									{question}
								</legend>
								<div
									role="radiogroup"
									aria-label={`Penilaian pertanyaan ${questionIndex + 1}`}
									className="grid grid-cols-5 gap-2"
								>
									{[1, 2, 3, 4, 5].map((rating) => (
										<label key={rating} className="cursor-pointer">
											<input
												type="radio"
												name={`rating-${questionIndex}`}
												value={rating}
												checked={ratings[questionIndex] === rating}
												onChange={() => updateRating(questionIndex, rating)}
												required
												className="peer sr-only"
											/>
											<span className="flex h-10 items-center justify-center rounded-md border border-[#d5dfeb] bg-white text-[14px] font-medium text-[#53647a] transition-colors peer-checked:border-[#0B3C65] peer-checked:bg-[#0B3C65] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0B3C65]">
												{rating}
											</span>
										</label>
									))}
								</div>
								<div className="mt-1 flex justify-between text-[12px] text-[#8292a5]">
									<span>Tidak Puas</span>
									<span>Sangat Puas</span>
								</div>
							</fieldset>
						))}
					</div>

					<div className="mt-3 border-t border-slate-100 pt-4">
						{errorMessage && (
							<p role="alert" className="mb-3 text-xs font-medium text-rose-600">
								{errorMessage}
							</p>
						)}
						{successMessage && (
							<p role="status" className="mb-3 text-xs font-medium text-emerald-700">
								{successMessage}
							</p>
						)}
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-lg bg-[#0B3C65] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#092f50] disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSubmitting ? 'Mengirim...' : 'Kirim Survei'}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}