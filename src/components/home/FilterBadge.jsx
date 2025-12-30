function FilterBadge({ label, onRemove }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  )
}

export default FilterBadge