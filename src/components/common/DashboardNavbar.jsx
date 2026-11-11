import Icon from './Icon';

export default function DashboardNavbar() {
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

				{/* Admin Profile Dropdown */}
				<div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
					<div className="w-10 h-10 rounded-full bg-[#0B3C65] text-white flex items-center justify-center font-bold text-sm shadow-sm">
						AD
					</div>
					<div className="hidden sm:block text-left">
						<p className="text-sm font-bold text-gray-800 leading-none">Admin</p>
						<p className="text-xs text-gray-400 mt-1">Satgas Anti Narkoba</p>
					</div>
					<Icon name="chevron-down" className="w-4 h-4 text-gray-400 ml-1" />
				</div>
			</div>
		</header>
	);
}
