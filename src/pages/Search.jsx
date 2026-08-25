import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useRestaurantList from "../hooks/useRestaurentList";
import searchRestaurents from "../utils/searchRestaurents";
import RestaurantCardSkeleton from "../components/common/RestaurantCardSkeleton";
import TopRestaurantCard from "../components/home/TopRestaurantCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(urlQuery);
  const { restaurantList, loading } = useRestaurantList();

  useEffect(() => {
    setInputValue(urlQuery);
  }, [urlQuery]);

  const results = useMemo(
    () => searchRestaurents(restaurantList, urlQuery),
    [restaurantList, urlQuery]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex w-full max-w-2xl items-stretch rounded-lg h-12 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 flex border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for restaurant, cuisine or a dish"
            className="flex w-full min-w-0 flex-1 text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 border-r-0 border-l-0 text-sm"
            autoComplete="off"
          />
          {inputValue && (
            <div className="flex items-center justify-center border-l-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          )}
          <div className="flex items-center justify-center rounded-r-lg border-l-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pr-1.5">
            <button
              type="submit"
              className="px-5 h-9 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Results Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {urlQuery ? `Results for "${urlQuery}"` : "Search restaurants"}
        </h1>
        {!loading && urlQuery && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {results.length} restaurant{results.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      ) : !urlQuery ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
            search
          </span>
          <p className="text-slate-600 dark:text-slate-400">
            Search for a restaurant, cuisine, or dish to get started
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((restaurant) => (
            <TopRestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
            search_off
          </span>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No results found for "{urlQuery}"
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Try different keywords or check the spelling
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Browse all restaurants
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;