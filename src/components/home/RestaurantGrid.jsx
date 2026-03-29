import { useCallback, useEffect, useMemo, useState } from "react";

import RestaurantCardSkeleton from "../common/RestaurantCardSkeleton";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import FilterBadge from "./FilterBadge";
import TopRestaurantCard from "./TopRestaurantCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const RestaurantGrid = ({ searchQuery = "", onRestaurantsLoaded }) => {
	const [restaurantList, setRestaurantList] = useState([]);
	const [loadingRestaurants, setLoadingRestaurants] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [sortBy, setSortBy] = useState("relevance");
	const [filters, setFilters] = useState({
		cuisines: [],
		minRating: 0,
		maxDeliveryTime: 999,
	});

	const [pageOffset, setPageOffset] = useState(null);
	const [csrfToken, setCsrfToken] = useState(null);
	const [hasMore, setHasMore] = useState(true);
	const [totalFetched, setTotalFetched] = useState(0);

	const LAT = "12.946220755410387";
	const LNG = "77.67176236957312";

	// Parse restaurant data
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
					loyaltyDiscoverPresentationInfo?.freedelMessage ||
					"Free Delivery",
				offer: offerText,
				link: r.cta?.link,
			};
		});
	};

	useEffect(() => {
		const fetchInitialRestaurants = async () => {
			try {
				const jsonResponse = await fetch(
					"https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.946220755410387&lng=77.67176236957312&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
				).then((res) => res.json());
				const cards = jsonResponse?.data?.cards || [];
				const restaurantCard = cards.find(
					(c) => c?.card?.card?.id === "restaurant_grid_listing_v2",
				);
				const restaurants =
					restaurantCard?.card?.card?.gridElements?.infoWithStyle
						?.restaurants || [];
				const restaurantCardList = parseRestaurantData(restaurants);
				const pageOffsetData = jsonResponse?.data?.pageOffset;
				const csrf = jsonResponse?.csrfToken;
				setRestaurantList(restaurantCardList);
				setPageOffset(pageOffsetData);
				setCsrfToken(csrf);
				setTotalFetched(restaurantCardList.length);
				setLoadingRestaurants(false);
				setHasMore(!!pageOffsetData?.nextOffset);
				if (onRestaurantsLoaded) {
					onRestaurantsLoaded(restaurantCardList);
				}

				console.log("📦 Initial load:", {
					count: restaurantCardList.length,
					hasNextPage: !!pageOffsetData?.nextOffset,
				});
			} catch (error) {
				console.error("Error fetching restaurants:", error);
				setLoadingRestaurants(false);
				setHasMore(false);
			}
		};

		fetchInitialRestaurants();
	}, []);

	const fetchMoreRestaurants = useCallback(async () => {
		if (!hasMore || loadingMore || !pageOffset?.nextOffset) {
			return;
		}
		setLoadingMore(true);
		console.log("📥 Loading more restaurants...");
		try {
			const response = await fetch(
				"https://www.swiggy.com/dapi/restaurants/list/update",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
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
				},
			);
			const jsonResponse = await response.json();
			const cards = jsonResponse?.data?.cards || [];
			const restaurantCard = cards.find(
				(c) => c?.card?.card?.id === "restaurant_grid_listing",
			);
			const newRestaurants =
				restaurantCard?.card?.card?.gridElements?.infoWithStyle
					?.restaurants || [];
			const newRestaurantCardList = parseRestaurantData(newRestaurants);
			const updatedList = [...restaurantList, ...newRestaurantCardList];
			setRestaurantList(updatedList);
			setTotalFetched(updatedList.length);
			const newPageOffset = jsonResponse?.data?.pageOffset;
			setPageOffset(newPageOffset);
			setHasMore(!!newPageOffset?.nextOffset);

			if (onRestaurantsLoaded) {
				onRestaurantsLoaded(updatedList);
			}

			console.log("✅ Loaded more:", {
				newCount: newRestaurantCardList.length,
				totalCount: updatedList.length,
				hasMore: !!newPageOffset?.nextOffset,
			});
		} catch (error) {
			console.error("Error loading more restaurants:", error);
			setHasMore(false);
		} finally {
			setLoadingMore(false);
		}
	}, [
		hasMore,
		loadingMore,
		pageOffset,
		csrfToken,
		restaurantList,
		onRestaurantsLoaded,
	]);
	const lastRestaurantRef = useInfiniteScroll(
		fetchMoreRestaurants,
		hasMore,
		loadingMore,
	);
	// Apply search filter
	const searchedRestaurants = useMemo(() => {
		if (!searchQuery.trim()) {
			return restaurantList;
		}
		const query = searchQuery.toLowerCase().trim();

		return restaurantList.filter((restaurant) => {
			const nameMatch = restaurant.name.toLowerCase().includes(query);
			const cuisineMatch = restaurant.cuisines
				?.toLowerCase()
				.includes(query);
			const areaMatch = restaurant.area?.toLowerCase().includes(query);
			return nameMatch || cuisineMatch || areaMatch;
		});
	}, [restaurantList, searchQuery]);

	// Get unique cuisines
	const availableCuisines = useMemo(() => {
		const cuisineSet = new Set();
		restaurantList.forEach((restaurant) => {
			restaurant.cuisineArray?.forEach((cuisine) => {
				cuisineSet.add(cuisine);
			});
		});
		return Array.from(cuisineSet).sort();
	}, [restaurantList]);

	// Apply filters
	const filteredRestaurants = useMemo(() => {
		return searchedRestaurants.filter((restaurant) => {
			// Cuisine filter
			if (filters.cuisines.length > 0) {
				const hasMatchingCuisine = restaurant.cuisineArray?.some((c) =>
					filters.cuisines.includes(c),
				);
				if (!hasMatchingCuisine) {
					return false;
				}
			}
			// Rating filter
			if (filters.minRating > 0 && restaurant.rating < filters.minRating) {
				return false;
			}
			// Delivery time filter
			if (
				filters.maxDeliveryTime < 999 &&
				restaurant.deliveryMinutes > filters.maxDeliveryTime
			) {
				return false;
			}
			return true;
		});
	}, [searchedRestaurants, filters]);

	// Apply sorting
	const sortedRestaurants = useMemo(() => {
		const sorted = [...filteredRestaurants];

		switch (sortBy) {
			case "rating":
				return sorted.sort((a, b) => b.rating - a.rating);

			case "deliveryTime":
				return sorted.sort((a, b) => a.deliveryMinutes - b.deliveryMinutes);

			case "name":
				return sorted.sort((a, b) => a.name.localeCompare(b.name));

			case "relevance":
			default:
				return sorted;
		}
	}, [filteredRestaurants, sortBy]);

	const handleClearAll = () => {
		setFilters({
			cuisines: [],
			minRating: 0,
			maxDeliveryTime: 999,
		});
	};

	const handleRemoveCuisine = (cuisine) => {
		setFilters({
			...filters,
			cuisines: filters.cuisines.filter((c) => c !== cuisine),
		});
	};

	const activeFiltersCount =
		filters.cuisines.length +
		(filters.minRating > 0 ? 1 : 0) +
		(filters.maxDeliveryTime < 999 ? 1 : 0);

	const isSearchActive = searchQuery.trim().length > 0;

	return (
		<div className="py-8">
			{/* Section Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pb-6">
				<div>
					<h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
						{isSearchActive
							? `Search results for "${searchQuery}"`
							: "Restaurants with online food delivery in Bangalore"}
					</h2>
					{!loadingRestaurants && (
						<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
							{totalFetched} restaurants loaded
							{hasMore && " • Scroll for more"}
						</p>
					)}
				</div>

				{!loadingRestaurants && restaurantList.length > 0 && (
					<div className="flex items-center gap-3">
						<FilterSidebar
							filters={filters}
							onFilterChange={setFilters}
							availableCuisines={availableCuisines}
							activeFiltersCount={activeFiltersCount}
						/>
						<SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
					</div>
				)}
			</div>

			{/* Active Search/Filter Badges */}
			{!loadingRestaurants && (isSearchActive || activeFiltersCount > 0) && (
				<div className="flex flex-wrap items-center gap-2 px-4 pb-4">
					<span className="text-sm text-slate-600 dark:text-slate-400">
						{isSearchActive ? "Searching:" : "Active filters:"}
					</span>

					{/* Search Badge */}
					{isSearchActive && (
						<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
							<span className="material-symbols-outlined text-base">
								search
							</span>
							<span>{searchQuery}</span>
						</div>
					)}

					{/* Filter Badges */}
					{filters.cuisines.map((cuisine) => (
						<FilterBadge
							key={cuisine}
							label={cuisine}
							onRemove={() => handleRemoveCuisine(cuisine)}
						/>
					))}
					{filters.minRating > 0 && (
						<FilterBadge
							label={`${filters.minRating}+ Stars`}
							onRemove={() => setFilters({ ...filters, minRating: 0 })}
						/>
					)}
					{filters.maxDeliveryTime < 999 && (
						<FilterBadge
							label={`<${filters.maxDeliveryTime} min`}
							onRemove={() =>
								setFilters({ ...filters, maxDeliveryTime: 999 })
							}
						/>
					)}
				</div>
			)}

			{/* Restaurant Grid - CHANGED FROM HORIZONTAL TO VERTICAL */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
				{loadingRestaurants ? (
					[...Array(8)].map((_, index) => (
						<RestaurantCardSkeleton key={index} />
					))
				) : sortedRestaurants.length > 0 ? (
					sortedRestaurants.map((restaurant, index) => {
						// Attach ref to last restaurant for infinite scroll
						const isLast = index === sortedRestaurants.length - 1;
						return (
							<div
								key={restaurant.id}
								ref={isLast ? lastRestaurantRef : null}
							>
								<TopRestaurantCard restaurant={restaurant} />
							</div>
						);
					})
				) : (
					<div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
						<span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
							{isSearchActive ? "search_off" : "restaurant_menu"}
						</span>
						<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
							{isSearchActive
								? `No results found for "${searchQuery}"`
								: "No restaurants found"}
						</h3>
						<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
							{isSearchActive
								? "Try searching with different keywords"
								: "Try adjusting your filters to see more results"}
						</p>
						{activeFiltersCount > 0 && (
							<button
								onClick={handleClearAll}
								className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
							>
								Clear All Filters
							</button>
						)}
					</div>
				)}

				{/* Loading More Indicator */}
				{loadingMore &&
					[...Array(4)].map((_, index) => (
						<RestaurantCardSkeleton key={`loading-${index}`} />
					))}
			</div>

			{/* End of List Message */}
			{!hasMore && !loadingRestaurants && sortedRestaurants.length > 0 && (
				<div className="text-center py-8">
					<p className="text-slate-600 dark:text-slate-400 text-sm">
						You've reached the end • {totalFetched} restaurants loaded
					</p>
				</div>
			)}

			{/* Bottom Border */}
			<div className="mt-8 border-t border-slate-200 dark:border-slate-700" />
		</div>
	);
};

export default RestaurantGrid;
