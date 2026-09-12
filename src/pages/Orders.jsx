import { Link } from "react-router-dom";
import useOrders from "../hooks/useOrders";

const Orders = () => {
  const { ordersList } = useOrders();

  if (ordersList.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
          receipt_long
        </span>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No orders yet
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Your placed orders will show up here.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        My Orders
      </h1>
      <div className="space-y-4">
        {ordersList.map((order) => (
          <div
            key={order.id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {order.restaurantName}
              </h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                {order.status}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {order.itemCount} items • ₹{order.total} • {order.paymentMethod}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {new Date(order.placedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;