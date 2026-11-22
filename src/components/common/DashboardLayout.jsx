import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-[#F1F5F9] flex flex-col">
			<div className="flex">
				<Sidebar />
				<div className="flex flex-1 flex-col min-h-screen max-w-screen overflow-x-auto">
					<DashboardNavbar />
					<main className="flex-1 px-8 pb-8 pt-28 sm:pt-8 overflow-auto sm:max-w-screen max-w-[calc(100vw-16px)] sm:max-h-[calc(100vh-80px)]">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
