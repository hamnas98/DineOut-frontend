import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
			<h1 className="text-9xl font-black text-primary mb-4">404</h1>
			<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
				Page Not Found
			</h2>
			<p className="text-slate-600 dark:text-slate-400 mb-8">
				The page you're looking for doesn't exist.
			</p>
			<Link
				to="/"
				className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
			>
				<span className="material-symbols-outlined">home</span>
				Go Home
			</Link>
		</div>
	);
}

export default NotFound;
