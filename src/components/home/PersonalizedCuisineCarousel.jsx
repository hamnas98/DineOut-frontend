import CuisineCard from "./CusineCard";
import CuisineCardSkeleton from "../common/CuisineCardSkeleton";
import useCuisineList from "../../hooks/useCuisineList";
import useScrollButtons from "../../hooks/useScrollButtons";

const PersonalizedCuisineCarousel = ({ userName = "Guest" }) => {
	const { cuisineList, loading } = useCuisineList();
	const {
		scrollContainerRef,
		canScrollLeft,
		canScrollRight,
		scroll,
		checkScrollButtons,
	} = useScrollButtons([cuisineList]);

	return (
		<div className="relative py-8">
			{/* Header */}
			<div className="flex items-center justify-between px-4 pb-6">
				<h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
					{userName}, what's on your mind?
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

			{/* Scrollable Cuisine Grid */}
			<div
				ref={scrollContainerRef}
				onScroll={checkScrollButtons}
				className="flex overflow-x-auto scrollbar-hide gap-8 px-4 pb-4"
			>
				{loading
					? [...Array(7)].map((_, index) => (
							<div key={index} className="flex-shrink-0 w-32">
								<CuisineCardSkeleton />
							</div>
						))
					: cuisineList.map((cuisine) => (
							<div key={cuisine.id} className="flex-shrink-0 w-32">
								<CuisineCard cuisine={cuisine} />
							</div>
						))}
			</div>

			{/* Bottom Border */}
			<div className="mt-8 border-t border-slate-200 dark:border-slate-700" />
		</div>
	);
};

export default PersonalizedCuisineCarousel;
