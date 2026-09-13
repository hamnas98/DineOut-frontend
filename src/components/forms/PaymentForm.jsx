import { useState } from "react";

const PAYMENT_TYPES = [
	{ value: "card", label: "Card", icon: "credit_card" },
	{ value: "upi", label: "UPI", icon: "qr_code_2" },
];

const EMPTY_FORM = { type: "card", value: "" };

const PaymentForm = ({ onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY_FORM);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.value.trim()) return;

		const label =
			form.type === "card"
				? `Card ending in ${form.value.slice(-4)}`
				: `UPI: ${form.value}`;

		onSubmit({ type: form.type, label });
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
					Add Payment Method
				</h2>

				<div className="flex gap-3">
					{PAYMENT_TYPES.map((t) => (
						<button
							key={t.value}
							type="button"
							onClick={() => setForm({ ...form, type: t.value })}
							className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border font-medium transition-colors ${
								form.type === t.value
									? "border-primary bg-primary/10 text-primary"
									: "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
							}`}
						>
							<span className="material-symbols-outlined text-lg">
								{t.icon}
							</span>
							{t.label}
						</button>
					))}
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
						{form.type === "card" ? "Card Number" : "UPI ID"}
					</label>
					<input
						type="text"
						value={form.value}
						onChange={(e) => setForm({ ...form, value: e.target.value })}
						placeholder={
							form.type === "card" ? "1234 5678 9012 3456" : "you@upi"
						}
						className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
					/>
					<p className="text-xs text-slate-500 mt-1">
						Demo only — no real payment data is stored or processed.
					</p>
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

export default PaymentForm;
