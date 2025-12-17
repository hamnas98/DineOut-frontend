import CuisineCard from './CusineCard'


const CuisineGrid = ({cuisines}) => {
  return (
    <div>
      {/* Section Header */}
      <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        What's on your mind?
      </h2>
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {cuisines.map(cuisine=><CuisineCard key={cuisine.id} cuisine = {cuisine}></CuisineCard>)}
      </div>
    </div>
  )
}

export default CuisineGrid