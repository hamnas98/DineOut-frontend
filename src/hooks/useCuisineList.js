import { useState, useEffect } from "react";
import { CUISINE_API } from "../utils/constants";

function getCuisineName(link) {
	const match = link?.match(/query=([^&]+)/);
	return match ? decodeURIComponent(match[1]) : "";
}

function useCuisineList() {
	const [cuisineList, setCuisineList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCuisines = async () => {
			try {
				const response = await fetch(CUISINE_API);
				const json = await response.json();

				const cards = json?.data?.cards || [];
				const cuisineCard = cards.find(
					(c) => c?.card?.card?.id === "whats_on_your_mind",
				);
				const cuisines =
					cuisineCard?.card?.card?.gridElements?.infoWithStyle?.info || [];

				const cuisineCardList = cuisines.map((cuisine) => ({
					id: cuisine.id,
					name: getCuisineName(cuisine.action?.link),
					imageId: cuisine.imageId,
					link: cuisine.action?.link,
				}));

				setCuisineList(cuisineCardList);
			} catch (error) {
				console.error("Error fetching personalized cuisine:", error);
				setCuisineList([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCuisines();
	}, []);

	return { cuisineList, loading };
}

export default useCuisineList;
