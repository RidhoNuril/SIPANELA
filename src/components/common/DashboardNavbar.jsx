import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function DashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Menutup dropdown jika pengguna mengklik di luar area dropdown
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
        <header className="bg-white border-b border-gray-100 h-20 px-8 flex items-center justify-end sticky top-0 z-30">
            <div className="flex items-center space-x-4">
                {/* Notification Button */}
                <button className="relative p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    <Icon name="bell-outline" className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                        3
                    </span>
                </button>

                {/* Admin Profile Dropdown Container */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center space-x-3 pl-4 border-l border-gray-200 focus:outline-none hover:bg-gray-100 py-2 transition-colors rounded-lg"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0B3C65] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            AD
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-bold text-gray-800 leading-none">Admin</p>
                            <p className="text-xs text-gray-400 mt-1">Satgas Anti Narkoba</p>
                        </div>
                        <Icon name="chevron-down" className={`w-4 h-4 text-gray-400 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Pop-up Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50">
                            {/* Profile Info Header */}
                            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                                <div className="w-12 h-12 rounded-xl bg-[#0B3C65] text-white flex items-center justify-center font-bold text-base shrink-0">
                                    AD
                                </div>
                                <div className="text-left overflow-hidden">
                                    <h4 className="text-base font-bold text-[#0B3C65] leading-tight truncate">
                                        Admin
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                                        Satgas Anti Narkoba
                                    </p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="pt-2">
                                <Link
                                    to="/dashboard/profil"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-3 py-3 px-2 text-[#0B3C65] font-semibold text-sm hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                                >
									<Icon name="user" className="w-4 h-4 text-[#0B3C65]" />
                                    <span>Lihat Profil</span>
                                </Link>

                                <button 
                                    onClick={() => {
                                        // Handle logout action
                                        console.log('Logout clicked');
                                    }}
                                    className="w-full flex items-center justify-between py-3 px-2 text-rose-500 font-semibold text-sm hover:bg-rose-50/50 rounded-lg transition-colors mt-1"
                                >
                                    <div className="flex items-center space-x-3">
										<Icon name="log-out" className="w-4 h-4 text-rose-400" />
                                        <span>Keluar / Logout</span>
                                    </div>
                                    <Icon name="chevron-right" className="w-4 h-4 text-rose-400" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}