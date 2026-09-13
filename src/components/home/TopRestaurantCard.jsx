import { Link } from "react-router-dom";
import withPromotedLabel from "../../hoc/withPromotedLabel";
import FavouriteButton from "../common/FavouriteButton";

const TopRestaurantCard = ({ restaurant, isPromoted }) => {
	const {
		id,
		name,
		imageId,
		cuisines,
		rating,
		costForTwo,
		deliveryTime,
		area,
		offer,
		discount,
	} = restaurant;

	return (
		<Link to={`/restaurant/${id}`}>
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-64 transform hover:-translate-y-1">
				<div className="max-w-90 relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
					<div
						className="w-full h-44 bg-cover bg-center relative"
						style={{
							backgroundImage: `url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imageId}")`,
						}}
					>
						{/* ✅ Favourite button — top-right, unaffected */}
						<div className="absolute top-3 right-3 z-10">
							<FavouriteButton
								restaurant={{
									id,
									name,
									imageId,
									cuisines,
									rating,
									area,
									deliveryTime,
									costForTwo,
								}}
							/>
						</div>

						{/* ✅ Top-left badge stack — Promoted + Discount, one on top of the other, never overlapping */}
						<div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-2">
							{isPromoted && (
								<div className="flex items-center gap-1 px-2 py-1 bg-slate-900/80 dark:bg-slate-100/90 rounded-md backdrop-blur-sm">
									<span className="material-symbols-outlined text-[14px] text-yellow-400 dark:text-yellow-600 leading-none">
										bolt
									</span>
									<span className="text-[10px] font-semibold text-white dark:text-slate-900 uppercase tracking-wide">
										Promoted
									</span>
								</div>
							)}

							{discount && (
								<div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
									<span className="flex items-center gap-1">
										<span className="material-symbols-outlined text-sm">
											local_offer
										</span>
										{discount}
									</span>
								</div>
							)}
						</div>

						{/* Gradient Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

						{/* Offer Info at bottom */}
						{offer && (
							<div className="absolute bottom-3 left-3 right-3">
								<p className="text-white text-xl font-bold drop-shadow-lg">
									{offer}
								</p>
							</div>
						)}
					</div>

					<div className="bg-white dark:bg-slate-800 p-4">
						<h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight mb-2 truncate">
							{name}
						</h3>

						<div className="flex items-center gap-2 mb-2">
							<div className="flex items-center gap-1">
								<span className="material-symbols-outlined text-green-600 text-sm">
									star
								</span>
								<span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
									{rating}
								</span>
							</div>
							<span className="text-slate-400">•</span>
							<span className="text-slate-600 dark:text-slate-400 text-sm">
								{deliveryTime}
							</span>
						</div>
						<p className="text-slate-500 dark:text-slate-400 text-sm truncate mb-1">
							{costForTwo}
						</p>
						<p className="text-slate-500 dark:text-slate-400 text-sm truncate mb-1">
							{cuisines}
						</p>
						<p className="text-slate-500 dark:text-slate-400 text-xs">
							{area}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

const PromotedTopRestaurantCard = withPromotedLabel(TopRestaurantCard);

export default PromotedTopRestaurantCard;
