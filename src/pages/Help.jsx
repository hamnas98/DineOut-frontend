import { useState } from "react";

function Help() {
	const [activeCategory, setActiveCategory] = useState("orders");
	const [searchQuery, setSearchQuery] = useState("");

	const faqCategories = {
		orders: {
			title: "Orders & Delivery",
			icon: "shopping_bag",
			faqs: [
				{
					question: "How do I track my order?",
					answer:
						'You can track your order in real-time by going to the "Orders" section in your profile. You\'ll see the current status and estimated delivery time.',
				},
				{
					question: "Can I modify my order after placing it?",
					answer:
						"Orders can be modified within 2 minutes of placement. After that, please contact our support team for assistance.",
				},
				{
					question: "What if my order is delayed?",
					answer:
						"If your order is delayed beyond the estimated time, you can contact the delivery partner directly through the app or reach out to our support team.",
				},
				{
					question: "How do I cancel my order?",
					answer:
						'You can cancel your order before the restaurant accepts it. Go to "Orders", select the order, and click "Cancel Order". Refunds are processed within 5-7 business days.',
				},
			],
		},
		payments: {
			title: "Payments & Refunds",
			icon: "payment",
			faqs: [
				{
					question: "What payment methods do you accept?",
					answer:
						"We accept credit/debit cards, UPI, net banking, mobile wallets, and cash on delivery.",
				},
				{
					question: "When will I receive my refund?",
					answer:
						"Refunds are processed within 5-7 business days. The time to reflect in your account depends on your bank or payment provider.",
				},
				{
					question: "Is it safe to save my card details?",
					answer:
						"Yes, we use industry-standard encryption and PCI-DSS compliant systems to securely store your payment information.",
				},
				{
					question: "Why was my payment declined?",
					answer:
						"Payment failures can occur due to insufficient funds, incorrect card details, or bank security measures. Please verify your details and try again.",
				},
			],
		},
		account: {
			title: "Account & Profile",
			icon: "account_circle",
			faqs: [
				{
					question: "How do I update my delivery address?",
					answer:
						"Go to your Profile > Addresses > Edit or Add New Address. You can set a default address or choose different addresses for each order.",
				},
				{
					question: "How do I change my registered mobile number?",
					answer:
						"Go to Profile > Edit Profile > Mobile Number. You'll receive an OTP for verification on your new number.",
				},
				{
					question: "Can I have multiple accounts?",
					answer:
						"Each mobile number can be linked to only one account. However, you can add multiple delivery addresses to a single account.",
				},
				{
					question: "How do I delete my account?",
					answer:
						"Go to Profile > Settings > Delete Account. Please note that this action is permanent and cannot be undone.",
				},
			],
		},
		offers: {
			title: "Offers & Coupons",
			icon: "local_offer",
			faqs: [
				{
					question: "How do I apply a coupon code?",
					answer:
						'On the checkout page, you\'ll see a "Apply Coupon" section. Enter your code and click Apply. The discount will be reflected in your total.',
				},
				{
					question: "Why is my coupon not working?",
					answer:
						"Coupons may have minimum order values, specific restaurant restrictions, or expiry dates. Check the terms and conditions of your coupon.",
				},
				{
					question: "Can I use multiple coupons on one order?",
					answer:
						"No, only one coupon can be applied per order. The system will automatically apply the best available offer for your order.",
				},
				{
					question: "Where can I find current offers?",
					answer:
						'Check the "Offers" section in the app to see all available coupons and deals. You can also find restaurant-specific offers on their menu pages.',
				},
			],
		},
	};

	const filteredFaqs = searchQuery
		? Object.values(faqCategories).flatMap((category) =>
				category.faqs
					.filter(
						(faq) =>
							faq.question
								.toLowerCase()
								.includes(searchQuery.toLowerCase()) ||
							faq.answer
								.toLowerCase()
								.includes(searchQuery.toLowerCase()),
					)
					.map((faq) => ({ ...faq, category: category.title })),
			)
		: faqCategories[activeCategory].faqs;

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
					How can we help you?
				</h1>
				<p className="text-slate-600 dark:text-slate-400 mb-8">
					Find answers to commonly asked questions
				</p>

				{/* Search */}
				<div className="max-w-2xl mx-auto">
					<div className="relative">
						<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
							search
						</span>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search for help..."
							className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
						/>
					</div>
				</div>
			</div>

			{/* Categories */}
			{!searchQuery && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{Object.entries(faqCategories).map(([key, category]) => (
						<button
							key={key}
							onClick={() => setActiveCategory(key)}
							className={`p-6 rounded-xl border-2 transition-all ${
								activeCategory === key
									? "border-primary bg-primary/5 dark:bg-primary/10"
									: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
							}`}
						>
							<span
								className={`material-symbols-outlined text-4xl mb-2 ${
									activeCategory === key
										? "text-primary"
										: "text-slate-400"
								}`}
							>
								{category.icon}
							</span>
							<p
								className={`font-semibold text-sm ${
									activeCategory === key
										? "text-primary"
										: "text-slate-700 dark:text-slate-300"
								}`}
							>
								{category.title}
							</p>
						</button>
					))}
				</div>
			)}

			{/* FAQs */}
			<div className="space-y-4">
				{searchQuery && (
					<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
						Found {filteredFaqs.length} result(s) for "{searchQuery}"
					</p>
				)}

				{filteredFaqs.length > 0 ? (
					filteredFaqs.map((faq, index) => (
						<div
							key={index}
							className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
						>
							{searchQuery && faq.category && (
								<span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
									{faq.category}
								</span>
							)}
							<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
								{faq.question}
							</h3>
							<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
								{faq.answer}
							</p>
						</div>
					))
				) : (
					<div className="text-center py-12">
						<span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
							search_off
						</span>
						<p className="text-slate-600 dark:text-slate-400">
							No results found for "{searchQuery}"
						</p>
					</div>
				)}
			</div>

			{/* Contact Support */}
			<div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-xl p-8 text-center">
				<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
					Still need help?
				</h2>
				<p className="text-slate-600 dark:text-slate-400 mb-6">
					Our support team is available 24/7 to assist you
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
						<span className="material-symbols-outlined">chat</span>
						Chat with us
					</button>
					<button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
						<span className="material-symbols-outlined">email</span>
						Email support
					</button>
				</div>
			</div>
		</div>
	);
}

export default Help;
