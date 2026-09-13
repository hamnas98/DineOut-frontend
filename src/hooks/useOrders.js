import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../store/ordersSlice";

function useOrders() {
	const dispatch = useDispatch();
	const ordersList = useSelector((state) => state.orders.list);

	const placeOrder = (orderDetails) => {
		const order = {
			id: `ORD ${Date.now()}`,
			placedAt: new Date().toISOString(),
			status: "Confirmed",
			...orderDetails,
		};
		dispatch(addOrder(order));
		return order;
	};

	const getOrderById = (orderId) =>
		ordersList.find((order) => orderId === order.id);

	return { ordersList, placeOrder, getOrderById };
}

export default useOrders;
