import { Link } from "react-router-dom";
import useFavourites from "../hooks/useFavourites";
import TopRestaurantCard from "../components/home/TopRestaurantCard";

const Favourites = () => {
	const { favourites } = useFavourites();

	if (favourites.length === 0) {
		return (
			<div className="text-center py-12">
				<span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
					favorite
				</span>
				<h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
					No favourites yet
				</h2>
				<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
					Tap the heart icon on any restaurant to save it here.
				</p>
				<Link
					to="/"
					className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
				>
					Browse Restaurants
				</Link>
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
				My Favourites
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{favourites.map((restaurant) => (
					<TopRestaurantCard key={restaurant.id} restaurant={restaurant} />
				))}
			</div>
		</div>
	);
};

export default Favourites;
