import { useState } from "react";
import useAddresses from "../hooks/useAddresses";

const EMPTY_FORM = { label: "", details: "" };

const Addresses = () => {
	const { addresses, addAddress, updateAddress, deleteAddress } =
		useAddresses();
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [form, setForm] = useState(EMPTY_FORM);

	const openAddForm = () => {
		setForm(EMPTY_FORM);
		setEditingId(null);
		setShowForm(true);
	};

	const openEditForm = (address) => {
		setForm({ label: address.label, details: address.details });
		setEditingId(address.id);
		setShowForm(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.label.trim() || !form.details.trim()) return;

		if (editingId) {
			updateAddress({ id: editingId, ...form });
		} else {
			addAddress(form);
		}
		setShowForm(false);
	};

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
									className="text-sm text-primary hover:underline"
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
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
					onClick={() => setShowForm(false)}
				>
					<form
						onClick={(e) => e.stopPropagation()}
						onSubmit={handleSubmit}
						className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4"
					>
						<h2 className="text-lg font-bold text-slate-900 dark:text-white">
							{editingId ? "Edit Address" : "Add Address"}
						</h2>

						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
								Label
							</label>
							<input
								type="text"
								value={form.label}
								onChange={(e) =>
									setForm({ ...form, label: e.target.value })
								}
								placeholder="e.g. Home, Work"
								className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
								Full Address
							</label>
							<textarea
								value={form.details}
								onChange={(e) =>
									setForm({ ...form, details: e.target.value })
								}
								rows={3}
								placeholder="Flat/House no, street, area, city"
								className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
							/>
						</div>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setShowForm(false)}
								className="flex-1 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="flex-1 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Addresses;
