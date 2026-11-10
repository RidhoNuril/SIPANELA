import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-[#F1F5F9] flex flex-col">
			<div className="flex">
				<Sidebar />
				<div className="flex flex-1 flex-col min-h-screen">
					<DashboardNavbar />
					<main className="flex-1 p-8 overflow-y-auto sm:max-h-[calc(100vh-80px)]">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
