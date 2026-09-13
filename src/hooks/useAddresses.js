import { useSelector, useDispatch } from "react-redux";
import {
	addAddress,
	updateAddress,
	deleteAddress,
} from "../store/addressesSlice";

function useAddresses() {
	const dispatch = useDispatch();
	const addresses = useSelector((state) => state.addresses.list);

	return {
		addresses,
		addAddress: (data) => dispatch(addAddress(data)),
		updateAddress: (data) => dispatch(updateAddress(data)),
		deleteAddress: (id) => dispatch(deleteAddress(id)),
	};
}

export default useAddresses;
