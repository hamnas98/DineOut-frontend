import { useEffect, useState } from "react";
import CuisineCard from "./CusineCard";
import CuisineCardSkeleton from "../common/CuisineCardSkeleton";

const CuisineGrid = () => {
  const [cuisineList, setCuisineList] = useState([]);
  const [loadingCuisines, setLoadingCuisines] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=12.9121181&lng=77.6445548"
    )
      .then((response) => response.json())
      .then((json) => {
        const cards = json?.data?.cards || [];
        const cuisineCard = cards.find(
          (c) => c?.card?.card?.id === "PopularCuisinessearchpage"
        );
        const cuisines =
          cuisineCard?.card?.card?.gridElements?.infoWithStyle?.info || [];
        
        function getCuisineName(link) {
          const match = link.match(/query=([^&]+)/);
          return match ? decodeURIComponent(match[1]) : "";
        }
        
        const cuisineCardList = cuisines.map((c) => ({
          id: c.id,
          name: getCuisineName(c.action?.link),
          imageId: c.imageId,
          link: c.action?.link,
        }));
        
        return cuisineCardList;
      })
      .then((cuisineCardList) => {
        setCuisineList(cuisineCardList);
        setLoadingCuisines(false);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
        setLoadingCuisines(false);
      });
  }, []);

  return (
    <div>
      {/* Section Header */}
      <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        What's on your mind?
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {loadingCuisines 
          ? [...Array(6)].map((_, index) => <CuisineCardSkeleton key={index} />)
          : cuisineList.map((cuisine) => (
              <CuisineCard key={cuisine.id} cuisine={cuisine} />
            ))}
      </div>
    </div>
  );
};

export default CuisineGrid;