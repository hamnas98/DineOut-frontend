import { useState } from "react";
import usePayments from "../hooks/usePayments";
import PaymentForm from "../components/forms/PaymentForm";

const PAYMENT_ICONS = {
	card: "credit_card",
	upi: "qr_code_2",
};

const Payments = () => {
	const { paymentMethods, addPaymentMethod, deletePaymentMethod } =
		usePayments();
	const [showForm, setShowForm] = useState(false);

	const handleSubmit = (paymentData) => {
		addPaymentMethod(paymentData);
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
									{PAYMENT_ICONS[method.type] || "payments"}
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
				<PaymentForm
					onSubmit={handleSubmit}
					onCancel={() => setShowForm(false)}
				/>
			)}
		</div>
	);
};

export default Payments;
