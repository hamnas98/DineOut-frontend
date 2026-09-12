import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY } from "../store/cartSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
	},
});

let previousCartItems = store.getState().cart.items;

store.subscribe(() => {
	const currentItems = store.getState().cart.items;

	if (currentItems !== previousCartItems) {
		previousCartItems = currentItems;
		try {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentItems));
		} catch (error) {
			console.error("Failed to save cart to loacal storage", error);
		}
	}
});

export default store;
