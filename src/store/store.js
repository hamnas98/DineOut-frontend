import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY } from "../store/cartSlice";
import ordersReducer, { ORDER_STORAGE_KEY } from "./orderSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		orders: ordersReducer,
	},
});

let previousCartItems = store.getState().cart.items;
let previousOrdersList = store.getState().orders.list;

store.subscribe(() => {
	const state = store.getState();

	if (state.cart.items !== previousCartItems) {
		previousCartItems = state.cart.items;
		try {
			localStorage.setItem(
				CART_STORAGE_KEY,
				JSON.stringify(state.cart.items),
			);
		} catch (error) {
			console.error("Failed to save cart to loacal storage", error);
		}
	}

	if (state.orders.list !== previousOrdersList) {
		previousOrdersList = state.orders.list;
		try {
			localStorage.setItem(
				ORDER_STORAGE_KEY,
				JSON.stringify(state.orders.list),
			);
		} catch (error) {
			console.error("Failed to save oreders to locatl storage", error);
		}
	}
});

export default store;
