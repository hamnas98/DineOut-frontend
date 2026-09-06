
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Cart = () => {
	const {
		items,
		totalItems,
		totalPrice,
		addItem,
		removeItem,
		deleteItem,
		clearCart,
	} = useCart();

	if (items.length === 0) {
		return (
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
				<span className="material-symbols-outlined text-8xl text-slate-300 dark:text-slate-600 mb-4">
					shopping_cart
				</span>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
					Your cart is empty
				</h1>
				<p className="text-slate-600 dark:text-slate-400 mb-6">
					Add some delicious items to get started
				</p>
				<Link
					to="/"
					className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
				>
					<span className="material-symbols-outlined">restaurant</span>
					Browse Restaurants
				</Link>
			</div>
		);
	}

	// Group items by restaurant (a cart could theoretically span multiple
	// restaurants in this simple model — real apps usually restrict to one)
	const restaurantName = items[0]?.restaurantName;

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
					Your Cart
				</h1>
				<button
					onClick={clearCart}
					className="text-sm text-red-600 dark:text-red-400 hover:underline"
				>
					Clear cart
				</button>
			</div>

			{restaurantName && (
				<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
					Ordering from{" "}
					<span className="font-semibold">{restaurantName}</span>
				</p>
			)}

			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
				{items.map((item) => (
					<div key={item.id} className="flex items-center gap-4 p-4">
						{item.imageId && (
							<div
								className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
								style={{
									backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/${item.imageId}")`,
								}}
							/>
						)}

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<div
									className={`inline-flex items-center justify-center w-4 h-4 border-2 rounded flex-shrink-0 ${
										item.isVeg ? "border-green-600" : "border-red-600"
									}`}
								>
									<div
										className={`w-1.5 h-1.5 rounded-full ${
											item.isVeg ? "bg-green-600" : "bg-red-600"
										}`}
									/>
								</div>
								<h3 className="font-semibold text-slate-900 dark:text-white truncate">
									{item.name}
								</h3>
							</div>
							<p className="text-sm text-slate-600 dark:text-slate-400">
								₹{item.price} × {item.quantity} = ₹
								{item.price * item.quantity}
							</p>
						</div>

						<div className="flex items-center gap-3 bg-primary text-white rounded-lg px-2 py-1.5 flex-shrink-0">
							<button
								onClick={() => removeItem(item.id)}
								className="text-lg font-bold w-5 h-5 flex items-center justify-center"
								aria-label="Decrease quantity"
							>
								−
							</button>
							<span className="text-sm font-bold min-w-[16px] text-center">
								{item.quantity}
							</span>
							<button
								onClick={() => addItem(item)}
								className="text-lg font-bold w-5 h-5 flex items-center justify-center"
								aria-label="Increase quantity"
							>
								+
							</button>
						</div>

						<button
							onClick={() => deleteItem(item.id)}
							className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
							aria-label={`Remove ${item.name}`}
						>
							<span className="material-symbols-outlined">delete</span>
						</button>
					</div>
				))}
			</div>

			{/* Bill Summary */}
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 mt-4 space-y-2">
				<div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
					<span>Item Total ({totalItems} items)</span>
					<span>₹{totalPrice}</span>
				</div>
				<div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
					<span>Delivery Fee</span>
					<span>₹40</span>
				</div>
				<div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-slate-900 dark:text-white">
					<span>To Pay</span>
					<span>₹{totalPrice + 40}</span>
				</div>
			</div>

			<button className="w-full mt-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors">
				Proceed to Checkout
			</button>
		</div>
	);
};

export default Cart;
