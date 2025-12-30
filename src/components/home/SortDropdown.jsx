import { useState, useRef, useEffect } from "react";

function SortDropdown({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "relevance", label: "Relevance", icon: "star" },
    { value: "rating", label: "Rating (High to Low)", icon: "grade" },
    { value: "deliveryTime", label: "Delivery Time (Fast)", icon: "schedule" },
    { value: "name", label: "Name (A-Z)", icon: "sort_by_alpha" },
  ];

  const currentSort = sortOptions.find((opt) => opt.value === sortBy);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-xl">swap_vert</span>
        <span className="hidden sm:inline">
          {currentSort.label === "Relevance" ? "Sort By" : currentSort.label}
        </span>
        <span className="material-symbols-outlined text-xl transition-transform">
          {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors
                ${
                  sortBy === option.value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }
              `}
            >
              <span className="material-symbols-outlined text-xl">
                {option.icon}
              </span>
              <span>{option.label}</span>
              {sortBy === option.value && (
                <span className="material-symbols-outlined text-xl ml-auto">
                  check
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
