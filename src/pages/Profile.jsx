import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";

const Profile = () => {
	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
				{/* Mobile: Stack vertically, Tablet+: Side by side */}
				<div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-4 sm:gap-6">
					{/* Left Sidebar - Sticky on desktop */}
					<div className="lg:sticky lg:top-4 lg:self-start">
						<ProfileSidebar />
					</div>

					{/* Right Content Area */}
					<main className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 min-h-[400px] lg:min-h-[600px]">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};

export default Profile;
