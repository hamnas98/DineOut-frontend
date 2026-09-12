import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import useOrders from "../hooks/useOrders";

const OrderConfirmation = () => {
	const { orderId } = useParams();
	const { getOrderById } = useOrders();
	const order = getOrderById(orderId);

	if (!order) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
			<span className="material-symbols-outlined text-7xl text-green-600 mb-4">
				check_circle
			</span>
			<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
				Order Placed!
			</h1>
			<p className="text-slate-600 dark:text-slate-400 mb-6">
				Your order from{" "}
				<span className="font-semibold">{order.restaurantName}</span> has
				been confirmed.
			</p>

			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 text-left mb-6">
				<div className="flex justify-between text-sm mb-2">
					<span className="text-slate-600 dark:text-slate-400">
						Order ID
					</span>
					<span className="font-mono text-slate-900 dark:text-white">
						{order.id}
					</span>
				</div>
				<div className="flex justify-between text-sm mb-2">
					<span className="text-slate-600 dark:text-slate-400">Items</span>
					<span className="text-slate-900 dark:text-white">
						{order.itemCount}
					</span>
				</div>
				<div className="flex justify-between text-sm mb-2">
					<span className="text-slate-600 dark:text-slate-400">
						Payment
					</span>
					<span className="text-slate-900 dark:text-white">
						{order.paymentMethod}
					</span>
				</div>
				<div className="flex justify-between font-bold border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
					<span className="text-slate-900 dark:text-white">
						Total Paid
					</span>
					<span className="text-slate-900 dark:text-white">
						₹{order.total}
					</span>
				</div>
			</div>

			<div className="flex gap-3 justify-center">
				<Link
					to="/my-account/orders"
					className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
				>
					View Orders
				</Link>
				<Link
					to="/"
					className="px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
				>
					Back Home
				</Link>
			</div>
		</div>
	);
};

export default OrderConfirmation;
