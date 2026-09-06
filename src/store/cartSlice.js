import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => {
				item.id === newItem.id;
			});

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.item.push({ ...newItem, quantity: 1 });
			}
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			const existingItem = state.items.find((item) => item.id === itemId);

			if (!existingItem) {
				return;
			}
			if (existingItem.quantity > 1) {
				existingItem.quantity -= 1;
			} else {
				state.items = state.items.filter((item) => item.id !== itemId);
			}
		},
		deleteItem: (state, action) => {
			const itemId = action.payload;
			state.items = state.items.filter((item) => item.id !== itemId);
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
