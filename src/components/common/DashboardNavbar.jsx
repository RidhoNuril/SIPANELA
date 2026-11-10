export default function DashboardNavbar() {
	return (
		<header className="bg-white border-b border-gray-100 h-20 px-8 flex items-center justify-end sticky top-0 z-30">
			<div className="flex items-center space-x-4">
				{/* Notification Button */}
				<button className="relative p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
					</svg>
					<span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
						3
					</span>
				</button>

				{/* Admin Profile Dropdown */}
				<div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
					<div className="w-10 h-10 rounded-full bg-[#0B3C65] text-white flex items-center justify-center font-bold text-sm shadow-sm">
						AD
					</div>
					<div className="hidden sm:block text-left">
						<p className="text-sm font-bold text-gray-800 leading-none">Admin</p>
						<p className="text-xs text-gray-400 mt-1">Satgas Anti Narkoba</p>
					</div>
					<svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</header>
	);
}
