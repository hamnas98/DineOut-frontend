import useFavourites from "../../hooks/useFavourites";

const FavouriteButton = ({ restaurant, className = "" }) => {
	const { isFavourited, toggleFavourite } = useFavourites();
	const favourited = isFavourited(restaurant.id);

	const handleClick = (e) => {
		e.preventDefault(); // prevent Link navigation if inside a card
		e.stopPropagation();
		toggleFavourite(restaurant);
	};

	return (
		<button
			onClick={handleClick}
			aria-label={
				favourited ? "Remove from favourites" : "Add to favourites"
			}
			className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:scale-110 transition-transform ${className}`}
		>
			<span
				className={`material-symbols-outlined text-lg ${
					favourited ? "text-red-500" : "text-slate-500"
				}`}
				style={{
					fontVariationSettings: favourited ? "'FILL' 1" : "'FILL' 0",
				}}
			>
				favorite
			</span>
		</button>
	);
};

export default FavouriteButton;
