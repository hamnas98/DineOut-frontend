const ReplaceCartModal = ({ isOpen, onConfirm, onCancel, currentRestaurantName }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-5xl text-orange-500 mb-3">
            warning
          </span>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Items already in cart
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Your cart contains items from{" "}
            {currentRestaurantName ? (
              <span className="font-semibold">{currentRestaurantName}</span>
            ) : (
              "another restaurant"
            )}
            . Would you like to reset your cart for adding items from this
            restaurant?
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Yes, start afresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplaceCartModal;