import { useState, useEffect, useRef } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchSuggestions from "./SearchSuggestions";
import SearchHistory from "./SearchHistory";
import useSearchHistory from "../../hooks/useSearchHistory";



function HeroSection({ onSearch, restaurants = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const searchRef = useRef(null);
  const { history, saveSearch, clearHistory, removeFromHistory } = useSearchHistory();

  // Handle debounced search
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery);
      onSearch(searchQuery);
      setIsFocused(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
    setIsFocused(false);
  };

  const handleSelectRestaurant = (restaurant) => {
    setSearchQuery(restaurant.name);
    saveSearch(restaurant.name);
    onSearch(restaurant.name);
    setIsFocused(false);
  };

  const handleSelectHistory = (query) => {
    setSearchQuery(query);
    onSearch(query);
    setIsFocused(false);
  };

  const handleSelectSuggestion = (query) => {
    saveSearch(query);
    setIsFocused(false);
  };

  const showSuggestions = isFocused && searchQuery.trim().length > 0;
  const showHistory =
    isFocused && searchQuery.trim().length === 0 && history.length > 0;

  return (
    <div className="py-10">
      <div className="sm:p-4">
        <div
          className="flex min-h-[400px] sm:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:gap-8 sm:rounded-xl items-center justify-center p-4 text-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCveuiWdyawnDpagGc642CHS1IIe2oF6f9WcMJw2Xhng2ttJzX9YxTyP2lo0qWfLsR_VyO8cgwBJQP3H9ylUeh9f1uTvl2a6jn0vcFAIICDi8cvOkbyN0ZYm0yj1TGjl94_rAWbqDxyy2t_P8zWqbAyycTQZ02r5i39cPZ3uUT5SFy_cENZMPNAfrlfe2yJSYIuhaGmb5EmaUXUHicRCu_fgnbU_eMaahT9FsXsprP6hUDzNOLmIfm6dG2YFDIYwsfFRw5doXJwZHWL")',
          }}
          role="img"
          aria-label="A delicious spread of various food dishes on a dark background"
        >
          {/* Hero Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
              Unexpected guests? Order food and get it delivered.
            </h1>
            <h2 className="text-white/90 text-sm font-normal leading-normal sm:text-base">
              Find your favorite restaurants, cuisines, and dishes.
            </h2>
          </div>

          {/* Search Bar with Suggestions */}
          <div
            ref={searchRef}
            className="w-full max-w-[580px] relative"
          >
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-14 sm:h-16 shadow-lg">
                {/* Search Icon */}
                <div className="text-slate-500 dark:text-slate-400 flex border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pl-[15px] rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    search
                  </span>
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsFocused(true)}
                  onChange={handleInputChange}
                  className="flex w-full min-w-0 flex-1 text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-[15px] border-r-0 border-l-0 text-sm font-normal leading-normal sm:text-base"
                  placeholder="Search for restaurant, cuisine or a dish"
                  aria-label="Search for restaurant, cuisine or a dish"
                  autoComplete="off"
                />

                {/* Clear Button */}
                {searchQuery && (
                  <div className="flex items-center justify-center border-l-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark px-2">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      aria-label="Clear search"
                    >
                      <span className="material-symbols-outlined text-xl">
                        close
                      </span>
                    </button>
                  </div>
                )}

                {/* Search Button */}
                <div className="flex items-center justify-center rounded-r-lg border-l-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark pr-[7px]">
                  <button
                    type="submit"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:bg-primary/90 transition-colors"
                    aria-label="Submit search"
                  >
                    <span className="truncate">Search</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && (
              <SearchSuggestions
                restaurants={restaurants}
                searchQuery={searchQuery}
                onSelectRestaurant={handleSelectRestaurant}
                onSelectSuggestion={handleSelectSuggestion}
                showSuggestions={showSuggestions}
              />
            )}

            {/* Search History */}
            {showHistory && (
              <SearchHistory
                history={history}
                onSelectHistory={handleSelectHistory}
                onClearHistory={clearHistory}
                onRemoveItem={removeFromHistory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;