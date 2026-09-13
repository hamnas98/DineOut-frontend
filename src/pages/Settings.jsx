import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Settings = () => {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();
	const [isDark, setIsDark] = useState(
		document.documentElement.classList.contains("dark"),
	);

	const toggleTheme = () => {
		const next = !isDark;
		setIsDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("dineout_theme", next ? "dark" : "light");
	};

	const handleSignOut = () => {
		signOut();
		navigate("/");
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
				Account Settings
			</h1>

			<section className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
				<h2 className="font-semibold text-slate-900 dark:text-white mb-3">
					Profile
				</h2>
				<p className="text-sm text-slate-600 dark:text-slate-400">
					Name: {user?.name}
				</p>
				<p className="text-sm text-slate-600 dark:text-slate-400">
					Email: {user?.email}
				</p>
			</section>

			<section className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
				<h2 className="font-semibold text-slate-900 dark:text-white mb-3">
					Appearance
				</h2>
				<label className="flex items-center justify-between cursor-pointer">
					<span className="text-sm text-slate-700 dark:text-slate-300">
						Dark Mode
					</span>
					<button
						type="button"
						onClick={toggleTheme}
						className={`w-11 h-6 rounded-full transition-colors relative ${
							isDark ? "bg-primary" : "bg-slate-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
								isDark ? "translate-x-5" : "translate-x-0"
							}`}
						/>
					</button>
				</label>
			</section>

			<section className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
				<h2 className="font-semibold text-slate-900 dark:text-white mb-3">
					Account
				</h2>
				<button
					onClick={handleSignOut}
					className="text-sm text-red-600 dark:text-red-400 hover:underline"
				>
					Sign Out
				</button>
			</section>
		</div>
	);
};

export default Settings;
