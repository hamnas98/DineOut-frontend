import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useOrders from "../hooks/useOrders";
import useAuth from "../hooks/useAuth";
import useAddresses from "../hooks/useAddresses";
import usePayments from "../hooks/usePayments";
import AddressForm from "../components/forms/AddressForm";
import PaymentForm from "../components/forms/PaymentForm";

const DELIVERY_FEE = 40;

const PAYMENT_ICONS = {
	card: "credit_card",
	upi: "qr_code_2",
};

const Checkout = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { addresses, addAddress } = useAddresses();
	const { paymentMethods, addPaymentMethod } = usePayments();
	const { items, totalItems, totalPrice, cartRestaurantName, clearCart } =
		useCart();
	const { placeOrder } = useOrders();

	const [showAddressForm, setShowAddressForm] = useState(false);
	const [showPaymentForm, setShowPaymentForm] = useState(false);

	const [selectedAddressId, setSelectedAddressId] = useState(
		addresses[0]?.id || null,
	);
	const [selectedPaymentId, setSelectedPaymentId] = useState(
		paymentMethods[0]?.id || null,
	);
	const [placing, setPlacing] = useState(false);

	if (items.length === 0) {
		return <Navigate to="/cart" replace />;
	}

	const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
	const selectedPayment = paymentMethods.find(
		(p) => p.id === selectedPaymentId,
	);
	const grandTotal = totalPrice + DELIVERY_FEE;
	const canPlaceOrder = Boolean(selectedAddress && selectedPayment);

	const handleAddAddress = (formData) => {
		addAddress(formData);
		setShowAddressForm(false);
	};

	const handleAddPayment = (formData) => {
		addPaymentMethod(formData);
		setShowPaymentForm(false);
	};

	const handlePlaceOrder = () => {
		if (!canPlaceOrder) return;

		setPlacing(true);
		setTimeout(() => {
			const order = placeOrder({
				restaurantName: cartRestaurantName,
				items,
				itemCount: totalItems,
				subtotal: totalPrice,
				deliveryFee: DELIVERY_FEE,
				total: grandTotal,
				address: selectedAddress,
				paymentMethod: selectedPayment.label,
				customerName: user?.name,
			});

			clearCart();
			navigate(`/order-confirmation/${order.id}`, { replace: true });
		}, 800);
	};

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

				{addresses.length === 0 ? (
					<div className="flex flex-col items-center text-center py-6 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 mb-3">
						<span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 mb-2">
							location_off
						</span>
						<p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							No delivery address saved
						</p>
						<p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
							Add an address so we know where to deliver your order
						</p>
						<button
							type="button"
							onClick={() => setShowAddressForm(true)}
							className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
						>
							+ Add Delivery Address
						</button>
					</div>
				) : (
					<>
						<div className="space-y-3 mb-3">
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
						<button
							type="button"
							onClick={() => setShowAddressForm(true)}
							className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
						>
							+ Add another address
						</button>
					</>
				)}
			</section>

			{/* Payment Method */}
			<section className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 mb-4">
				<h2 className="font-bold text-slate-900 dark:text-white mb-3">
					Payment Method
				</h2>

				{paymentMethods.length === 0 ? (
					<div className="flex flex-col items-center text-center py-6 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 mb-3">
						<span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 mb-2">
							credit_card_off
						</span>
						<p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							No payment method saved
						</p>
						<p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
							Add a card or UPI ID to complete your order
						</p>
						<button
							type="button"
							onClick={() => setShowPaymentForm(true)}
							className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
						>
							+ Add Payment Method
						</button>
					</div>
				) : (
					<>
						<div className="space-y-3 mb-3">
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
										{PAYMENT_ICONS[method.type] || "payments"}
									</span>
									<span className="font-medium text-slate-900 dark:text-white">
										{method.label}
									</span>
								</label>
							))}
						</div>
						<button
							type="button"
							onClick={() => setShowPaymentForm(true)}
							className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
						>
							+ Add another method
						</button>
					</>
				)}
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

			{!canPlaceOrder && (
				<div className="flex items-center gap-2 justify-center text-sm text-orange-600 dark:text-orange-400 mb-3 bg-orange-50 dark:bg-orange-900/20 py-2.5 px-4 rounded-lg">
					<span className="material-symbols-outlined text-lg">info</span>
					<span>
						{!selectedAddress && !selectedPayment
							? "Please add a delivery address and payment method to continue"
							: !selectedAddress
								? "Please add a delivery address to continue"
								: "Please add a payment method to continue"}
					</span>
				</div>
			)}

			<button
				onClick={handlePlaceOrder}
				disabled={placing || !canPlaceOrder}
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

			{showAddressForm && (
				<AddressForm
					onSubmit={handleAddAddress}
					onCancel={() => setShowAddressForm(false)}
				/>
			)}

			{showPaymentForm && (
				<PaymentForm
					onSubmit={handleAddPayment}
					onCancel={() => setShowPaymentForm(false)}
				/>
			)}
		</div>
	);
};

export default Checkout;
