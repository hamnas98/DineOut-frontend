function SearchHistory({ history, onSelectHistory, onClearHistory, onRemoveItem }) {
  if (history.length === 0) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Recent Searches
        </p>
        <button
          onClick={onClearHistory}
          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* History List */}
      {history.map((query, index) => (
        <div
          key={index}
          className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
        >
          <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">
            history
          </span>
          
          <button
            onClick={() => onSelectHistory(query)}
            className="flex-1 text-left text-sm text-slate-700 dark:text-slate-300"
          >
            {query}
          </button>

          <button
            onClick={() => onRemoveItem(query)}
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
            aria-label={`Remove "${query}" from history`}
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default SearchHistory