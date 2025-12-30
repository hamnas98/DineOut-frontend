import { useEffect, useMemo, useState } from "react";
import RestaurantCard from "./RestuarantCard";
import RestaurantCardSkeleton from "../common/RestaurantCardSkeleton";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import FilterBadge from "./FilterBadge";

const RestaurantCarousel = ({ seachQuery = "" }) => {
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
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9121181&lng=77.6445548&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((res) => res.json())
      .then((response) => {
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

        return restaurantCardList;
      })
      .then((restaurantCardList) => {
        setRestaurantList(restaurantCardList);
        setLoadingRestaurants(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoadingRestaurants(false);
      });
  }, []);

  const searchedRestaurents = useMemo(() => {
    if (!seachQuery.trim()) {
      return restaurantList;
    }
    const query = seachQuery.toLocaleLowerCase();

    return restaurantList.filter((restaurant) => {
      const name = restaurant.name.toLowerCase().includes(query);
      const cuisine = restaurant.cuisines?.toLowerCase().includes(query);
      const area = restaurant.area?.toLowerCase().includes(query);
      return name || cuisine || area;
    });
  }, [restaurantList, seachQuery]);

  const availableCuisines = useMemo(() => {
    const cuisineSet = new Set();
    restaurantList.forEach((restaurant) => {
      restaurant.cuisineArray?.forEach((cuisine) => {
        cuisineSet.add(cuisine);
      });
    });
    return Array.from(cuisineSet).sort();
  }, [restaurantList]);

  function handleRemoveCuisine(cuisine) {
    setFilters({
      ...filters,
      cuisines: filters.cuisines.filter((cuis) => cuis !== cuisine),
    });
  }

  const activeFiltersCount =
    filters.cuisines.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxDeliveryTime < 999 ? 1 : 0);

  const filteredRestaurants = useMemo(() => {
    return searchedRestaurents.filter((restaurant) => {
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
  }, [searchedRestaurents, filters]);

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

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pb-3 pt-5">
        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Top-rated restaurants near you
        </h2>
      </div>

      {/* Filter, Sort and Filter Badges Row */}
      {!loadingRestaurants && restaurantList.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 px-4 pb-4">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            availableCuisines={availableCuisines}
            activeFiltersCount={activeFiltersCount}
          />
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          
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
              restaurant_menu
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No restaurants found
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loadingRestaurants && (
        <div className="px-4 pt-2 pb-4 text-sm text-slate-600 dark:text-slate-400">
          Showing {sortedRestaurants.length} of {restaurantList.length} restaurants
        </div>
      )}
    </div>
  );
};

export default RestaurantCarousel;