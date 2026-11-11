import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';
import Icon from './Icon';

export default function Navbar({ activePage, reporter = false }) {
    const navItems = ['Beranda', 'Tentang', 'Edukasi', 'Pelaporan'];
    
    // State untuk dropdown profil desktop
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // State untuk menu mobile (hamburger) & dropdown profil di mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

    // Menutup dropdown profil desktop ketika pengguna mengklik di luar area
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                {/* Logo Brand */}
                <Link to="/" className="flex items-center gap-3" aria-label="SIPANELA Beranda">
                    <img src={Logo} alt="Logo" className="h-10 w-auto" />
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-lg font-bold tracking-tight text-[#0B3C65]">SIPANELA</span>
                        </div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">POLITEKNIK NEGERI LAMPUNG</p>
                    </div>
                </Link>

                {/* Navigasi Desktop */}
                <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Navigasi utama">
                    {navItems.map((item) => {
                        const className = `relative py-1 transition-colors ${activePage === item
                            ? 'font-semibold text-[#0B3C65]'
                            : 'text-gray-600 hover:text-[#0B3C65]'
                            }`;
                        const indicator = activePage === item && (
                            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0B3C65]" />
                        );

                        const path = 
                            item === 'Beranda' ? '/' :
                            item === 'Tentang' ? '/tentang' :
                            item === 'Edukasi' ? '/edukasi' : '/lapor';

                        return (
                            <Link key={item} to={path} className={className}>
                                {item}
                                {indicator}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bagian Kanan (Desktop: Profil / Tombol Login) & Tombol Hamburger Mobile */}
                <div className="flex items-center gap-4">
                    {reporter ? (
                        <div className="relative hidden md:block" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-2.5 py-1.5 text-left text-[#0B3C65] shadow-sm transition-all hover:bg-gray-50 focus:outline-none" 
                                aria-label="Pengguna pelapor, buka menu dropdown"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B3C65] text-xs font-semibold text-white">PA</span>
                                <span className="text-left">
                                    <span className="block text-xs font-semibold leading-tight">Pengguna</span>
                                    <span className="block text-[10px] leading-tight text-gray-500">Pelapor</span>
                                </span>
                                <Icon name="chevron-down" className={`w-4 h-4 text-gray-400 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Pop-up Dropdown Menu Desktop */}
                            {isOpen && (
                                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50">
                                    <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                                        <div className="w-12 h-12 rounded-xl bg-[#0B3C65] text-white flex items-center justify-center font-bold text-base shrink-0">
                                            PA
                                        </div>
                                        <div className="text-left overflow-hidden">
                                            <h4 className="text-base font-bold text-[#0B3C65] leading-tight truncate">
                                                Pengguna
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                                                Pelapor
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Link 
                                            to="/dashboard" 
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center space-x-3 py-3 px-2 text-[#0B3C65] font-semibold text-sm hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                                        >
                                            <svg className="w-5 h-5 text-[#0B3C65]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                                            <span>Dashboard</span>
                                        </Link>

                                        <Link 
                                            to="/profil" 
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center space-x-3 py-3 px-2 text-[#0B3C65] font-semibold text-sm hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                                        >
                                            <Icon name="user" className="w-4 h-4 text-[#0B3C65]" />
                                            <span>Lihat Profil</span>
                                        </Link>

                                        <button 
                                            onClick={() => {
                                                setIsOpen(false);
                                                console.log('Logout clicked');
                                            }}
                                            className="w-full flex items-center justify-between py-3 px-2 text-rose-500 font-semibold text-sm hover:bg-rose-50/50 rounded-lg transition-colors mt-1"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                                                <span>Keluar / Logout</span>
                                            </div>
                                            <span className="text-rose-400 font-bold">&gt;</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="hidden md:inline-block rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-[#0B3C65] shadow-sm transition-all hover:bg-gray-50">
                            Login
                        </Link>
                    )}

                    {/* Tombol Hamburger Menu (Mobile) */}
                    <button 
                        onClick={() => {
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                            setIsMobileProfileOpen(false); // Reset state profil mobile saat menu ditutup/buka
                        }}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none md:hidden"
                        aria-label="Toggle Menu Mobile"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menu Dropdown Mobile (Drawer) */}
            {isMobileMenuOpen && (
                <div className="border-b border-gray-200 bg-white px-6 py-4 md:hidden shadow-lg">
                    <nav className="flex flex-col space-y-3">
                        {navItems.map((item) => {
                            const path = 
                                item === 'Beranda' ? '/' :
                                item === 'Tentang' ? '/tentang' :
                                item === 'Edukasi' ? '/edukasi' : '/lapor';

                            return (
                                <Link
                                    key={item}
                                    to={path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                                        activePage === item 
                                            ? 'bg-gray-50 font-semibold text-[#0B3C65]' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B3C65]'
                                    }`}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                        {reporter ? (
                            <div className="flex flex-col space-y-2">
                                {/* Tombol Profil Ringkas di Mobile (Pemicu Dropdown) */}
                                <button 
                                    onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C65] text-xs font-semibold text-white">PA</div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-[#0B3C65]">Pengguna</p>
                                            <p className="text-xs text-gray-500">Pelapor</p>
                                        </div>
                                    </div>
                                    <Icon name="chevron-down" className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isMobileProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Menu Dropdown yang Muncul Ketika Profil Mobile Diklilk */}
                                {isMobileProfileOpen && (
                                    <div className="flex flex-col space-y-1 pl-2 pt-1 border-l-2 border-gray-200 ml-3">
                                        <Link 
                                            to="/dashboard" 
                                            onClick={() => {
                                                setIsMobileProfileOpen(false);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#0B3C65] hover:bg-gray-50 rounded-lg"
                                        >
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link 
                                            to="/profil" 
                                            onClick={() => {
                                                setIsMobileProfileOpen(false);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#0B3C65] hover:bg-gray-50 rounded-lg"
                                        >
                                            <span>Lihat Profil</span>
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                setIsMobileProfileOpen(false);
                                                setIsMobileMenuOpen(false);
                                                console.log('Logout clicked');
                                            }}
                                            className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-lg"
                                        >
                                            <span>Keluar / Logout</span>
                                            <span className="text-rose-400 font-bold">&gt;</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-center rounded-xl border border-gray-300 bg-[#0B3C65] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#092d4e]"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}