import { useRef, useState } from 'react';
import Footer from '../../../components/common/Footer.jsx';
import Navbar from '../../../components/common/Navbar.jsx';
import Step1 from './Step1.jsx';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';
import Step4 from './Step4.jsx';

export default function Lapor() {
    const [step, setStep] = useState(1);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dateTime, setDateTime] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [zone, setZone] = useState('');
    const [specificLocation, setSpecificLocation] = useState('');
    const [agreedToAccuracy, setAgreedToAccuracy] = useState(false);
    const [agreedToRisk, setAgreedToRisk] = useState(false);
    const [submittedAt, setSubmittedAt] = useState(null);
    const fileInputRef = useRef(null);

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
        setCategory('');
        setDateTime('');
        setSelectedFile(null);
        setFileError('');
        setZone('');
        setSpecificLocation('');
        setAgreedToAccuracy(false);
        setAgreedToRisk(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setSubmittedAt(new Date());
            setStep(4);
        }
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

                    <form id="report-form" onSubmit={handleSubmit}>
                        {step === 1 ? (
                            <Step1
                                category={category}
                                setCategory={setCategory}
                                description={description}
                                setDescription={setDescription}
                                dateTime={dateTime}
                                setDateTime={setDateTime}
                                selectedFile={selectedFile}
                                fileError={fileError}
                                isDragging={isDragging}
                                setIsDragging={setIsDragging}
                                selectFile={selectFile}
                                clearDraft={clearDraft}
                                fileInputRef={fileInputRef}
                            />
                        ) : step === 2 ? (
                            <Step2
                                zone={zone}
                                setZone={setZone}
                                specificLocation={specificLocation}
                                setSpecificLocation={setSpecificLocation}
                                onPrevious={() => setStep(1)}
                            />
                        ) : step === 3 ? (
                            <Step3
                                agreedToAccuracy={agreedToAccuracy}
                                setAgreedToAccuracy={setAgreedToAccuracy}
                                agreedToRisk={agreedToRisk}
                                setAgreedToRisk={setAgreedToRisk}
                                onPrevious={() => setStep(2)}
                            />
                        ) : (
                            <Step4 submittedAt={submittedAt} />
                        )}
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
