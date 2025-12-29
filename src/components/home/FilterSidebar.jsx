import { useState } from "react";

function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);

    const ratingOptions = [
    { label: '4.5+ Stars', value: 4.5 },
    { label: '4.0+ Stars', value: 4.0 },
    { label: '3.5+ Stars', value: 3.5 },
    {label : 'Any Rating', value : 0}
  ]
  
  const deliveryTimeOptions = [
    { label: 'Fast (<30 min)', value: 'fast', max: 30 },
    { label: 'Medium (30-45 min)', value: 'medium', max: 45 },
    { label: 'Any', value: 'any', max: 999 }
  ]
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-xl">tune</span>
        Filters
        <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          3
        </span>
      </button>

      {/* Desktop Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-xl">tune</span>
        Filters
        <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          3
        </span>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filter Sidebar/Modal */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-6 overflow-y-auto transition-transform duration-300 z-50 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Filters
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Clear All Button */}
          <button  className="w-full mb-6 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/10 rounded-lg transition-colors">
            Clear All Filter
          </button>

          {/* Cuisine Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Cuisine Type
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Indian
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Chinese
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Italian
                </span>
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Minimum Rating
            </h4>
            <div className="space-y-2">
              {ratingOptions.map(option => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  className="w-4 h-4 border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </label>
              ))}
            </div>
          </div>

          {/* Delivery Time Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Delivery Time
            </h4>
            <div className="space-y-2">
              {deliveryTimeOptions.map(option => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="deliveryTime"
                  className="w-4 h-4 border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </label>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Apply Filters
          </button>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
