function CuisineCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 animate-pulse">
      {/* Circular Image Skeleton */}
      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 rounded-full" />
      
      {/* Text Skeleton */}
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
    </div>
  )
}

export default CuisineCardSkeleton