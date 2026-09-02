import { useParams, useNavigate, Link } from "react-router-dom";
import useRestaurantDetail from "../hooks/useRestaurentDetail";
import MenuAccordion from "../components/restaurent details/MenuAccordion";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const { loading, menu, restaurant, usingMockData } =
    useRestaurantDetail(restaurantId);

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

      {/* Menu Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MenuAccordion menu={menu} />
      </div>
    </div>
  );
};

export default RestaurantDetail;