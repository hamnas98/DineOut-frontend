import { createSlice } from "@reduxjs/toolkit";

const PAYMENTS_STORAGE_KEY = "dineout_payments";

const load = () => {
	try {
		const stored = localStorage.getItem(PAYMENTS_STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const paymentsSlice = createSlice({
	name: "payments",
	initialState: { list: load() },
	reducers: {
		addPaymentMethod: (state, action) => {
			state.list.push({ id: `PAY${Date.now()}`, ...action.payload });
		},
		deletePaymentMethod: (state, action) => {
			state.list = state.list.filter((p) => p.id !== action.payload);
		},
	},
});

export const { addPaymentMethod, deletePaymentMethod } = paymentsSlice.actions;
export default paymentsSlice.reducer;
export { PAYMENTS_STORAGE_KEY };
