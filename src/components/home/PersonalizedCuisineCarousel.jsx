import { useEffect, useState, useRef } from "react";
import CuisineCard from "./CusineCard";
import CuisineCardSkeleton from "../common/CuisineCardSkeleton";

const PersonalizedCuisineCarousel = ({ userName = "Guest" }) => {
  const [cuisineList, setCuisineList] = useState([]);
  const [loadingCuisines, setLoadingCuisines] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.920624&lng=77.650769&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((res) => res.json())
      .then((json) => {
        const cards = json?.data?.cards || [];
        const cuisineCard = cards.find(
          (c) => c?.card?.card?.id === "whats_on_your_mind"
        );
        const cuisines =
          cuisineCard?.card?.card?.gridElements?.infoWithStyle?.info || [];
        
        const cuisineCardList = cuisines.map((cuisine) => {
          // Extract cuisine name from link
          function getCuisineName(link) {
            const match = link?.match(/query=([^&]+)/);
            return match ? decodeURIComponent(match[1]) : "";
          }

          return {
            id: cuisine.id,
            name: getCuisineName(cuisine.action?.link),
            imageId: cuisine.imageId,
            link: cuisine.action?.link,
          };
        });
        
        return cuisineCardList;
      })
      .then((cuisineCardList) => {
        setCuisineList(cuisineCardList);
        setLoadingCuisines(false);
      })
      .catch((error) => {
        console.error("Error fetching personalized cuisine:", error);
        setLoadingCuisines(false);
      });
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [cuisineList]);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

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
            onClick={() => scroll('left')}
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
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition-all ${
              canScrollRight
                ? "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Scrollable Cuisine Grid */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex overflow-x-auto scrollbar-hide gap-8 px-4 pb-4"
      >
        {loadingCuisines
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