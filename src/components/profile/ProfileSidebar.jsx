import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getAvatarUrl } from "../../utils/avatar";

const ProfileSidebar = () => {
	const { user } = useAuth();
	const avatarUrl = getAvatarUrl(user?.name);

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
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-2 sm:p-4 lg:p-6 mb-4">
				<div className="flex flex-col items-center sm:flex-row sm:items-start gap-2 sm:gap-4">
					<div
						className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-cover bg-center border-2 border-primary/30 flex-shrink-0"
						style={{ backgroundImage: `url("${avatarUrl}")` }}
						role="img"
						aria-label={user?.name}
					/>
					<div className="hidden sm:block flex-1 min-w-0 text-center sm:text-left">
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
						title={item.label}
						className={({ isActive }) =>
							`flex items-center justify-center sm:justify-start gap-0 sm:gap-3 px-2 sm:px-4 py-3 transition-colors relative ${
								isActive
									? "bg-primary/15 dark:bg-primary/25 text-primary dark:text-white font-semibold"
									: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
							}`
						}
					>
						{({ isActive }) => (
							<>
								{isActive && (
									<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
								)}
								<span
									className={`material-symbols-outlined text-xl ${
										isActive ? "text-primary dark:text-white" : ""
									}`}
								>
									{item.icon}
								</span>
								<span className="hidden sm:inline text-sm sm:text-base">
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
