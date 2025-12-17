import RestaurantCard from './RestuarantCard'

const RestaurantCarousel = ({restaurants}) => {
  return (
    <div>
      {/* Section Header */}
      <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Top-rated restaurants near you
      </h2>
      {/* Scrollable Container */}
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex items-stretch p-4 gap-6">
          {restaurants.map(restaurant=><RestaurantCard key={restaurant.id} restaurant = {restaurant} />)}
        </div>
      </div>
    </div>
  )
}

export default RestaurantCarousel