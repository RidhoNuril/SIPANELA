import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFB] px-5 py-24 font-['Poppins'] text-[#111827]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(22,126,184,0.52),transparent_25%),radial-gradient(ellipse_at_0%_100%,rgba(223,190,119,0.78),transparent_29%),linear-gradient(135deg,#f8fafb_15%,#edf3f5_52%,#ffffff_100%)]" />
            <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />

            <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-2.5 sm:left-16 sm:top-7">
                <img src={Logo} alt="Logo SIPANELA" className="h-9 w-9" />
                <span className="text-[11px] font-semibold text-[#17212B] sm:text-xs">Politeknik Negeri Lampung</span>
            </Link>

            <section className="relative z-10 w-full max-w-105 rounded-4xl border border-white/80 bg-white/70 px-8 py-10 shadow-[0_18px_55px_rgba(15,35,53,0.16)] backdrop-blur-xl sm:px-9 sm:py-12">
                <div className="flex flex-col items-center text-center">
                    <img src={Logo} alt="Logo SIPANELA" className="h-24 w-24" />
                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-black sm:text-[42px]">Login</h1>
                    <p className="mt-3 text-xs font-medium text-[#20242A] sm:text-sm">
                        Selamat Datang Di Sistem Pelaporan Anti Narkoba
                    </p>
                </div>

                <form className="mt-7 space-y-6" onSubmit={(event) => event.preventDefault()}>
                    <label className="flex h-14 items-center gap-3 rounded-full border border-[#E6E6E6] bg-white/80 px-6 shadow-[0_4px_8px_rgba(0,0,0,0.18)] focus-within:ring-2 focus-within:ring-[#0B3C65]/20">
                        <span className="sr-only">Username</span>
                        <input
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Username"
                            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#929292]"
                        />
                        <svg className="h-5 w-5 text-[#858585]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                        </svg>
                    </label>

                    <label className="flex h-14 items-center gap-3 rounded-full border border-[#E6E6E6] bg-white/80 px-6 shadow-[0_4px_8px_rgba(0,0,0,0.18)] focus-within:ring-2 focus-within:ring-[#0B3C65]/20">
                        <span className="sr-only">Password</span>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            placeholder="Password"
                            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#929292]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="text-[#858585] hover:text-[#0B3C65]"
                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        >
                            {showPassword ? (
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a16.3 16.3 0 0 1-3 3.8M6.2 6.2C3.9 7.7 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 3.2-.5" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                    <circle cx="12" cy="12" r="2.5" />
                                    <path strokeLinecap="round" d="m4 4 16 16" />
                                </svg>
                            )}
                        </button>
                    </label>

                    <button type="submit" className="h-12 w-full rounded-xl bg-[#0D416A] text-lg font-bold text-white transition-colors hover:bg-[#092F4D]">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-[#30343A]">
                    Tidak Punya akun ?{' '}
                    <span className="font-bold text-black">Daftar</span>
                </p>
            </section>
        </main>
    );
}
