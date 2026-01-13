import { useEffect, useMemo, useState } from "react";
import RestaurantCard from "./RestuarantCard";
import RestaurantCardSkeleton from "../common/RestaurantCardSkeleton";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import FilterBadge from "./FilterBadge";

const RestaurantCarousel = ({ searchQuery = "", onRestaurantsLoaded }) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    cuisines: [],
    minRating: 0,
    maxDeliveryTime: 999,
  });

  useEffect(() => {
    fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.920624&lng=77.650769&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(console.log(response))
        const cards = response.data.cards;
        const restaurantCard = cards.find((card) => {
          return card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        });
        const restaurants =
          restaurantCard?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        const restaurantCardList = restaurants.map((r) => ({
          id: r.info.id,
          name: r.info.name,
          imageId: r.info.cloudinaryImageId,
          cuisines: r.info.cuisines.join(", "),
          cuisineArray: r.info.cuisines,
          rating: r.info.avgRating,
          costForTwo: r.info.costForTwo,
          deliveryTime: r.info.sla?.slaString,
          deliveryMinutes: r.info.sla?.deliveryTime,
          area: r.info.areaName,
          link: r.cta?.link,
        }));
        console.log(restaurantCardList);

        return restaurantCardList;
      })
      .then((restaurantCardList) => {
        setRestaurantList(restaurantCardList);
        setLoadingRestaurants(false);

        // Pass restaurants to parent (Home) component for search suggestions
        if (onRestaurantsLoaded) {
          onRestaurantsLoaded(restaurantCardList);
        }
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoadingRestaurants(false);
      });
  }, [onRestaurantsLoaded]);

  // Apply search filter
  const searchedRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return restaurantList;
    }
    const query = searchQuery.toLowerCase().trim();

    return restaurantList.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(query);
      const cuisineMatch = restaurant.cuisines?.toLowerCase().includes(query);
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
          filters.cuisines.includes(c)
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
    <div>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pb-3 pt-5">
        <div>
          <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
            {isSearchActive
              ? `Search results for "${searchQuery}"`
              : "Top-rated restaurants near you"}
          </h2>
        </div>

        {!loadingRestaurants && restaurantList.length > 0 && (
          <div className="flex items-center gap-3">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onClearAll={handleClearAll}
              availableCuisines={availableCuisines}
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
              onRemove={() => setFilters({ ...filters, maxDeliveryTime: 999 })}
            />
          )}
        </div>
      )}

      {/* Scrollable Container */}
      <div className="flex overflow-x-auto scrollbar-hide">
        {loadingRestaurants ? (
          <div className="flex items-stretch p-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))}
          </div>
        ) : sortedRestaurants.length > 0 ? (
          <div className="flex items-stretch p-4 gap-6">
            {sortedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center w-full">
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
      </div>

      {/* Results Count */}
      {!loadingRestaurants && restaurantList.length > 0 && (
        <div className="px-4 pt-2 pb-4 text-sm text-slate-600 dark:text-slate-400">
          {isSearchActive ? (
            <>
              Found {sortedRestaurants.length} of {restaurantList.length}{" "}
              restaurants
            </>
          ) : (
            <>
              Showing {sortedRestaurants.length} of {restaurantList.length}{" "}
              restaurants
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantCarousel;
