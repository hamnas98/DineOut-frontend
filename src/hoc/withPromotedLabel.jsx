function withPromotedLabel(WrappedComponent) {
	return ({ restaurant }) => {
		const isPromoted = Boolean(restaurant?.promoted);

		return (
			<div className="relative">
				{isPromoted && (
					<div className="absolute top-3 right-0 z-10 flex items-center gap-1 px-2 py-1 bg-slate-900/80 dark:bg-slate-100/90 rounded-md backdrop-blur-sm">
						<span className="material-symbols-outlined text-[14px] text-yellow-400 dark:text-yellow-600 leading-none">
							bolt
						</span>
						<span className="text-[10px] font-semibold text-white dark:text-slate-900 uppercase tracking-wide">
							Promoted
						</span>
					</div>
				)}
				<WrappedComponent restaurant={restaurant} />
			</div>
		);
	};

	// Helpful for React DevTools — shows "WithPromotedLabel(TopRestaurantCard)"
	// instead of just "WithPromotedLabel"
	const wrappedName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";
	WithPromotedLabel.displayName = `WithPromotedLabel(${wrappedName})`;

	return WithPromotedLabel;
}

export default withPromotedLabel;
