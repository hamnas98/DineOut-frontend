import HeroSection from "../components/home/HeroSection";
import RestaurantCarousel from "../components/home/RestaurantCarousel";
import CuisineGrid from "../components/home/CusineGrid";

import { useState } from "react";
import PersonalizedCuisineCarousel from "../components/home/PersonalizedCuisineCarousel";
import TopRestaurantCarousel from "../components/home/TopRestuarantCarousel";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Callback to get restaurants from RestaurantCarousel
  const handleRestaurantsLoaded = (restaurantList) => {
    setRestaurants(restaurantList);
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} restaurants={restaurants} />
      <PersonalizedCuisineCarousel />
      <TopRestaurantCarousel />
      <RestaurantCarousel
        searchQuery={searchQuery}
        onRestaurantsLoaded={handleRestaurantsLoaded}
      />
      <CuisineGrid />
    </>
  );
};

export default Home;
