function CuisineCard({ cuisine }) {
  const handleClick = () => {
    console.log('Filter by:', cuisine.name)
  }

  const {name, imageId, link} = cuisine

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col items-center justify-center gap-2 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Filter by ${cuisine}`}
    >
      {/* Cuisine Image */}
      <div 
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full shadow-sm group-hover:scale-105 transition-transform"
        style={{ backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${imageId}")` }}
        role="img"
        aria-label={cuisine.imageAlt}
      />

      {/* Cuisine Name */}
      <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal group-hover:text-primary dark:group-hover:text-primary transition-colors">
        {name}
      </p>
    </div>
  )
}

export default CuisineCard