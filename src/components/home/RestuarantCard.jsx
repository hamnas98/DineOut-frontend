const RestaurantCard = ({restaurant}) => {
  const {name, imageId, cuisines, rating, costForTwo, deliveryTime, area} = restaurant;

  const handleOrderNow = () => {
    console.log('Order from:', name);
    // TODO: Navigate to restaurant detail page
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-64 transform hover:-translate-y-1">
      {/* Restaurant Image */}
      <div 
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
        style={{ backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imageId}")` }}
        role="img"
        aria-label={name}
      />
      
      {/* Restaurant Info */}
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          <p className="text-slate-900 dark:text-white text-base font-bold leading-normal">
            {name}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
            {cuisines}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-600 dark:text-slate-400 text-sm">
              ⭐ {rating}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm">
              {deliveryTime}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal mt-1">
            {costForTwo}
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">
            📍 {area}
          </p>
        </div>
        
        {/* Order Button */}
        <button 
          onClick={handleOrderNow}
          className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
          aria-label={`Order now from ${name}`}
        >
          <span className="truncate">Order Now</span>
        </button>
      </div>
    </div>
  )
}

export default RestaurantCard