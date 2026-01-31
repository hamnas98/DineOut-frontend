import { useEffect, useState, useRef } from "react";
import TopRestuarantCard from "./TopRestuarantCard";
import RestaurantCardSkeleton from "../common/RestaurantCardSkeleton";

const TopRestuarantCarousel = () => {
  const [topRestaurantList, setTopRestaurantList] = useState([]);
  const [isLoadingRestaurants, setLoadingRestaurants] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.946220755410387&lng=77.67176236957312&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        const cards = jsonResponse?.data?.cards || [];
        const toprestaurantsCard = cards.find(
          (c) => c?.card?.card?.id === "top_brands_for_you"
        );
        const restaurants =
          toprestaurantsCard?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];
        
        const topRestaurantCardtList = restaurants.map((r) => {
          // Extract loyalty/discount info
          const loyaltyDiscoverPresentationInfo = r.info.loyaltyDiscoverPresentationInfo;
          
          // Build offer string
          let offerText = null;
          if (r.info.aggregatedDiscountInfoV3) {
            const discountInfo = r.info.aggregatedDiscountInfoV3;
            offerText = [discountInfo.header, discountInfo.subHeader]
              .filter(Boolean)
              .join(" ");
          }

          return {
            id: r.info.id,
            name: r.info.name,
            imageId: r.info.cloudinaryImageId,
            cuisines: r.info.cuisines.join(", "),
            rating: r.info.avgRating,
            costForTwo: r.info.costForTwo,
            deliveryTime: r.info.sla?.slaString,
            distance: r.info.sla?.lastMileTravelString,
            area: r.info.areaName,
            isOpen: r.info.isOpen,
            discount: loyaltyDiscoverPresentationInfo?.freedelMessage || "Free Delivery",
            offer: offerText,
            link: r.cta?.link,
          };
        });
        
        return topRestaurantCardtList;
      })
      .then((topRestaurantCardtList) => {
        setTopRestaurantList(topRestaurantCardtList);
        setLoadingRestaurants(false);
      })
      .catch((error) => {
        console.error("Error fetching topBrandrestaurants:", error);
        setLoadingRestaurants(false);
      });
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [topRestaurantList]);

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
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Scrollable Chains */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex overflow-x-auto scrollbar-hide gap-6 px-4 pb-4"
      >
        {isLoadingRestaurants
          ? [...Array(4)].map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          : topRestaurantList.map((restaurant) => (
              <TopRestuarantCard key={restaurant.id} restaurant={restaurant} />
            ))}
      </div>

      {/* Bottom Border */}
      <div className="mt-8 border-t border-slate-200 dark:border-slate-700" />
    </div>
  );
};

export default TopRestuarantCarousel;