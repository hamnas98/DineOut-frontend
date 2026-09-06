import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";

const MenuAccordion = ({ menu = [], restaurentName }) => {
	// Track which category titles are currently expanded
	const [openCategories, setOpenCategories] = useState([]);

	// Open the first category by default once menu data loads
	useEffect(() => {
		if (menu.length > 0) {
			setOpenCategories([menu[0].title]);
		}
	}, [menu]);

	const toggleCategory = (title) => {
		setOpenCategories((prev) =>
			prev.includes(title)
				? prev.filter((t) => t !== title)
				: [...prev, title],
		);
	};

	if (menu.length === 0) {
		return (
			<div className="text-center py-12">
				<span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
					restaurant_menu
				</span>
				<p className="text-slate-600 dark:text-slate-400">
					No menu available for this restaurant
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{menu.map((category) => {
				const isOpen = openCategories.includes(category.title);

				return (
					<div
						key={category.title}
						id={category.title}
						className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
					>
						{/* Accordion Header */}
						<button
							onClick={() => toggleCategory(category.title)}
							className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
							aria-expanded={isOpen}
							aria-controls={`panel-${category.title}`}
						>
							<span className="text-lg font-bold text-slate-900 dark:text-white">
								{category.title}{" "}
								<span className="text-sm font-normal text-slate-500 dark:text-slate-400">
									({category.itemCount})
								</span>
							</span>
							<span
								className={`material-symbols-outlined text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
									isOpen ? "rotate-180" : ""
								}`}
							>
								expand_more
							</span>
						</button>

						{/* Accordion Panel */}
						<div
							id={`panel-${category.title}`}
							className={`grid transition-all duration-300 ease-in-out ${
								isOpen
									? "grid-rows-[1fr] opacity-100"
									: "grid-rows-[0fr] opacity-0"
							}`}
						>
							<div className="overflow-hidden">
								<div className="px-4 pb-4 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
									{category.items.map((item) => (
										<MenuItem
											key={item.id}
											item={item}
											restaurentName={restaurentName}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const MenuItem = ({ item, restaurantName, restaurantId }) => {
	const { getItemQuantity, addItem, removeItem } = useCart();

	const quantity = getItemQuantity(item.id);

	function handleAdd() {
		addItem({
			id: item.id,
			name: item.name,
			price: item.price,
			imageId: item.imageId,
			isVeg: item.isVeg,
			restaurantId,
			restaurantName,
		});
	}

	function handleRemove() {
		removeItem(item.id);
	}

	return (
		<div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
			<div className="flex gap-4">
				<div className="flex-1">
					<div className="mb-2">
						<div
							className={`inline-flex items-center justify-center w-5 h-5 border-2 rounded ${
								item.isVeg ? "border-green-600" : "border-red-600"
							}`}
						>
							<div
								className={`w-2 h-2 rounded-full ${
									item.isVeg ? "bg-green-600" : "bg-red-600"
								}`}
							/>
						</div>
					</div>

					<h3 className="font-bold text-slate-900 dark:text-white mb-1">
						{item.name}
					</h3>

					<p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
						₹{item.price}
					</p>

					{item.rating && (
						<div className="flex items-center gap-1 mb-2">
							<span className="material-symbols-outlined text-green-600 text-sm">
								star
							</span>
							<span className="text-sm font-medium text-green-700 dark:text-green-400">
								{item.rating}
							</span>
							{item.ratingCount && (
								<span className="text-xs text-slate-500">
									({item.ratingCount})
								</span>
							)}
						</div>
					)}

					{item.description && (
						<p className="text-sm text-slate-600 dark:text-slate-400">
							{item.description}
						</p>
					)}
				</div>

				<div className="flex flex-col items-center gap-2 justify-end">
					{item.imageId && (
						<div
							className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700"
							style={{
								backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.imageId}")`,
							}}
						/>
					)}
					{quantity === 0 ? (
						<button
							onClick={handleAdd}
							className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap"
						>
							ADD
						</button>
					) : (
						<div className="flex items-center gap-3 bg-primary text-white rounded-lg px-2 py-1.5">
							<button
								onClick={handleRemove}
								className="text-lg font-bold w-5 h-5 flex items-center justify-center"
								aria-label="Decrease quantity"
							>
								−
							</button>
							<span className="text-sm font-bold min-w-[16px] text-center">
								{quantity}
							</span>
							<button
								onClick={handleAdd}
								className="text-lg font-bold w-5 h-5 flex items-center justify-center"
								aria-label="Increase quantity"
							>
								+
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MenuAccordion;
