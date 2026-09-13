import { useState } from "react";

const EMPTY_FORM = { label: "", details: "" };

const AddressForm = ({ initialValues, onSubmit, onCancel }) => {
	const [form, setForm] = useState(initialValues || EMPTY_FORM);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.label.trim() || !form.details.trim()) return;
		onSubmit(form);
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
			onClick={onCancel}
		>
			<form
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleSubmit}
				className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4"
			>
				<h2 className="text-lg font-bold text-slate-900 dark:text-white">
					{initialValues ? "Edit Address" : "Add Address"}
				</h2>

				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
						Label
					</label>
					<input
						type="text"
						value={form.label}
						onChange={(e) => setForm({ ...form, label: e.target.value })}
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
						onClick={onCancel}
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
	);
};

export default AddressForm;
