import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRestaurantData } from "../utils/mockRestaurantData";
import { MENU_API } from "../utils/constants";
import useRestaurantDetail from "../hooks/useRestaurentDetail";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const { loading, menu, restaurant, usingMockData } =
    useRestaurantDetail(restaurantId);

  // ✅ Track which category titles are currently expanded
  const [openCategories, setOpenCategories] = useState([]);

  // ✅ Open the first category by default once menu data loads
  useEffect(() => {
    if (menu.length > 0) {
      setOpenCategories([menu[0].title]);
    }
  }, [menu]);

  const toggleCategory = (title) => {
    setOpenCategories((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

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
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
            restaurant_menu
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Restaurant not found
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">home</span>
            Go Home
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Menu Section — Accordion */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {menu.length > 0 ? (
          <div className="space-y-3">
            {menu.map((category) => {
              const isOpen = openCategories.includes(category.title);

              return (
                <div
                  key={category.title}
                  id={category.title}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${category.title}`}
                  >
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {category.title}{" "}
                      <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                        ({category.itemCount})
                      </span>
                    </span>
                    <span
                      className={`material-symbols-outlined text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Accordion Panel */}
                  <div
                    id={`panel-${category.title}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
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
                                        item.isVeg
                                          ? "bg-green-600"
                                          : "bg-red-600"
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
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-col items-center gap-2 justify-end">
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
                  </div>
                </div>
              );
            })}
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
  );
};

export default RestaurantDetail;