import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, deleteItem, clearCart } from "../store/cartSlice";

function useCart() {
	const dispatch = useDispatch();
	const cartItems = useSelector(() => state.cart.items);
}
