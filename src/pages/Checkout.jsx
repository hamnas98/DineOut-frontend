import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import useAuth from "../hooks/useAuth";
import useAddresses from "../hooks/useAddresses";
import usePayments from "../hooks/usePayments";

const DELIVERY_FEE = 40;

const Checkout = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { addresses } = useAddresses();
	const { paymentMethods } = usePayments();

	const { items, totalItems, totalPrice, cartRestaurantName, clearCart } =
		useCart();
	const { placeOrder } = useOrders();

	const [selectedAddressId, setSelectedAddressId] = useState(
		addresses[0]?.id || null,
	);
	const [selectedPaymentId, setSelectedPaymentId] = useState(
		paymentMethods[0]?.id || null,
	);
	const [placing, setPlacing] = useState(false);

	const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
	const selectedPayment = paymentMethods.find(
		(p) => p.id === selectedPaymentId,
	);
	const grandTotal = totalPrice + DELIVERY_FEE;

	function handlePlaceOrder() {
		if(!selectedAddress || !selectedPayment ) {
			return alert("please add ")
		}
		setPlacing(true);
		setTimeout(() => {
			const order = placeOrder({
				restaurentNmae: cartRestaurantName,
				itemCount: totalItems,
				subtoatl: totalPrice,
				deliveryFee: DELIVERY_FEE,
				total: grandTotal,
				address: selectedAddress,
				paymentMethod: selectedPayment.label,
				customerName: user?.name,
			});

			clearCart();
			navigate(`/order-confirmation/${order.id}`, { replace: true });
		}, 800);
	}

	if (items.lenght === 0) {
		return <Navigate to="/cart" replace />;
	}

	return (
		<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
				Checkout
			</h1>
			{/* Delivery Address */}
			<section className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 mb-4">
				<h2 className="font-bold text-slate-900 dark:text-white mb-3">
					Delivery Address
				</h2>
				<div className="space-y-3">
					{addresses.length === 0 && (
						<p className="text-sm text-red-600 dark:text-red-400 mb-4">
							You need to add an address before placing an order.{" "}
							<Link to="/my-account/addresses" className="underline">
								Add one
							</Link>
						</p>
					)}
					{addresses.map((address) => (
						<label
							key={address.id}
							className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
								selectedAddressId === address.id
									? "border-primary bg-primary/5"
									: "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
							}`}
						>
							<input
								type="radio"
								name="address"
								value={address.id}
								checked={selectedAddressId === address.id}
								onChange={() => setSelectedAddressId(address.id)}
								className="mt-1 accent-primary"
							/>
							<div>
								<p className="font-semibold text-slate-900 dark:text-white">
									{address.label}
								</p>
								<p className="text-sm text-slate-600 dark:text-slate-400">
									{address.details}
								</p>
							</div>
						</label>
					))}
				</div>
			</section>
			{/* Payment Method */}
			<section className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 mb-4">
				<h2 className="font-bold text-slate-900 dark:text-white mb-3">
					Payment Method
				</h2>
				<div className="space-y-3">
					{paymentMethods.length === 0 && (
						<p className="text-sm text-red-600 dark:text-red-400 mb-4">
							You need to add an payment before placing an order.{" "}
							<Link to="/my-account/payments" className="underline">
								Add one
							</Link>
						</p>
					)}
					{paymentMethods.map((method) => (
						<label
							key={method.id}
							className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
								selectedPaymentId === method.id
									? "border-primary bg-primary/5"
									: "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
							}`}
						>
							<input
								type="radio"
								name="payment"
								value={method.id}
								checked={selectedPaymentId === method.id}
								onChange={() => setSelectedPaymentId(method.id)}
								className="accent-primary"
							/>
							<span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
								{method.icon}
							</span>
							<span className="font-medium text-slate-900 dark:text-white">
								{method.label}
							</span>
						</label>
					))}
				</div>
			</section>
			{/* Order Summary */}
			<section className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 mb-6">
				<h2 className="font-bold text-slate-900 dark:text-white mb-3">
					Order Summary
				</h2>
				{cartRestaurantName && (
					<p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
						From{" "}
						<span className="font-semibold">{cartRestaurantName}</span>
					</p>
				)}
				<div className="space-y-1 text-sm">
					<div className="flex justify-between text-slate-600 dark:text-slate-400">
						<span>Item Total ({totalItems} items)</span>
						<span>₹{totalPrice}</span>
					</div>
					<div className="flex justify-between text-slate-600 dark:text-slate-400">
						<span>Delivery Fee</span>
						<span>₹{DELIVERY_FEE}</span>
					</div>
					<div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2 flex justify-between font-bold text-slate-900 dark:text-white">
						<span>To Pay</span>
						<span>₹{grandTotal}</span>
					</div>
				</div>
			</section>
			<button
				onClick={handlePlaceOrder}
				disabled={placing}
				className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
			>
				{placing ? (
					<>
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
						Placing Order...
					</>
				) : (
					`Place Order • ₹${grandTotal}`
				)}
			</button>
		</div>
	);
};

export default Checkout;
