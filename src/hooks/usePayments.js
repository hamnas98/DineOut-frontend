import { useSelector, useDispatch } from "react-redux";
import { addPaymentMethod, deletePaymentMethod } from "../store/paymentsSlice";

function usePayments() {
	const dispatch = useDispatch();
	const paymentMethods = useSelector((state) => state.payments.list);

	return {
		paymentMethods,
		addPaymentMethod: (data) => dispatch(addPaymentMethod(data)),
		deletePaymentMethod: (id) => dispatch(deletePaymentMethod(id)),
	};
}

export default usePayments;
