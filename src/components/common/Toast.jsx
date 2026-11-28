import { useEffect, useState, useCallback } from "react";

const Toast = ({
    type = "success",
    title,
    message,
    isOpen,
    onClose,
    duration = 3000,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300); // Menunggu transisi keluar (duration-300) selesai
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            setIsVisible(false);
            return;
        }

        // Trigger animasi masuk & progress bar setelah komponen ter-render di DOM
        const enterFrame = requestAnimationFrame(() => {
            setIsVisible(true);
        });

        if (!duration) return () => cancelAnimationFrame(enterFrame);

        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => {
            cancelAnimationFrame(enterFrame);
            clearTimeout(timer);
        };
    }, [isOpen, duration, handleClose]);

    if (!isOpen) return null;

    const isError = type === "error";

    const config = {
        outerRing: isError ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100",
        innerCircle: isError ? "bg-[#DC2626]" : "bg-[#15803D]",
        iconColor: isError ? "text-[#DC2626]" : "text-[#15803D]",
        progressBar: isError ? "bg-[#DC2626]" : "bg-[#15803D]",
        progressTrack: isError ? "bg-red-100/60" : "bg-emerald-100/60",
        defaultTitle: isError ? "Gagal Menyimpan Perubahan!" : "Perubahan Berhasil Tersimpan!",
        defaultMessage: isError
            ? "Terjadi kesalahan saat memperbarui data."
            : "Laporan Masuk berhasil diPerbarui.",
    };

    return (
        <div
            role="alert"
            onClick={handleClose}
            className={`fixed top-6 right-6 z-50 w-full max-w-70 sm:max-w-115 bg-white rounded-[20px] border border-slate-200/80 shadow-[0_12px_30px_-6px_rgba(15,23,42,0.08)] overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out ${isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-4 scale-95"
                }`}
        >
            {/* Konten Utama */}
            <div className="flex items-center gap-4 px-5 py-4">
                {/* Icon Lingkaran Berlapis */}
                <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border shrink-0 ${config.outerRing}`}
                >
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${config.innerCircle}`}
                    >
                        <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full">
                            {isError ? (
                                <svg
                                    className={`w-2.5 h-2.5 ${config.iconColor}`}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                >
                                    <path d="M3 3L9 9M9 3L3 9" />
                                </svg>
                            ) : (
                                <svg
                                    className={`w-2.5 h-2.5 ${config.iconColor}`}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M2.5 6.2L4.8 8.5L9.5 3.5" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>

                {/* Konten Teks */}
                <div className="flex flex-col">
                    <h4 className="text-[17px] font-bold text-[#0F172A] leading-snug tracking-tight">
                        {title || config.defaultTitle}
                    </h4>
                    <p className="text-[14px] text-slate-600 mt-0.5 leading-normal">
                        {message || config.defaultMessage}
                    </p>
                </div>
            </div>

            {/* Progress Bar Murni Tailwind */}
            {duration > 0 && (
                <div className={`w-full h-1 ${config.progressTrack}`}>
                    <div
                        className={`h-full w-full origin-left transition-transform ease-linear duration-3000 ${config.progressBar
                            } ${isVisible ? "scale-x-0" : "scale-x-100"}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Toast;