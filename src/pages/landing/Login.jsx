import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';
import Icon from '../../components/common/Icon';

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
                        <Icon name="user" className="h-5 w-5 text-[#858585]" />
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
                                <Icon name="eye-slash-outline" className="h-5 w-5" />
                            ) : (
                                <Icon name="eye-outline" className="h-5 w-5" />
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
