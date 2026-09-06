import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem, clearCart } from "../store/cartSlice";

function useCart() {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const getItemQuantity = (itemId) => {
		const item = items.find((i) => i.id === itemId);
		return item ? item.quantity : 0;
	};

	return {
		items,
		totalItems,
		totalPrice,
		getItemQuantity,
		addItem: (item) => dispatch(addItem(item)),
		removeItem: (itemId) => dispatch(removeItem(itemId)),
		deleteItem: (itemId) => dispatch(deleteItem(itemId)),
		clearCart: () => dispatch(clearCart()),
	};
}

export default useCart;
