import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AuthModal = ({ isOpen, onClose }) => {
	const { signIn, signUp } = useAuth();
	const [mode, setMode] = useState("signin"); // "signin" | "signup"
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (!isOpen) return null;

	const resetForm = () => {
		setFormData({ name: "", email: "", password: "" });
		setError("");
	};

	const switchMode = (newMode) => {
		setMode(newMode);
		resetForm();
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (mode === "signup") {
				if (!formData.name.trim()) {
					throw new Error("Please enter your name.");
				}
				signUp(formData);
			} else {
				signIn(formData);
			}
			resetForm();
			onClose();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
			onClick={onClose}
		>
			<div
				className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-bold text-slate-900 dark:text-white">
						{mode === "signin" ? "Sign In" : "Create Account"}
					</h2>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
						aria-label="Close"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>

				{/* Tabs */}
				<div className="flex mb-6 border-b border-slate-200 dark:border-slate-700">
					<button
						onClick={() => switchMode("signin")}
						className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
							mode === "signin"
								? "text-primary border-b-2 border-primary"
								: "text-slate-500 dark:text-slate-400"
						}`}
					>
						Sign In
					</button>
					<button
						onClick={() => switchMode("signup")}
						className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
							mode === "signup"
								? "text-primary border-b-2 border-primary"
								: "text-slate-500 dark:text-slate-400"
						}`}
					>
						Sign Up
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					{mode === "signup" && (
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
								Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
								placeholder="Your name"
								autoComplete="name"
							/>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
							placeholder="you@example.com"
							autoComplete="email"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							minLength={4}
							className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
							placeholder="••••••••"
							autoComplete={
								mode === "signin" ? "current-password" : "new-password"
							}
						/>
					</div>

					{error && (
						<p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
					>
						{loading
							? "Please wait..."
							: mode === "signin"
								? "Sign In"
								: "Create Account"}
					</button>
				</form>

				{/* Switch prompt */}
				<p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
					{mode === "signin" ? (
						<>
							Don't have an account?{" "}
							<button
								onClick={() => switchMode("signup")}
								className="text-primary font-semibold hover:underline"
							>
								Sign up
							</button>
						</>
					) : (
						<>
							Already have an account?{" "}
							<button
								onClick={() => switchMode("signin")}
								className="text-primary font-semibold hover:underline"
							>
								Sign in
							</button>
						</>
					)}
				</p>
			</div>
		</div>
	);
};

export default AuthModal;
