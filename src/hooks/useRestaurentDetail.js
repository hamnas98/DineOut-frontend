import { useState, useEffect } from "react";
import { getRestaurantData } from "../utils/mockRestaurantData";
import { MENU_API } from "../utils/constants";

function useRestaurantDetail(restaurantId) {
	const [restaurant, setRestaurant] = useState(null);
	const [menu, setMenu] = useState([]);
	const [loading, setLoading] = useState(true);
	const [usingMockData, setUsingMockData] = useState(false);

	useEffect(() => {
		const applyMockData = () => {
			const mockData = getRestaurantData(restaurantId);
			setRestaurant(mockData.restaurant);
			setMenu(mockData.menu);
			setUsingMockData(true);
		};

		const fetchDetails = async () => {
			setLoading(true);
			try {
				const response = await fetch(MENU_API);
				const text = await response.text();

				if (!text) {
					applyMockData();
					return;
				}

				const data = JSON.parse(text);

				const restaurantInfo = data?.data?.cards?.find(
					(card) =>
						card?.card?.card?.["@type"] ===
						"type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
				)?.card?.card?.info;

				if (!restaurantInfo) throw new Error("Restaurant info not found");

				const menuCards = data?.data?.cards?.find(
					(card) => card?.groupedCard?.cardGroupMap?.REGULAR,
				)?.groupedCard?.cardGroupMap?.REGULAR?.cards;

				const menuCategories =
					menuCards
						?.filter((card) =>
							card?.card?.card?.["@type"]?.includes("ItemCategory"),
						)
						.map((card) => ({
							title: card?.card?.card?.title,
							itemCount: card?.card?.card?.itemCards?.length || 0,
							items:
								card?.card?.card?.itemCards?.map((item) => ({
									id: item?.card?.info?.id,
									name: item?.card?.info?.name,
									price:
										(item?.card?.info?.price ||
											item?.card?.info?.defaultPrice) / 100,
									description: item?.card?.info?.description,
									imageId: item?.card?.info?.imageId,
									isVeg:
										item?.card?.info?.itemAttribute?.vegClassifier ===
										"VEG",
									rating:
										item?.card?.info?.ratings?.aggregatedRating
											?.rating,
									ratingCount:
										item?.card?.info?.ratings?.aggregatedRating
											?.ratingCountV2,
								})) || [],
						}))
						.filter((c) => c.items.length > 0) || [];

				if (menuCategories.length === 0)
					throw new Error("No menu items found");

				setRestaurant({
					id: restaurantInfo?.id,
					name: restaurantInfo?.name,
					cuisines: restaurantInfo?.cuisines?.join(", "),
					area: restaurantInfo?.areaName,
					city: restaurantInfo?.city,
					rating: restaurantInfo?.avgRating,
					ratingCount: restaurantInfo?.totalRatingsString,
					costForTwo: restaurantInfo?.costForTwoMessage,
					deliveryTime: restaurantInfo?.sla?.slaString,
					distance: restaurantInfo?.sla?.lastMileTravelString,
					imageId: restaurantInfo?.cloudinaryImageId,
				});
				setMenu(menuCategories);
				setUsingMockData(false);
			} catch (err) {
				console.warn(
					"Live menu fetch failed, using mock data:",
					err.message,
				);
				applyMockData();
			} finally {
				setLoading(false);
			}
		};

		fetchDetails();
	}, [restaurantId]);

	return { restaurant, menu, loading, usingMockData };
}

export default useRestaurantDetail;
