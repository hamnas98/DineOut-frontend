function RestaurantCardSkeleton() {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm min-w-64 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-video bg-slate-200 dark:bg-slate-700 rounded-t-xl" />

      {/* Content Skeleton */}
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          {/* Restaurant Name */}
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
          {/* Restaurant Details */}
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>
    </div>
  )
}

export default RestaurantCardSkeleton