// src/hooks/useRestaurantList.js
import { useState, useEffect, useCallback } from "react";
import {
	INITIAL_RESTAURANT_API,
	LAT,
	LNG,
	MORE_RESTAURANT_API,
} from "../utils/constants";

const parseRestaurantData = (restaurants) => {
	return restaurants.map((r) => {
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
			cuisineArray: r.info.cuisines,
			rating: r.info.avgRating,
			costForTwo: r.info.costForTwo,
			deliveryTime: r.info.sla?.slaString,
			deliveryMinutes: r.info.sla?.deliveryTime,
			distance: r.info.sla?.lastMileTravelString,
			area: r.info.areaName,
			isOpen: r.info.isOpen,
			discount:
				loyaltyDiscoverPresentationInfo?.freedelMessage || "Free Delivery",
			offer: offerText,
			link: r.cta?.link,
		};
	});
};

/**
 * Fetches the initial restaurant list + exposes a fetchMore()
 * for pagination (which currently always ends after page 1 —
 * see notes on Swiggy's WAF blocking /list/update).
 */
function useRestaurantList() {
	const [restaurantList, setRestaurantList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [pageOffset, setPageOffset] = useState(null);
	const [csrfToken, setCsrfToken] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchInitial = async () => {
			try {
				const jsonResponse = await fetch(INITIAL_RESTAURANT_API).then(
					(res) => res.json(),
				);

				const cards = jsonResponse?.data?.cards || [];
				const restaurantCard = cards.find(
					(c) => c?.card?.card?.id === "restaurant_grid_listing_v2",
				);
				const restaurants =
					restaurantCard?.card?.card?.gridElements?.infoWithStyle
						?.restaurants || [];

				setRestaurantList(parseRestaurantData(restaurants));
				setPageOffset(jsonResponse?.data?.pageOffset);
				setCsrfToken(jsonResponse?.csrfToken);
				setHasMore(!!jsonResponse?.data?.pageOffset?.nextOffset);
			} catch (err) {
				console.error("Error fetching restaurants:", err);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		};

		fetchInitial();
	}, []);

	const fetchMore = useCallback(async () => {
		if (!hasMore || loadingMore || !pageOffset?.nextOffset) return;

		setLoadingMore(true);
		try {
			const response = await fetch(MORE_RESTAURANT_API, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					lat: parseFloat(LAT),
					lng: parseFloat(LNG),
					nextOffset: pageOffset.nextOffset,
					widgetOffset: pageOffset.widgetOffset || {},
					filters: {},
					seoParams: {
						seoUrl: "https://www.swiggy.com/",
						pageType: "FOOD_HOMEPAGE",
						apiName: "FoodHomePage",
					},
					page_type: "DESKTOP_WEB_LISTING",
					_csrf: csrfToken || "",
				}),
			});

			const text = await response.text();

			if (!text) {
				// Swiggy WAF blocks this endpoint from browser fetches — expected, not an error
				setHasMore(false);
				return;
			}

			const jsonResponse = JSON.parse(text);
			const cards = jsonResponse?.data?.cards || [];
			const restaurantCard = cards.find(
				(c) => c?.card?.card?.id === "restaurant_grid_listing",
			);
			const newRestaurants =
				restaurantCard?.card?.card?.gridElements?.infoWithStyle
					?.restaurants || [];

			setRestaurantList((prev) => [
				...prev,
				...parseRestaurantData(newRestaurants),
			]);
			const newPageOffset = jsonResponse?.data?.pageOffset;
			setPageOffset(newPageOffset);
			setHasMore(!!newPageOffset?.nextOffset);
		} catch (err) {
			console.error("Error loading more restaurants:", err);
			setHasMore(false);
		} finally {
			setLoadingMore(false);
		}
	}, [hasMore, loadingMore, pageOffset, csrfToken]);

	return { restaurantList, loading, loadingMore, hasMore, fetchMore };
}

export default useRestaurantList;
