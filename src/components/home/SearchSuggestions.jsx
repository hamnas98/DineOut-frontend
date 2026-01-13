import { useMemo } from "react";

const SearchSuggestions = ({ restaurants = [], searchQuery = "", showSuggestions }) => {
  const suggestions = useMemo(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return restaurants
        .filter((res) => {
          const nameMatch = res.name.toLowerCase().includes(query);
          const cuisineMatch = res.cuisines.toLowerCase().includes(query);
          const areaMatch = res.area?.toLowerCase().includes(query);
          return nameMatch || cuisineMatch || areaMatch;
        })
        .slice(0, 6);
    } else {
      return [];
    }
  }, [searchQuery, restaurants]);

  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Suggestions ({suggestions.length})
        </p>
      </div>

      {/* Suggestions List */}
      {suggestions.map((res) => (
        <button
          key={res.id}
          className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          {/* Restaurant Image */}
          <div
            className="w-14 h-14 bg-center bg-cover rounded-lg flex-shrink-0 border border-slate-200 dark:border-slate-700"
            style={{
              backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/${res.imageId}")`,
            }}
          />

          {/* Restaurant Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {res.name}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {res.cuisines}
            </p>
            {res.area && (
              <p className="text-xs text-slate-500 dark:text-slate-500 truncate mt-0.5">
                📍 {res.area}
              </p>
            )}
          </div>

          {/* Rating & Delivery */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-bold text-green-800 dark:text-green-400">
                {res.rating}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {res.deliveryTime}
            </span>
          </div>
        </button>
      ))}

      {/* View All Results */}
      {suggestions.length === 6 && (
        <button className="w-full px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors border-t border-slate-200 dark:border-slate-700">
          View all results for "{searchQuery}" →
        </button>
      )}
    </div>
  );
};

export default SearchSuggestions;