import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

const RestaurantDetail = () => {
  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const [restaurant, setRestaurant] = useState(null)
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const LAT = "12.946220755410387"
  const LNG = "77.67176236957312"

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `/api/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}`
        )

        console.log("MENU STATUS:", response.status)
        console.log("MENU TYPE:", response.headers.get("content-type"))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Restaurant data:", data)

        // Extract restaurant info
        const restaurantInfo = data?.data?.cards?.find(
          (card) =>
            card?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )?.card?.card?.info

        if (!restaurantInfo) {
          throw new Error("Restaurant info not found in response")
        }

        // Extract menu categories
        const menuCards = data?.data?.cards?.find(
          (card) => card?.groupedCard?.cardGroupMap?.REGULAR
        )?.groupedCard?.cardGroupMap?.REGULAR?.cards

        const menuCategories =
          menuCards
            ?.filter((card) =>
              card?.card?.card?.["@type"]?.includes("ItemCategory")
            )
            .map((card) => ({
              title: card?.card?.card?.title,
              itemCount: card?.card?.card?.itemCards?.length || 0,
              items:
                card?.card?.card?.itemCards?.map((item) => ({
                  id: item?.card?.info?.id,
                  name: item?.card?.info?.name,
                  price:
                    (item?.card?.info?.price ||
                      item?.card?.info?.defaultPrice) / 100,
                  description: item?.card?.info?.description,
                  imageId: item?.card?.info?.imageId,
                  isVeg:
                    item?.card?.info?.itemAttribute?.vegClassifier === "VEG",
                  rating:
                    item?.card?.info?.ratings?.aggregatedRating?.rating,
                  ratingCount:
                    item?.card?.info?.ratings?.aggregatedRating
                      ?.ratingCountV2,
                })) || [],
            }))
            .filter((category) => category.items.length > 0) || []

        setRestaurant({
          id: restaurantInfo?.id,
          name: restaurantInfo?.name,
          cuisines: restaurantInfo?.cuisines?.join(", "),
          area: restaurantInfo?.areaName,
          city: restaurantInfo?.city,
          rating: restaurantInfo?.avgRating,
          ratingCount: restaurantInfo?.totalRatingsString,
          costForTwo: restaurantInfo?.costForTwoMessage,
          deliveryTime: restaurantInfo?.sla?.slaString,
          distance: restaurantInfo?.sla?.lastMileTravelString,
          imageId: restaurantInfo?.cloudinaryImageId,
        })

        setMenu(menuCategories)

        if (menuCategories.length > 0) {
          setActiveCategory(menuCategories[0].title)
        }

        setLoading(false)
      } catch (err) {
        console.error("ERROR:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchRestaurantDetails()
  }, [restaurantId])

  const scrollToCategory = (categoryTitle) => {
    setActiveCategory(categoryTitle)
    const element = document.getElementById(categoryTitle)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            Loading restaurant...
          </p>
        </div>
      </div>
    )
  }

  // ---------- Error ----------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md px-4">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">
            error
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Failed to load restaurant
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!restaurant) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Restaurant Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {restaurant.imageId && (
              <div
                className="w-full md:w-48 h-48 rounded-xl bg-cover bg-center border border-slate-200 dark:border-slate-700 flex-shrink-0"
                style={{
                  backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${restaurant.imageId}")`,
                }}
              />
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                {restaurant.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {restaurant.cuisines}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                {restaurant.rating && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400 text-lg">
                      star
                    </span>
                    <span className="font-bold text-green-800 dark:text-green-400">
                      {restaurant.rating}
                    </span>
                    {restaurant.ratingCount && (
                      <span className="text-xs text-green-700 dark:text-green-400">
                        ({restaurant.ratingCount})
                      </span>
                    )}
                  </div>
                )}

                {restaurant.deliveryTime && (
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    <span className="text-sm font-medium">
                      {restaurant.deliveryTime}
                    </span>
                  </div>
                )}

                {restaurant.costForTwo && (
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-lg">
                      currency_rupee
                    </span>
                    <span className="text-sm font-medium">
                      {restaurant.costForTwo}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">
                  location_on
                </span>
                <span className="text-sm">
                  {restaurant.area}, {restaurant.city}
                </span>
                {restaurant.distance && (
                  <span className="text-sm">• {restaurant.distance}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {menu.length > 0 ? (
          <div className="grid lg:grid-cols-[280px,1fr] gap-6">
            {/* Category Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    Menu
                  </h2>
                </div>
                <nav className="p-2">
                  {menu.map((category) => (
                    <button
                      key={category.title}
                      onClick={() => scrollToCategory(category.title)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === category.title
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      {category.title} ({category.itemCount})
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Menu Items */}
            <div className="space-y-8">
              {menu.map((category) => (
                <div key={category.title} id={category.title}>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {category.title} ({category.itemCount})
                  </h2>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
                      >
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="mb-2">
                              <div
                                className={`inline-flex items-center justify-center w-5 h-5 border-2 rounded ${
                                  item.isVeg
                                    ? "border-green-600"
                                    : "border-red-600"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    item.isVeg ? "bg-green-600" : "bg-red-600"
                                  }`}
                                />
                              </div>
                            </div>

                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                              {item.name}
                            </h3>

                            <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                              ₹{item.price}
                            </p>

                            {item.rating && (
                              <div className="flex items-center gap-1 mb-2">
                                <span className="material-symbols-outlined text-green-600 text-sm">
                                  star
                                </span>
                                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                                  {item.rating}
                                </span>
                                {item.ratingCount && (
                                  <span className="text-xs text-slate-500">
                                    ({item.ratingCount})
                                  </span>
                                )}
                              </div>
                            )}

                            {item.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-center gap-2">
                            {item.imageId && (
                              <div
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700"
                                style={{
                                  backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.imageId}")`,
                                }}
                              />
                            )}
                            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap">
                              ADD
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
              restaurant_menu
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              No menu available for this restaurant
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RestaurantDetail