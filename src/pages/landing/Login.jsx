import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';
import Icon from '../../components/common/Icon';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFB] px-6 py-24 font-['Poppins'] text-[#111827]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(22,126,184,0.52),transparent_25%),radial-gradient(ellipse_at_0%_100%,rgba(223,190,119,0.78),transparent_29%),linear-gradient(135deg,#f8fafb_15%,#edf3f5_52%,#ffffff_100%)]" />
            <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />

            <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-2.5 sm:left-16 sm:top-7">
                <img src={Logo} alt="Logo SIPANELA" className="h-9 w-9" />
                <span className="text-[11px] font-semibold text-[#17212B] sm:text-xs">Politeknik Negeri Lampung</span>
            </Link>

            <section className="relative z-10 w-full max-w-105 rounded-4xl border border-white/80 bg-white/70 px-8 py-10 shadow-[0_18px_55px_rgba(15,35,53,0.16)] backdrop-blur-xl sm:px-8 sm:py-12">
                <div className="flex flex-col items-center text-center">
                    <img src={Logo} alt="Logo SIPANELA" className="w-32 h-33 mb-4" />
                    <h1 className="font-extrabold tracking-tight text-[#001D33] text-[32px] mb-3">LOGIN</h1>
                    <p className="text-xs font-medium text-[#555B63] sm:text-sm">
                        Selamat Datang Di Sistem Pelaporan <br></br> Anti Narkoba
                    </p>
                </div>

                <form className="mt-7" onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="username" className="mb-2 text-sm block font-medium text-[#20242A]">Nomor Pokok Mahasiswa (NPM)</label>
                    <div className="flex items-center gap-3 mb-5 rounded-full border border-[#E6E6E6] bg-[#F9FAFB]/70 px-5 py-3.5 focus-within:ring-2 focus-within:ring-[#0B3C65]/20">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Contoh : 21753042 "
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <Icon name="user" className="h-5 w-5 text-[#858585]" />
                    </div>

                    <label htmlFor="password" className="mb-2 text-sm block font-medium text-[#20242A]">Password</label>
                    <div className="flex items-center gap-3 rounded-full border border-[#E6E6E6] bg-[#F9FAFB]/70 px-5 py-3.5 focus-within:ring-2 focus-within:ring-[#0B3C65]/20">
                        <span className="sr-only">Password</span>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            placeholder="Minimal 8 Karakter"
                            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#929292]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="text-[#858585] hover:text-[#0B3C65]"
                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        >
                            {showPassword ? (
                                <Icon name="eye-slash-outline" className="h-5 w-5" />
                            ) : (
                                <Icon name="eye-outline" className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <button type="submit" className="h-12 mt-6 w-full rounded-full bg-[#0D416A] font-bold text-white transition-colors hover:bg-[#092F4D]">
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-[#30343A]">
                    Tidak Punya akun ?{' '}
                    <Link to="/register" className="font-bold text-black hover:underline">Daftar</Link>
                </p>
            </section>
        </main>
    );
}
