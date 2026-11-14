import { useEffect, useRef, useState } from 'react';
import Footer from '../../../components/common/Footer.jsx';
import Navbar from '../../../components/common/Navbar.jsx';
import Step1 from './Step1.jsx';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';
import Step4 from './Step4.jsx';
import { getReportTypes } from '../../../services/reportTypeService.js';
import { createReport } from '../../../services/reportService.js';
import { createReportEvidence } from '../../../services/reportEvidenceService.js';
import { demoReportTypes } from '../../../data/demoData.js';

function unwrapItems(response) {
    const items = Array.isArray(response) ? response : response?.data;
    if (!Array.isArray(items)) {
        throw new Error('Respons jenis laporan harus berupa array atau memiliki properti data berbentuk array.');
    }
    return items;
}

export default function Lapor() {
    const [step, setStep] = useState(1);
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [zone, setZone] = useState('');
    const [specificLocation, setSpecificLocation] = useState('');
    const [pinPosition, setPinPosition] = useState({ x: 50, y: 48 });
    const [coordinates, setCoordinates] = useState({ latitude: -5.35824, longitude: 105.23142 });
    const [locationError, setLocationError] = useState('');
    const [agreedToAccuracy, setAgreedToAccuracy] = useState(false);
    const [agreedToRisk, setAgreedToRisk] = useState(false);
    const [submittedAt, setSubmittedAt] = useState(null);
    const [reportTypes, setReportTypes] = useState(demoReportTypes);
    const [reportTypesLoading, setReportTypesLoading] = useState(true);
    const [reportTypesError, setReportTypesError] = useState('');
    const [isDemoReportTypes, setIsDemoReportTypes] = useState(true);
    const [selectedReportTypeId, setSelectedReportTypeId] = useState('');
    const [incidentTime, setIncidentTime] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [pendingEvidenceReportId, setPendingEvidenceReportId] = useState(null);
    const [reportCreatedWithoutId, setReportCreatedWithoutId] = useState(false);
    const mapRef = useRef(null);
    const fileInputRef = useRef(null);
    const submissionController = useRef(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;
        mountedRef.current = true;

        async function loadReportTypes() {
            try {
                const response = await getReportTypes({ signal: controller.signal });
                const items = unwrapItems(response);
                if (isMounted) {
                    setReportTypes(items);
                    setIsDemoReportTypes(false);
                }
            } catch (error) {
                if (isMounted && error.name !== 'AbortError') {
                    setReportTypesError(error.message || 'Jenis laporan gagal dimuat.');
                }
            } finally {
                if (isMounted) setReportTypesLoading(false);
            }
        }

        loadReportTypes();
        return () => {
            isMounted = false;
            mountedRef.current = false;
            controller.abort();
            submissionController.current?.abort();
        };
    }, []);

    const selectFile = (file) => {
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        if (!allowedTypes.includes(file.type)) {
            setFileError('Format file harus JPG, PNG, atau MP4.');
            return;
        }
        if (file.size > 25 * 1024 * 1024) {
            setFileError('Ukuran file maksimal 25 MB.');
            return;
        }

        setFileError('');
        setSelectedFile(file);
    };

    const clearDraft = () => {
        document.getElementById('report-form')?.reset();
        setDescription('');
        setSelectedFile(null);
        setFileError('');
        setSelectedReportTypeId('');
        setIncidentTime('');
    };

    const submitReport = async () => {
        if (isDemoReportTypes) {
            setSubmissionError('Jenis laporan yang dipilih berasal dari data demo. Pengiriman memerlukan opsi yang berhasil dimuat dari API.');
            return;
        }
        if (reportCreatedWithoutId) {
            setSubmissionError('Laporan telah dikirim, tetapi backend tidak memberikan ID laporan. Hubungi administrator agar bukti dapat ditautkan.');
            return;
        }
        if (!selectedReportTypeId || !incidentTime || !zone || !specificLocation.trim()) {
            setSubmissionError('Lengkapi jenis, waktu, dan lokasi kejadian sebelum mengirim laporan.');
            return;
        }

        const reportType = reportTypes.find((type) => String(type.id_jenis) === selectedReportTypeId);
        submissionController.current = new AbortController();
        setSubmitting(true);
        setSubmissionError('');
        try {
            let reportId = pendingEvidenceReportId;
            let response = null;
            if (!reportId) {
                response = await createReport({
                    id_jenis: Number(selectedReportTypeId),
                    judul: `Laporan ${reportType?.nama_jenis ?? ''}`.trim().slice(0, 75),
                    deskripsi_kejadian: description,
                    lokasi_kejadian: `${zone} - ${specificLocation}`.slice(0, 150),
                    waktu_kejadian: new Date(incidentTime).toISOString(),
                    status: 'Menunggu',
                    is_anonymous: true,
                }, { signal: submissionController.current.signal });
                reportId = response?.id_laporan ?? response?.data?.id_laporan;
            }

            if (selectedFile) {
                if (!reportId) {
                    setReportCreatedWithoutId(true);
                    throw new Error('Laporan telah dikirim, tetapi API tidak mengembalikan id_laporan sehingga bukti tidak dapat ditautkan.');
                }
                const evidence = new FormData();
                evidence.append('id_laporan', String(reportId));
                evidence.append('file', selectedFile);
                try {
                    await createReportEvidence(evidence, { signal: submissionController.current.signal });
                    setPendingEvidenceReportId(null);
                } catch (evidenceError) {
                    if (evidenceError.name !== 'AbortError') {
                        setPendingEvidenceReportId(reportId);
                        throw new Error(`Laporan ${reportId} tersimpan, tetapi unggahan bukti gagal: ${evidenceError.message}`);
                    }
                    throw evidenceError;
                }
            }

            if (mountedRef.current) {
                setSubmittedAt(response?.tanggal_laporan ? new Date(response.tanggal_laporan) : new Date());
                setStep(4);
            }
        } catch (error) {
            if (mountedRef.current && error.name !== 'AbortError') {
                setSubmissionError(error.message || 'Laporan gagal dikirim.');
            }
        } finally {
            if (mountedRef.current) setSubmitting(false);
        }
    };

    const movePin = (event) => {
        const bounds = mapRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const x = Math.min(96, Math.max(4, ((event.clientX - bounds.left) / bounds.width) * 100));
        const y = Math.min(90, Math.max(10, ((event.clientY - bounds.top) / bounds.height) * 100));
        setPinPosition({ x, y });
        setCoordinates({
            latitude: -5.35824 + (48 - y) * 0.0001,
            longitude: 105.23142 + (x - 50) * 0.0001
        });
    };

    const locateCurrentPosition = () => {
        setLocationError('');
        if (!navigator.geolocation) {
            setLocationError('Browser ini tidak mendukung fitur lokasi perangkat.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords: currentPosition }) => {
                setCoordinates({ latitude: currentPosition.latitude, longitude: currentPosition.longitude });
                setPinPosition({ x: 50, y: 48 });
            },
            (error) => {
                const messages = {
                    1: 'Izin lokasi ditolak. Anda tetap dapat menggeser pin secara manual.',
                    2: 'Lokasi perangkat tidak tersedia. Coba lagi atau geser pin secara manual.',
                    3: 'Permintaan lokasi terlalu lama. Coba lagi atau geser pin secara manual.'
                };
                setLocationError(messages[error.code] || 'Lokasi perangkat gagal didapatkan. Geser pin secara manual.');
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F1F6FA] text-base text-[#102B49]">
            <Navbar activePage="Pelaporan" reporter />

            <main className="w-full flex-1 px-6 pb-12 pt-8">
                <div className="mx-auto max-w-6xl">
                    <section className="mb-5 rounded-xl border border-[#E1E8EF] bg-white px-6 py-5 shadow-[0_1px_2px_rgba(16,43,73,0.03)] sm:px-10" aria-label="Tahapan pelaporan">
                        <div className="relative mx-auto flex max-w-2xl justify-between">
                            <div className="absolute left-[5%] right-[5%] top-4 h-0.5 bg-[#E1E8EF]" />
                            <div className={`absolute left-[5%] top-4 h-0.5 ${step >= 3 ? 'w-[90%] bg-[#10B981]' : step === 2 ? 'w-[45%] bg-[#10B981]' : 'w-0 bg-[#10B981]'}`} />
                            {['Detail Kejadian', 'Titik Lokasi', 'Konfirmasi'].map((stepName, index) => {
                                const isComplete = index + 1 < step;
                                const isActive = index + 1 === step;
                                return (
                                    <div key={stepName} className="relative z-10 flex w-28 flex-col items-center">
                                        <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${isComplete ? 'bg-[#10B981] font-semibold text-white' : isActive ? 'bg-[#0B3C65] font-semibold text-white shadow-[0_0_0_3px_#EAF5FA]' : 'border border-[#E1E8EF] bg-[#F3F6F9] text-[#8EA2B9]'}`}>
                                            {isComplete ? '✓' : index + 1}
                                        </span>
                                        <span className={`mt-2 text-center text-xs ${isComplete ? 'font-semibold text-[#10B981]' : isActive ? 'font-semibold text-[#0B3C65]' : 'text-[#91A3B8]'}`}>{stepName}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {isDemoReportTypes && (
                        <p role={reportTypesError ? 'alert' : 'status'} className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            {reportTypesError ? `API jenis laporan belum tersedia (${reportTypesError}). Opsi yang ditampilkan adalah data demo; pengiriman laporan tetap memerlukan API.` : 'Opsi jenis laporan menggunakan data demo sambil mencoba memuat API.'}
                        </p>
                    )}

                    {step === 1 ? (
                        <Step1
                            description={description}
                            setDescription={setDescription}
                            selectedFile={selectedFile}
                            fileError={fileError}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            selectFile={selectFile}
                            clearDraft={clearDraft}
                            fileInputRef={fileInputRef}
                            reportTypes={reportTypes}
                            reportTypesLoading={reportTypesLoading}
                            reportTypesError={reportTypesError}
                            selectedReportTypeId={selectedReportTypeId}
                            setSelectedReportTypeId={setSelectedReportTypeId}
                            incidentTime={incidentTime}
                            setIncidentTime={setIncidentTime}
                            onNext={() => setStep(2)}
                        />
                    ) : step === 2 ? (
                        <Step2
                            zone={zone}
                            setZone={setZone}
                            specificLocation={specificLocation}
                            setSpecificLocation={setSpecificLocation}
                            mapRef={mapRef}
                            locateCurrentPosition={locateCurrentPosition}
                            locationError={locationError}
                            movePin={movePin}
                            pinPosition={pinPosition}
                            setPinPosition={setPinPosition}
                            coordinates={coordinates}
                            onPrevious={() => setStep(1)}
                            onNext={() => setStep(3)}
                        />
                    ) : step === 3 ? (
                        <Step3
                            agreedToAccuracy={agreedToAccuracy}
                            setAgreedToAccuracy={setAgreedToAccuracy}
                            agreedToRisk={agreedToRisk}
                            setAgreedToRisk={setAgreedToRisk}
                            onPrevious={() => setStep(2)}
                            onSubmitSuccess={submitReport}
                            submitting={submitting}
                            submissionError={submissionError}
                            retryingEvidence={Boolean(pendingEvidenceReportId)}
                        />
                    ) : (
                        <Step4 submittedAt={submittedAt} />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
