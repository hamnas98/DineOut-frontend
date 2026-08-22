import TopRestuarantCard from "./TopRestaurantCard";
import RestaurantCardSkeleton from "../common/RestaurantCardSkeleton";
import useTopRestaurants from "../../hooks/useTopRestaurants";
import useScrollButtons from "../../hooks/useScrollButtons";

const TopRestuarantCarousel = () => {
	const { topRestaurantList, loading } = useTopRestaurants();
	const {
		scrollContainerRef,
		canScrollLeft,
		canScrollRight,
		scroll,
		checkScrollButtons,
	} = useScrollButtons([topRestaurantList]);

	return (
		<div className="py-8">
			{/* Header */}
			<div className="flex items-center justify-between px-4 pb-6">
				<h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
					Top restaurant chains in Bangalore
				</h2>

				{/* Navigation Buttons */}
				<div className="hidden md:flex items-center gap-2">
					<button
						onClick={() => scroll("left")}
						disabled={!canScrollLeft}
						className={`p-2 rounded-full transition-all ${
							canScrollLeft
								? "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
								: "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
						}`}
						aria-label="Scroll left"
					>
						<span className="material-symbols-outlined">arrow_back</span>
					</button>
					<button
						onClick={() => scroll("right")}
						disabled={!canScrollRight}
						className={`p-2 rounded-full transition-all ${
							canScrollRight
								? "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
								: "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
						}`}
						aria-label="Scroll right"
					>
						<span className="material-symbols-outlined">
							arrow_forward
						</span>
					</button>
				</div>
			</div>

			{/* Scrollable Chains */}
			<div
				ref={scrollContainerRef}
				onScroll={checkScrollButtons}
				className="flex overflow-x-auto scrollbar-hide gap-6 px-4 pb-4"
			>
				{loading
					? [...Array(4)].map((_, index) => (
							<RestaurantCardSkeleton key={index} />
						))
					: topRestaurantList.map((restaurant) => (
							<TopRestuarantCard
								key={restaurant.id}
								restaurant={restaurant}
							/>
						))}
			</div>

			{/* Bottom Border */}
			<div className="mt-8 border-t border-slate-200 dark:border-slate-700" />
		</div>
	);
};

export default TopRestuarantCarousel;
