const RestaurantCard = ({restaurant}) => {

  const {name, cuisine, rating, deliveryTime, image, imageAlt} = restaurant;

  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-64 transform hover:-translate-y-1">
      {/* Restaurant Image */}
      <div 
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
        style={{ backgroundImage: `url("${image}")` }}
        role="img"
        aria-label={imageAlt}
      />
      {/* Restaurant Info */}
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          <p className="text-slate-900 dark:text-white text-base font-bold leading-normal">
            {name}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
            {cuisine} · {rating} · {deliveryTime}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
            ${200} for two
          </p>
        </div>
        {/* Order Button */}
        <button 
          className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
        >
          <span className="truncate">Order Now</span>
        </button>
      </div>
    </div>
  )
}

export default RestaurantCard