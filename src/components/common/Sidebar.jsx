import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo_sipanela.svg';
import Icon from './Icon';

const menuItems = [
	{
		title: 'Menu Utama',
		links: [
			{ to: '/dashboard', label: 'Dashboard', icon: 'grid-3x3-gap-fill' },
			{ to: '/dashboard/laporan', label: 'Laporan Masuk', icon: 'file-earmark-text' },
			{ to: '/dashboard/rekapitulasi', label: 'Rekapitulasi', icon: 'bar-chart-line-fill' },
		]
	},
	{
		title: 'Menu Artikel',
		links: [
			{ to: '/dashboard/kategori', label: 'Kelola Kategori', icon: 'tags-fill' },
			{ to: '/dashboard/artikel', label: 'Kelola Artikel', icon: 'file-earmark-post-fill' },
		]
	}
];

export default function Sidebar() {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const isActive = (path) => path === '/dashboard'
		? location.pathname === path
		: location.pathname === path || location.pathname.startsWith(`${path}/`);

	return (
		<>
			{/* Mobile Toggle Button */}
			<button
				className="sm:hidden fixed top-4 left-6 z-38 p-2 px-3 text-black"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? (
					<Icon name="x" className="text-2xl hover:text-[#0B3C65]" />
				) : (
					<Icon name="list" className="text-2xl hover:text-[#0B3C65]" />
				)}
			</button>

			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="sm:hidden fixed inset-0 bg-black/25 z-39"
					onClick={() => setIsOpen(false)}
				></div>
			)}

			<aside className={`fixed sm:static min-h-screen inset-y-0 top-0 left-0 z-40 w-72 bg-white border-r border-gray-100 p-4 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
				<div className="space-y-8">
					{/* Logo Section */}
					<Link to="/" className="flex items-center space-x-3 mb-8 px-2">
						<img src={Logo} alt="Logo" className="w-10 h-10" />
						<div>
							<h1 className="font-bold text-[#0B3C65] text-lg tracking-tight leading-none">SIPANELA</h1>
							<p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider mt-0.5">Politeknik Negeri Lampung</p>
						</div>
					</Link>

					{/* Menus Loop */}
					{menuItems.map((section, idx) => (
						<div key={idx}>
							<p className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-4 px-3">{section.title}</p>
							<nav className="space-y-1.5" onClick={() => setIsOpen(false)}>
								{section.links.map((link) => (
									<Link
										key={link.to}
										to={link.to}
										className={`flex items-center px-3.5 py-3 rounded-xl text-sm transition-all ${isActive(link.to)
												? 'bg-[#0B3C65] text-white shadow-sm'
												: 'text-gray-600 hover:bg-[#0B3C65] hover:text-white transition-colors'
											}`}
									>
										<Icon name={link.icon} className="text-sm mr-3" />
										{link.label}
									</Link>
								))}
							</nav>
						</div>
					))}
				</div>
			</aside>
		</>
	);
}
