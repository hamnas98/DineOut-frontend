const cuisineImageUrl = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"

const TopRestuarantImageUrl = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"
  export { cuisineImageUrl,TopRestuarantImageUrl };



  // i think in swiggy it sending a get request on the api (https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.946220755410387&lng=77.67176236957312&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING) and then a  post request like this Request URL when scrolling https://www.swiggy.com/dapi/restaurants/list/update Request Method POST Status Code 200 and getting a next set of restuarent for scrolling