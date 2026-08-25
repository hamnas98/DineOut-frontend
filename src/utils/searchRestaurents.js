function searchRestaurents(restaurantList, query) {
	if (!query.trim()) {
		return restaurantList;
	}

	const q = query.toLowerCase().trim();

	return restaurantList.filter((restaurant) => {
		const nameMatch = restaurant.name.toLowerCase().includes(q);
		const cuisineMatch = restaurant.cuisines?.toLowerCase().includes(q);
		const areaMatch = restaurant.area?.toLowerCase().includes(q);
		return nameMatch || cuisineMatch || areaMatch;
	});
}

export default searchRestaurents;
