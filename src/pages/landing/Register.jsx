import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';
import Icon from '../../components/common/Icon';
import { register } from '../../services/authService.js';
import Toast from '../../components/common/Toast.jsx';

function RegisterField({ id, label, children, error }) {
    return (
        <div className="mb-5">
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#20242A]">{label}</label>
            <span className={`flex items-center gap-2 rounded-full border bg-[#F9FAFB]/70 px-5 py-3.5 focus-within:ring-2 focus-within:ring-[#0B3C65]/20 ${error ? 'border-red-500' : 'border-[#E6E6E6]'}`}>
                {children}
            </span>
            {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function Register() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [toast, setToast] = useState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
    });

    function validateForm(values) {
        const errors = {};
        const identityNumber = values.identityNumber?.trim() || '';
        const identityDigits = identityNumber.replace(/\D/g, '');
        const email = values.email?.trim() || '';
        const phone = values.phone?.trim() || '';
        const phoneDigits = phone.replace(/\D/g, '');

        if (!values.namaLengkap?.trim()) {
            errors.namaLengkap = 'Nama lengkap wajib diisi.';
        } else if (values.namaLengkap.trim().length < 3) {
            errors.namaLengkap = 'Nama lengkap minimal 3 karakter.';
        }

        if (!identityNumber) {
            errors.identityNumber = 'NPM wajib diisi.';
        } else if (!/^[\d\s]+$/.test(identityNumber)) {
            errors.identityNumber = 'NPM hanya boleh berisi angka.';
        } else if (identityDigits.length < 8) {
            errors.identityNumber = 'NPM minimal 8 digit.';
        }

        if (!email) {
            errors.email = 'Email wajib diisi.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Format email tidak valid.';
        }

        if (!phone) {
            errors.phone = 'Nomor telepon wajib diisi.';
        } else if (!/^[+\d\s()-]+$/.test(phone) || phoneDigits.length < 9 || phoneDigits.length > 15) {
            errors.phone = 'Nomor telepon harus berisi 9–15 digit.';
        }

        if (!values.password) {
            errors.password = 'Password wajib diisi.';
        } else if (values.password.length < 8) {
            errors.password = 'Password minimal 8 karakter.';
        }

        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Kata sandi tidak sama.';
        }

        if (!values.agreement) {
            errors.agreement = 'Persetujuan wajib dicentang.';
        }

        return errors;
    }

    function handleFieldChange(event) {
        const formData = new FormData(event.currentTarget.form);
        const values = Object.fromEntries(formData.entries());

        setValidationErrors((currentErrors) => (
            Object.keys(currentErrors).length ? validateForm(values) : currentErrors
        ));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form).entries());
        const errors = validateForm(values);
        setValidationErrors(errors);

        if (Object.keys(errors).length) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await register({
                namaLengkap: values.namaLengkap,
                identityNumber: values.identityNumber,
                email: values.email,
                phone: values.phone,
                password: values.password,
            });

            // message toast ambil dari response
            setToast({
                isOpen: true,
                type: "success",
                title: "Registrasi Berhasil!",
                message: "Anda berhasil regis. Silakan login.",
            });
        } catch (error) {
            setToast({
                isOpen: true,
                type: "error",
                title: "Registrasi Gagal!",
                message: "Ada masalah saat regis. Silakan coba lagi.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFB] px-6 py-20 text-[#111827]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(22,126,184,0.52),transparent_25%),radial-gradient(ellipse_at_0%_100%,rgba(223,190,119,0.78),transparent_29%),linear-gradient(135deg,#f8fafb_15%,#edf3f5_52%,#ffffff_100%)]" />
            <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />
            <Toast
                isOpen={toast.isOpen}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
            />

            <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-2.5 sm:left-16 sm:top-7">
                <img src={Logo} alt="Logo SIPANELA" className="h-9 w-9" />
                <span className="text-[11px] font-semibold text-[#17212B] sm:text-xs">Politeknik Negeri Lampung</span>
            </Link>

            <section className="relative z-10 w-full rounded-4xl border border-white/80 bg-white/75 px-8 py-10 shadow-[0_18px_55px_rgba(15,35,53,0.16)] backdrop-blur-xl sm:max-w-120 sm:px-8 sm:py-12">
                <div className="flex flex-col items-center text-center">
                    <img src={Logo} alt="Logo SIPANELA" className="w-32 h-33 mb-4" />
                    <h1 className="text-[32px] font-extrabold tracking-wide text-[#001D33] mb-3">DAFTAR AKUN</h1>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#555B63]">
                        Registrasi Pengguna Sistem Pelaporan <br></br>Anti Narkoba
                    </p>
                </div>

                <form className="mt-7 space-y-2" noValidate onSubmit={handleSubmit}>
                    <RegisterField id="namaLengkap" label="Nama Lengkap" error={validationErrors.namaLengkap}>
                        <input
                            id="namaLengkap"
                            name="namaLengkap"
                            type="text"
                            autoComplete="namalengkap"
                            required
                            placeholder="Contoh: Bagus Dwi Pra"
                            aria-invalid={Boolean(validationErrors.namaLengkap)}
                            aria-describedby={validationErrors.namaLengkap ? 'namaLengkap-error' : undefined}
                            onChange={handleFieldChange}
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="id-card" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="identityNumber" label="Nomor Pokok Mahasiswa (NPM)" error={validationErrors.identityNumber}>
                        <input
                            id="identityNumber"
                            name="identityNumber"
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Contoh: 21753042 atau 198501..."
                            aria-invalid={Boolean(validationErrors.identityNumber)}
                            aria-describedby={validationErrors.identityNumber ? 'identityNumber-error' : undefined}
                            onChange={handleFieldChange}
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="id-card" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="email" label="Email" error={validationErrors.email}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="nama@polinela.ac.id"
                            aria-invalid={Boolean(validationErrors.email)}
                            aria-describedby={validationErrors.email ? 'email-error' : undefined}
                            onChange={handleFieldChange}
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="mail" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="phone" label="Nomor WhatsApp" error={validationErrors.phone}>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                            placeholder="0812-xxxx-xxxx"
                            aria-invalid={Boolean(validationErrors.phone)}
                            aria-describedby={validationErrors.phone ? 'phone-error' : undefined}
                            onChange={handleFieldChange}
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="telephone" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="password" label="Password" error={validationErrors.password}>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            minLength={8}
                            required
                            value={password}
                            aria-invalid={Boolean(validationErrors.password)}
                            aria-describedby={validationErrors.password ? 'password-error' : undefined}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                handleFieldChange(event);
                            }}
                            placeholder="Minimal 8 karakter"
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="shrink-0 text-[#858585] hover:text-[#0B3C65]"
                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        >
                            <Icon name={showPassword ? 'eye-slash-outline' : 'eye-outline'} className="h-4 w-4" />
                        </button>
                    </RegisterField>

                    <RegisterField id="confirmPassword" label="Konfirmasi Password" error={validationErrors.confirmPassword}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            aria-invalid={Boolean(validationErrors.confirmPassword)}
                            aria-describedby={validationErrors.confirmPassword ? 'confirmPassword-error' : undefined}
                            onChange={handleFieldChange}
                            placeholder="Ulangi kata sandi Anda"
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((visible) => !visible)}
                            className="shrink-0 text-[#858585] hover:text-[#0B3C65]"
                            aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi kata sandi' : 'Tampilkan konfirmasi kata sandi'}
                        >
                            <Icon name={showConfirmPassword ? 'eye-slash-outline' : 'eye-outline'} className="h-4 w-4" />
                        </button>
                    </RegisterField>

                    <div>
                        <label className="flex items-start gap-2 pt-1 text-[9px] leading-snug text-[#30343A]">
                            <input
                                type="checkbox"
                                name="agreement"
                                required
                                aria-invalid={Boolean(validationErrors.agreement)}
                                aria-describedby={validationErrors.agreement ? 'agreement-error' : undefined}
                                onChange={handleFieldChange}
                                className="mt-0.5 accent-[#0D416A]"
                            />
                            <span>
                                Saya menyetujui <span className="font-medium text-[#0D416A]">Ketentuan Layanan &amp; Kebijakan Privasi</span> serta menjamin kebenaran data.
                            </span>
                        </label>
                        {validationErrors.agreement && (
                            <p id="agreement-error" className="mt-1 text-xs text-red-600">{validationErrors.agreement}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-[#0D416A] font-semibold text-white transition-colors hover:bg-[#092F4D] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? 'Memproses...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-[#30343A]">
                    Sudah Memiliki Akun?{' '}
                    <Link to="/login" className="font-bold text-[#102D43] hover:underline">Masuk</Link>
                </p>
            </section>
        </main>
    );
}
