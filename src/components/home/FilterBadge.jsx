function FilterBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
      <span>Filter Label</span>
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${'Filter Label'} filter`}
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  )
}

export default FilterBadge