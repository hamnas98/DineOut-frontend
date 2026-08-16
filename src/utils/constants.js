const cuisineImageUrl =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

const TopRestaurantImageUrl =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const LAT = "12.946220755410387";
const LNG = "77.67176236957312";

const MENU_API =
	`/api/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=`;

const INITIAL_RESTAURANT_API =
	`/api/swiggy/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

const MORE_RESTAURANT_API =
	"/api/swiggy/dapi/restaurants/list/update";

export {
	cuisineImageUrl,
	TopRestaurantImageUrl,
	MENU_API,
	INITIAL_RESTAURANT_API,
	MORE_RESTAURANT_API,
};