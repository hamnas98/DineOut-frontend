import { useEffect, useMemo, useState } from "react";

import RestaurantCardSkeleton from "../common/RestaurantCardSkeleton";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import FilterBadge from "./FilterBadge";
import TopRestaurantCard from "./TopRestaurantCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useRestaurantList from "../../hooks/useRestaurentList";
import searchRestaurents from "../../utils/searchRestaurents";
import PromotedTopRestaurantCard from "./TopRestaurantCard";

const RestaurantGrid = ({ searchQuery = "", onRestaurantsLoaded }) => {
	const { restaurantList, fetchMore, hasMore, loading, loadingMore } =
		useRestaurantList();

	const [sortBy, setSortBy] = useState("relevance");
	const [filters, setFilters] = useState({
		cuisines: [],
		minRating: 0,
		maxDeliveryTime: 999,
	});

	const lastRestaurantRef = useInfiniteScroll(fetchMore, hasMore, loadingMore);

	useEffect(() => {
		if (!loading && onRestaurantsLoaded) {
			onRestaurantsLoaded(restaurantList);
		}
	}, [restaurantList, loading]);

	const searchedRestaurants = useMemo(() => {
		return searchRestaurents(restaurantList, searchQuery);
	}, [restaurantList, searchQuery]);

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
					{!loading && (
						<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
							{/* ✅ FIXED: was "totalFetched" (unused/unsynced state) */}
							{restaurantList.length} restaurants loaded
							{hasMore && " • Scroll for more"}
						</p>
					)}
				</div>

				{!loading && restaurantList.length > 0 && (
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
			{!loading && (isSearchActive || activeFiltersCount > 0) && (
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

			{/* Restaurant Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
				{loading ? (
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
								<PromotedTopRestaurantCard restaurant={restaurant} />
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

				{loadingMore &&
					[...Array(4)].map((_, index) => (
						<RestaurantCardSkeleton key={`loading-${index}`} />
					))}
			</div>

			{!hasMore && !loading && sortedRestaurants.length > 0 && (
				<div className="text-center py-8">
					<p className="text-slate-600 dark:text-slate-400 text-sm">
						Showing {restaurantList.length} restaurants near you
					</p>
				</div>
			)}

			<div className="mt-8 border-t border-slate-200 dark:border-slate-700" />
		</div>
	);
};

export default RestaurantGrid;
