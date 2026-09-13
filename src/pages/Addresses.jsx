import { useState } from "react";
import useAddresses from "../hooks/useAddresses";
import AddressForm from "../components/forms/AddressForm";

const Addresses = () => {
	const { addresses, addAddress, updateAddress, deleteAddress } =
		useAddresses();
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);

	const openAddForm = () => {
		setEditingId(null);
		setShowForm(true);
	};

	const openEditForm = (address) => {
		setEditingId(address.id);
		setShowForm(true);
	};

	const handleSubmit = (formData) => {
		if (editingId) {
			updateAddress({ id: editingId, ...formData });
		} else {
			addAddress(formData);
		}
		setShowForm(false);
	};

	const editingAddress = addresses.find((address) => address.id === editingId);

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
					Manage Addresses
				</h1>
				<button
					onClick={openAddForm}
					className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
				>
					+ Add Address
				</button>
			</div>

			{addresses.length === 0 ? (
				<p className="text-slate-600 dark:text-slate-400">
					No saved addresses yet.
				</p>
			) : (
				<div className="space-y-3">
					{addresses.map((address) => (
						<div
							key={address.id}
							className="flex items-start justify-between border border-slate-200 dark:border-slate-700 rounded-lg p-4"
						>
							<div>
								<p className="font-semibold text-slate-900 dark:text-white">
									{address.label}
								</p>
								<p className="text-sm text-slate-600 dark:text-slate-400">
									{address.details}
								</p>
							</div>
							<div className="flex gap-2 flex-shrink-0">
								<button
									onClick={() => openEditForm(address)}
									className="text-sm text-white  hover:underline"
								>
									Edit
								</button>
								<button
									onClick={() => deleteAddress(address.id)}
									className="text-sm text-red-600 dark:text-red-400 hover:underline"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{showForm && (
				<AddressForm
					initialValues={editingAddress}
					onSubmit={handleSubmit}
					onCancel={() => setShowForm(false)}
				/>
			)}
		</div>
	);
};

export default Addresses;
