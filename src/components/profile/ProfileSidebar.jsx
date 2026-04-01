import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProfileSidebar = () => {
	const { user } = useAuth();

	const navItems = [
		{ path: "/my-account", label: "Overview", icon: "dashboard", end: true },
		{ path: "/my-account/orders", label: "Orders", icon: "shopping_bag" },
		{ path: "/my-account/favourites", label: "Favourites", icon: "favorite" },
		{
			path: "/my-account/addresses",
			label: "Addresses",
			icon: "location_on",
		},
		{ path: "/my-account/payments", label: "Payments", icon: "payment" },
		{ path: "/my-account/settings", label: "Settings", icon: "settings" },
	];

	return (
		<aside className="w-full">
			{/* User Info Card */}
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 mb-4">
				<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
					<div
						className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cover bg-center border-2 border-primary/30 flex-shrink-0"
						style={{ backgroundImage: `url("${user?.avatar}")` }}
						role="img"
						aria-label={user?.name}
					/>
					<div className="flex-1 min-w-0 text-center sm:text-left">
						<h2 className="font-bold text-lg text-slate-900 dark:text-white truncate">
							{user?.name}
						</h2>
						<p className="text-sm text-slate-600 dark:text-slate-400 truncate">
							{user?.email}
						</p>
					</div>
				</div>
			</div>

			{/* Navigation Menu */}
			<nav
				className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
				aria-label="Account navigation"
			>
				{navItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						end={item.end}
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 transition-colors relative ${
								isActive
									? "bg-primary/10 text-primary font-medium"
									: "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
							}`
						}
					>
						{({ isActive }) => (
							<>
								{isActive && (
									<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
								)}
								<span className="material-symbols-outlined text-xl">
									{item.icon}
								</span>
								<span className="text-sm sm:text-base">
									{item.label}
								</span>
							</>
						)}
					</NavLink>
				))}
			</nav>
		</aside>
	);
};
export default ProfileSidebar;
