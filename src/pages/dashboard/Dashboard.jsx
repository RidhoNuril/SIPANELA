import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import Icon from '../../components/common/Icon';
import { DASHBOARD_DATA, getDashboardData } from '../../services/dashboardService.js';

function Dashboard() {
	const [activeTab, setActiveTab] = useState('Mingguan');
	const [data, setData] = useState(DASHBOARD_DATA.Mingguan);

	useEffect(() => {
		getDashboardData(activeTab)
			.then(setData)
			.catch((error) => console.error('Gagal memuat data dashboard.', error));
	}, [activeTab]);

	return (
		<>
			<DashboardLayout>
				{/* Dashboard Header & Timeframe Switcher */}
				<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
					<div>
						<h2 className="text-2xl font-bold text-[#0B3C65] tracking-tight">Dashboard</h2>
						<p className="text-sm text-gray-500 mt-1">Pemantauan laporan di lingkungan kampus.</p>
					</div>

					{/* Timeframe Selector Pill */}
					<div className="bg-white p-1 rounded-xl border border-gray-200 shadow-xs flex items-center space-x-1 self-start md:self-auto">
						{['Mingguan', 'Bulanan', 'Tahunan'].map((tab) => (
							<button
								key={tab}
								onClick={() => {
									setActiveTab(tab);
									setData(DASHBOARD_DATA[tab]);
								}}
								className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
									activeTab === tab ? 'bg-[#0B3C65] text-white' : 'bg-transparent text-gray-600 hover:bg-gray-50'
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				{/* Metric Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{/* Card 1 */}
					<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
						<div className="flex justify-between items-start">
							<span className="text-xs font-bold text-gray-400 tracking-wider">TOTAL LAPORAN MASUK</span>
							<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
								<Icon name="box-arrow-in-down" />
							</div>
						</div>
						<div className="mt-6">
							<span className="text-4xl font-semibold text-[#0B3C65]">{data.cards.masuk}</span>
						</div>
					</div>

					{/* Card 2 */}
					<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
						<div className="flex justify-between items-start">
							<span className="text-xs font-bold text-gray-400 tracking-wider">TOTAL LAPORAN SELESAI</span>
							<div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
								<Icon name="check-circle-fill" />
							</div>
						</div>
						<div className="mt-6">
							<span className="text-4xl font-semibold text-[#0B3C65]">{data.cards.selesai}</span>
						</div>
					</div>

					{/* Card 3 */}
					<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
						<div className="flex justify-between items-start">
							<span className="text-xs font-bold text-gray-400 tracking-wider">TOTAL KESELURUHAN LAPORAN</span>
							<div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
								<Icon name="exclamation-triangle-fill" />
							</div>
						</div>
						<div className="mt-6">
							<span className="text-4xl font-semibold text-[#0B3C65]">{data.cards.total}</span>
						</div>
					</div>
				</div>

				{/* Tren Perbandingan Mingguan Section */}
				<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
						<div>
							<h3 className="font-bold text-[#0B3C65] text-lg">Tren Perbandingan Mingguan</h3>
							<p className="text-xs text-gray-400 mt-0.5">Komparasi jumlah pengaduan anonim vs tindakan patroli lapangan Satgas SIPANELA</p>
						</div>

						{/* Legend */}
						<div className="flex items-center space-x-6 text-xs font-medium text-gray-600">
							<div className="flex items-center space-x-2">
								<span className="w-3 h-3 rounded bg-[#0B3C65]"></span>
								<span>Laporan Selesai</span>
							</div>
							<div className="flex items-center space-x-2">
								<span className="w-3 h-3 rounded bg-gray-300"></span>
								<span>Laporan Masuk</span>
							</div>
						</div>
					</div>

					{/* Chart Area */}
					<div className="relative pt-6 pb-2">
						{/* Horizontal grid lines */}
						<div className="absolute inset-x-0 top-6 bottom-10 flex flex-col justify-between pointer-events-none">
							<div className="border-b border-dashed border-gray-100 w-full relative">
								<span className="absolute -top-3 right-0 text-[10px] text-gray-300 font-semibold">30</span>
							</div>
							<div className="border-b border-dashed border-gray-100 w-full relative">
								<span className="absolute -top-3 right-0 text-[10px] text-gray-300 font-semibold">20</span>
							</div>
							<div className="border-b border-dashed border-gray-100 w-full relative">
								<span className="absolute -top-3 right-0 text-[10px] text-gray-300 font-semibold">10</span>
							</div>
						</div>

						{/* Bars container */}
						<div className="flex justify-between items-end h-48 px-8 relative z-10">
							{data.chart.map((item, idx) => (
								<div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
									<div className="flex items-end justify-center space-x-1.5 w-full h-full">
										{item.masuk > 0 && (
											<div
												className="w-3.5 bg-gray-300 rounded-t-md transition-all duration-300 group-hover:bg-gray-400"
												style={{ height: `${(item.masuk / 30) * 100}%` }}
												title={`Laporan Masuk: ${item.masuk}`}
											></div>
										)}
										{item.selesai > 0 && (
											<div
												className="w-3.5 bg-[#0B3C65] rounded-t-md transition-all duration-300 group-hover:bg-blue-900"
												style={{ height: `${(item.selesai / 30) * 100}%` }}
												title={`Laporan Selesai: ${item.selesai}`}
											></div>
										)}
									</div>
									<span className="text-xs font-semibold text-gray-400 mt-3">{item.label}</span>
								</div>
							))}
						</div>

						{/* Bottom Baseline */}
						<div className="border-t border-gray-200 mt-2 flex justify-between items-center pt-2">
							<span className="text-[10px] text-transparent">0</span>
							<span className="text-[10px] text-gray-400 font-semibold">0</span>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}

export default Dashboard;
