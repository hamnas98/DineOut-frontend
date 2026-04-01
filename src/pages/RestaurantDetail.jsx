const RestaurantDetail = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Restaurant Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Restaurant Image */}
            <div
              className="w-full md:w-48 h-48 rounded-xl bg-cover bg-center border border-slate-200 dark:border-slate-700 flex-shrink-0"
              style={{
                backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/RX_THUMBNAIL/IMAGES/VENDOR/2024/11/7/a648a88f-4247-46cd-84a4-c13fb6ff2e7f_18976.JPG")`,
              }}
            />

            {/* Restaurant Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                Nandhana Palace
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Biryani, Andhra, South Indian, North Indian
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-green-700 dark:text-green-400 text-lg">
                    star
                  </span>
                  <span className="font-bold text-green-800 dark:text-green-400">
                    4.3
                  </span>
                  <span className="text-xs text-green-700 dark:text-green-400">
                    (38K+ ratings)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span className="text-sm font-medium">30-35 mins</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-lg">currency_rupee</span>
                  <span className="text-sm font-medium">₹500 for two</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <span className="text-sm">
                  Marathahalli, Bangalore
                </span>
                <span className="text-sm">• 4.2 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* Category Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-bold text-slate-900 dark:text-white">Menu</h2>
              </div>
              <nav className="p-2">
                <button className="w-full text-left px-4 py-2 rounded-lg text-sm bg-primary/10 text-primary font-medium transition-colors">
                  Recommended (12)
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Biryani (8)
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Starters (15)
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Main Course (20)
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Desserts (6)
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Beverages (10)
                </button>
              </nav>
            </div>
          </aside>

          {/* Menu Items */}
          <div className="space-y-8">
            {/* Category: Recommended */}
            <div id="Recommended">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Recommended (12)
              </h2>

              <div className="space-y-4">
                {/* Menu Item 1 - Veg */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex gap-4">
                    {/* Item Info */}
                    <div className="flex-1">
                      {/* Veg Indicator */}
                      <div className="mb-2">
                        <div className="inline-flex items-center justify-center w-5 h-5 border-2 border-green-600 rounded">
                          <div className="w-2 h-2 rounded-full bg-green-600" />
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        Paneer Butter Masala
                      </h3>

                      <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        ₹280
                      </p>

                      <div className="flex items-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-green-600 text-sm">
                          star
                        </span>
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          4.5
                        </span>
                        <span className="text-xs text-slate-500">
                          (234)
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        Rich and creamy paneer cooked in a tomato-based gravy with butter and aromatic spices
                      </p>
                    </div>

                    {/* Item Image & Add Button */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700"
                        style={{
                          backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/e0839ff574213e6f35b3899ebf1fc597")`,
                        }}
                      />
                      <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menu Item 2 - Non-Veg */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex gap-4">
                    {/* Item Info */}
                    <div className="flex-1">
                      {/* Non-Veg Indicator */}
                      <div className="mb-2">
                        <div className="inline-flex items-center justify-center w-5 h-5 border-2 border-red-600 rounded">
                          <div className="w-2 h-2 rounded-full bg-red-600" />
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        Chicken Biryani
                      </h3>

                      <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        ₹350
                      </p>

                      <div className="flex items-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-green-600 text-sm">
                          star
                        </span>
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          4.6
                        </span>
                        <span className="text-xs text-slate-500">
                          (1.2K)
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        Aromatic basmati rice layered with succulent chicken pieces, cooked with traditional Hyderabadi spices
                      </p>
                    </div>

                    {/* Item Image & Add Button */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700"
                        style={{
                          backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/vkhcohhmqfczycw9vip1")`,
                        }}
                      />
                      <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menu Item 3 - No Image */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex gap-4">
                    {/* Item Info */}
                    <div className="flex-1">
                      {/* Veg Indicator */}
                      <div className="mb-2">
                        <div className="inline-flex items-center justify-center w-5 h-5 border-2 border-green-600 rounded">
                          <div className="w-2 h-2 rounded-full bg-green-600" />
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        Dal Tadka
                      </h3>

                      <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        ₹180
                      </p>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        Yellow lentils tempered with ghee, cumin, garlic and aromatic spices
                      </p>
                    </div>

                    {/* Add Button Only */}
                    <div className="flex flex-col items-center gap-2">
                      <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category: Biryani */}
            <div id="Biryani">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Biryani (8)
              </h2>

              <div className="space-y-4">
                {/* Menu Item */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="mb-2">
                        <div className="inline-flex items-center justify-center w-5 h-5 border-2 border-red-600 rounded">
                          <div className="w-2 h-2 rounded-full bg-red-600" />
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        Mutton Biryani
                      </h3>

                      <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        ₹450
                      </p>

                      <div className="flex items-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-green-600 text-sm">
                          star
                        </span>
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          4.7
                        </span>
                        <span className="text-xs text-slate-500">
                          (890)
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        Tender mutton pieces marinated and slow-cooked with fragrant basmati rice and traditional spices
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700"
                        style={{
                          backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/biryani")`,
                        }}
                      />
                      <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;