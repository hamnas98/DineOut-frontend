import { createSlice } from "@reduxjs/toolkit";

const ORDERS_STORAGE_KEY = "dineout_orders";

const laodOrdersFromStorage = () => {
	try {
		const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error("Failed to load orders from local storage", error);
		return [];
	}
};

const initialState = {
	list: laodOrdersFromStorage(),
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		addOrder: (state, action) => {
			state.list.unshift(action.payload);
		},
	},
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;

export { ORDERS_STORAGE_KEY };
