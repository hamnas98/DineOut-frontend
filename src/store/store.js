import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY } from "../store/cartSlice";
import ordersReducer, { ORDERS_STORAGE_KEY } from "./ordersSlice";
import favouritesReducer, { FAVOURITES_STORAGE_KEY } from "./favouritesSlice";
import addressesReducer, { ADDRESSES_STORAGE_KEY } from "./addressesSlice";
import paymentsReducer, { PAYMENTS_STORAGE_KEY } from "./paymentsSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		orders: ordersReducer,
		favourites: favouritesReducer,
		addresses: addressesReducer,
		payments: paymentsReducer,
	},
});

const persistMap = [
	{ key: CART_STORAGE_KEY, select: (s) => s.cart.items },
	{ key: ORDERS_STORAGE_KEY, select: (s) => s.orders.list },
	{ key: FAVOURITES_STORAGE_KEY, select: (s) => s.favourites.list },
	{ key: ADDRESSES_STORAGE_KEY, select: (s) => s.addresses.list },
	{ key: PAYMENTS_STORAGE_KEY, select: (s) => s.payments.list },
];

let previousValues = persistMap.map((p) => p.select(store.getState()));

store.subscribe(() => {
	const state = store.getState();
	persistMap.forEach((p, i) => {
		const current = p.select(state);
		if (current !== previousValues[i]) {
			previousValues[i] = current;
			try {
				localStorage.setItem(p.key, JSON.stringify(current));
			} catch (err) {
				console.error(`Failed to save ${p.key}:`, err);
			}
		}
	});
});

export default store;
