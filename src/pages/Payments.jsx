import { useState } from "react";
import usePayments from "../hooks/usePayments";

const PAYMENT_TYPES = [
	{ value: "card", label: "Card", icon: "credit_card" },
	{ value: "upi", label: "UPI", icon: "qr_code_2" },
];

const Payments = () => {
	const { paymentMethods, addPaymentMethod, deletePaymentMethod } =
		usePayments();
	const [showForm, setShowForm] = useState(false);
	const [type, setType] = useState("card");
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value.trim()) return;

		const label =
			type === "card"
				? `Card ending in ${value.slice(-4)}`
				: `UPI: ${value}`;

		addPaymentMethod({ type, label });
		setValue("");
		setShowForm(false);
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
					Payment Methods
				</h1>
				<button
					onClick={() => setShowForm(true)}
					className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
				>
					+ Add Method
				</button>
			</div>

			{paymentMethods.length === 0 ? (
				<p className="text-slate-600 dark:text-slate-400">
					No saved payment methods yet.
				</p>
			) : (
				<div className="space-y-3">
					{paymentMethods.map((method) => (
						<div
							key={method.id}
							className="flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-lg p-4"
						>
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
									{PAYMENT_TYPES.find((t) => t.value === method.type)
										?.icon || "payments"}
								</span>
								<span className="font-medium text-slate-900 dark:text-white">
									{method.label}
								</span>
							</div>
							<button
								onClick={() => deletePaymentMethod(method.id)}
								className="text-sm text-red-600 dark:text-red-400 hover:underline"
							>
								Remove
							</button>
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
							Add Payment Method
						</h2>

						<div className="flex gap-3">
							{PAYMENT_TYPES.map((t) => (
								<button
									key={t.value}
									type="button"
									onClick={() => setType(t.value)}
									className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border font-medium transition-colors ${
										type === t.value
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
								{type === "card" ? "Card Number" : "UPI ID"}
							</label>
							<input
								type="text"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder={
									type === "card" ? "1234 5678 9012 3456" : "you@upi"
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

export default Payments;
