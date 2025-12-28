import HeroSection from "../components/home/HeroSection";
import RestaurantCarousel from "../components/home/RestaurantCarousel";
import CuisineGrid from "../components/home/CusineGrid";
import { useState } from "react";

const Home = () => {
  const [seachQuery, setSearchQuery] = useState("");

  function onSearch(query) {
    setSearchQuery(query);
  }

  return (
    <>
      <HeroSection onSearch={onSearch} />
      <RestaurantCarousel seachQuery={seachQuery} />
      <CuisineGrid />
    </>
  );
};

export default Home;
