const TopRestuarantCard = ({ restaurant }) => {
  const {
    name,
    imageId,
    cuisines,
    rating,
    costForTwo,
    deliveryTime,
    area,
    offer,
    discount
  } = restaurant;

  const handleClick = () => {
    console.log('Selected restaurant:', name);
    // TODO: Navigate to restaurant page
  };

  return (
    <div 
      onClick={handleClick}
      className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-64 transform hover:-translate-y-1"
    >
      {/* Chain Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] ">
        {/* Image */}
        <div
          className="w-full h-44 bg-cover bg-center relative"
          style={{
            backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imageId}")`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Offer Badge - Shows discount text */}
          {discount && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  local_offer
                </span>
                {discount}
              </span>
            </div>
          )}

          {/* Discount/Offer Info at bottom */}
          {offer && (
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-xl font-bold drop-shadow-lg">
                {offer}
              </p>
            </div>
          )}
        </div>

        {/* Chain Info */}
        <div className="bg-white dark:bg-slate-800 p-4">
          {/* Name */}
          <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight mb-2 truncate">
            {name}
          </h3>

          {/* Rating and Time */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-green-600 text-sm">
                star
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                {rating}
              </span>
            </div>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm">
              {deliveryTime}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm truncate mb-1">
            {costForTwo}
          </p>
          {/* Cuisines */}
          <p className="text-slate-500 dark:text-slate-400 text-sm truncate mb-1">
            {cuisines}
          </p>

          {/* Location */}
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            {area}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopRestuarantCard;