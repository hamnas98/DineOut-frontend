import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
	const navItems = [
		{ path: "orders", label: "Orders", icon: "receipt_long" },
		{ path: "favourites", label: "Favourites", icon: "favorite" },
		{ path: "addresses", label: "Addresses", icon: "location_on" },
		{ path: "payments", label: "Payments", icon: "payment" },
		{ path: "settings", label: "Settings", icon: "settings" },
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="grid lg:grid-cols-[280px,1fr] gap-8">
				{/* Sidebar */}
				<aside className="lg:sticky lg:top-4 lg:self-start">
					{/* User Info */}
					<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
						<div className="flex items-center gap-4 mb-4">
							<div
								className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-primary/20"
								style={{ backgroundImage: `url("${user?.avatar}")` }}
							/>
							<div>
								<h2 className="font-bold text-slate-900 dark:text-white">
									{user?.name}
								</h2>
								<p className="text-sm text-slate-600 dark:text-slate-400">
									{user?.email}
								</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
						{navItems.map((item) => (
							<NavLink
								key={item.path}
								to={item.path}
								className={({ isActive }) =>
									`flex items-center gap-3 px-6 py-4 transition-colors ${
										isActive
											? "bg-primary/10 text-primary border-l-4 border-primary"
											: "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
									}`
								}
							>
								<span className="material-symbols-outlined text-xl">
									{item.icon}
								</span>
								<span className="font-medium">{item.label}</span>
							</NavLink>
						))}
					</nav>
				</aside>

				{/* Main Content Area */}
				<main className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 min-h-[500px]">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default Profile;
