import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';
import Icon from '../../components/common/Icon';

function RegisterField({ id, label, children }) {
    return (
        <div className="mb-5">
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#20242A]">{label}</label>
            <span className="flex h-10 items-center gap-2 rounded-full border border-[#E6E6E6] bg-white/80 px-3 shadow-[0_3px_7px_rgba(0,0,0,0.12)] focus-within:ring-2 focus-within:ring-[#0B3C65]/20">
                {children}
            </span>
        </div>
    );
}

export default function Register() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const confirmation = form.elements.namedItem('confirmPassword');

        if (confirmation.value !== password) {
            confirmation.setCustomValidity('Kata sandi tidak sama.');
            confirmation.reportValidity();
            return;
        }

        confirmation.setCustomValidity('');
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFB] px-6 py-20 text-[#111827]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(22,126,184,0.52),transparent_25%),radial-gradient(ellipse_at_0%_100%,rgba(223,190,119,0.78),transparent_29%),linear-gradient(135deg,#f8fafb_15%,#edf3f5_52%,#ffffff_100%)]" />
            <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />

            <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-2.5 sm:left-16 sm:top-7">
                <img src={Logo} alt="Logo SIPANELA" className="h-9 w-9" />
                <span className="text-[11px] font-semibold text-[#17212B] sm:text-xs">Politeknik Negeri Lampung</span>
            </Link>

            <section className="relative z-10 w-full rounded-4xl border border-white/80 bg-white/75 px-8 py-10 shadow-[0_18px_55px_rgba(15,35,53,0.16)] backdrop-blur-xl sm:max-w-120 sm:px-9 sm:py-12">
                <div className="flex flex-col items-center text-center">
                    <img src={Logo} alt="Logo SIPANELA" className="h-25 w-25 mb-3" />
                    <p className="mt-2 text-xs leading-snug text-[#555B63]">
                        Registrasi Pengguna Sistem Pelaporan Anti Narkoba
                    </p>
                    <h1 className="mt-2 text-lg font-extrabold tracking-wide text-[#102D43]">DAFTAR AKUN</h1>
                </div>

                <form className="mt-3 space-y-2" onSubmit={handleSubmit}>
                    <RegisterField id="identityNumber" label="Nomor Induk Mahasiswa (NIM) / NIP">
                        <input
                            id="identityNumber"
                            name="identityNumber"
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Contoh: 21753042 atau 198501..."
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="id-card" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="email" label="Email Institusi / Email Aktif">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="nama@polinela.ac.id"
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="mail" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="phone" label="Nomor WhatsApp / No. HP">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                            placeholder="0812-xxxx-xxxx"
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="telephone" className="h-4 w-4 shrink-0 text-[#858585]" />
                    </RegisterField>

                    <RegisterField id="password" label="Password">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            minLength={8}
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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

                    <RegisterField id="confirmPassword" label="Konfirmasi Password">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            onChange={(event) => event.currentTarget.setCustomValidity('')}
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

                    <label className="flex items-start gap-2 pt-1 text-[9px] leading-snug text-[#30343A]">
                        <input type="checkbox" name="agreement" required className="mt-0.5 accent-[#0D416A]" />
                        <span>
                            Saya menyetujui <span className="font-medium text-[#0D416A]">Ketentuan Layanan &amp; Kebijakan Privasi</span> serta menjamin kebenaran data.
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-[#0D416A] text-md sm:text-lg font-semibold text-white shadow-[0_3px_6px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#092F4D]"
                    >
                        Daftar Sekarang
                        <Icon name="arrow-right-outline" className="h-4 w-4" />
                    </button>
                </form>

                <p className="mt-3 text-center text-xs text-[#30343A]">
                    Sudah Memiliki Akun?{' '}
                    <Link to="/login" className="font-bold text-[#102D43] hover:underline">Masuk</Link>
                </p>
            </section>
        </main>
    );
}
