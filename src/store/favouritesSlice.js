import { createSlice } from "@reduxjs/toolkit";

const FAVOURITES_STORAGE_KEY = "dineout_favourites";

const load = () => {
	try {
		const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const favouritesSlice = createSlice({
	name: "favourites",
	initialState: { list: load() },
	reducers: {
		toggleFavourite: (state, action) => {
			const restaurant = action.payload;
			const exists = state.list.find((r) => r.id === restaurant.id);
			if (exists) {
				state.list = state.list.filter((r) => r.id !== restaurant.id);
			} else {
				state.list.push(restaurant);
			}
		},
	},
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
export { FAVOURITES_STORAGE_KEY };
