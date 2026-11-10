import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';

export default function Navbar({ activePage, reporter = false }) {
    const navItems = ['Beranda', 'Tentang', 'Edukasi', 'Pelaporan'];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link to="/" className="flex items-center gap-3" aria-label="SIPANELA Beranda">
                    <img src={Logo} alt="Logo" />
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-lg font-bold tracking-tight text-[#0B3C65]">SIPANELA</span>
                        </div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">POLITEKNIK NEGERI LAMPUNG</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Navigasi utama">
                    {navItems.map((item) => {
                        const className = `relative py-1 transition-colors ${activePage === item
                            ? 'font-semibold text-[#0B3C65]'
                            : 'text-gray-600 hover:text-[#0B3C65]'
                            }`;
                        const indicator = activePage === item && (
                            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0B3C65]" />
                        );

                        if (item === 'Beranda' || item === 'Tentang' || item === 'Edukasi' || item === 'Pelaporan') {
                            return (
                                <Link
                                    key={item}
                                    to={
                                        item === 'Beranda' ? '/' :
                                            item === 'Tentang' ? '/tentang' :
                                                item === 'Edukasi' ? '/edukasi' : '/lapor'
                                    }
                                    className={className}
                                >
                                    {item}
                                    {indicator}
                                </Link>
                            );
                        }

                        return null;
                    })}
                </nav>

                {reporter ? (
                    <Link to="/login" className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-1.5 text-left text-[#0B3C65] shadow-sm transition-all hover:bg-gray-50" aria-label="Pengguna pelapor, buka login">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B3C65] text-xs font-semibold text-white">PA</span>
                        <span className="hidden sm:block">
                            <span className="block text-xs font-semibold leading-tight">Pengguna</span>
                            <span className="block text-[10px] leading-tight text-gray-500">Pelapor</span>
                        </span>
                        <span className="px-1 text-xs text-[#0B3C65]" aria-hidden="true">⌄</span>
                    </Link>
                ) : (
                    <Link to="/login" className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-[#0B3C65] shadow-sm transition-all hover:bg-gray-50">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
