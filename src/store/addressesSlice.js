import { createSlice } from "@reduxjs/toolkit";

const ADDRESSES_STORAGE_KEY = "dineout_addresses";

const load = () => {
	try {
		const stored = localStorage.getItem(ADDRESSES_STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const addressesSlice = createSlice({
	name: "addresses",
	initialState: { list: load() },
	reducers: {
		addAddress: (state, action) => {
			state.list.push({ id: `ADDR${Date.now()}`, ...action.payload });
		},
		updateAddress: (state, action) => {
			const { id, ...updates } = action.payload;
			const addr = state.list.find((a) => a.id === id);
			if (addr) Object.assign(addr, updates);
		},
		deleteAddress: (state, action) => {
			state.list = state.list.filter((a) => a.id !== action.payload);
		},
	},
});

export const { addAddress, updateAddress, deleteAddress } =
	addressesSlice.actions;
export default addressesSlice.reducer;
export { ADDRESSES_STORAGE_KEY };
