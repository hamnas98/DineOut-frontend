import { useState, useEffect } from "react";
import { TOPRESTAURENT_API } from "../utils/constants";

function parseTopRestaurant(r) {
	const loyaltyDiscoverPresentationInfo =
		r.info.loyaltyDiscoverPresentationInfo;

	let offerText = null;
	if (r.info.aggregatedDiscountInfoV3) {
		const discountInfo = r.info.aggregatedDiscountInfoV3;
		offerText = [discountInfo.header, discountInfo.subHeader]
			.filter(Boolean)
			.join(" ");
	}

	return {
		id: r.info.id,
		name: r.info.name,
		imageId: r.info.cloudinaryImageId,
		cuisines: r.info.cuisines.join(", "),
		rating: r.info.avgRating,
		costForTwo: r.info.costForTwo,
		deliveryTime: r.info.sla?.slaString,
		distance: r.info.sla?.lastMileTravelString,
		area: r.info.areaName,
		isOpen: r.info.isOpen,
		discount:
			loyaltyDiscoverPresentationInfo?.freedelMessage || "Free Delivery",
		offer: offerText,
		link: r.cta?.link,
	};
}

function useTopRestaurants() {
	const [topRestaurantList, setTopRestaurantList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTopRestaurants = async () => {
			try {
				const response = await fetch(TOPRESTAURENT_API);
				const jsonResponse = await response.json();

				const cards = jsonResponse?.data?.cards || [];
				const topRestaurantsCard = cards.find(
					(c) => c?.card?.card?.id === "top_brands_for_you",
				);
				const restaurants =
					topRestaurantsCard?.card?.card?.gridElements?.infoWithStyle
						?.restaurants || [];

				setTopRestaurantList(restaurants.map(parseTopRestaurant));
			} catch (error) {
				console.error("Error fetching topBrandRestaurants:", error);
				setTopRestaurantList([]);
			} finally {
				setLoading(false);
			}
		};

		fetchTopRestaurants();
	}, []);

	return { topRestaurantList, loading };
}

export default useTopRestaurants;
