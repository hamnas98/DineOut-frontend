import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../store/favouritesSlice";

function useFavourites() {
	const dispatch = useDispatch();
	const favourites = useSelector((state) => state.favourites.list);

	const isFavourited = (restaurantId) =>
		favourites.some((r) => r.id === restaurantId);

	return {
		favourites,
		isFavourited,
		toggleFavourite: (restaurant) => dispatch(toggleFavourite(restaurant)),
	};
}

export default useFavourites;
