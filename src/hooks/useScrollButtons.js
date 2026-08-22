// src/hooks/useScrollButtons.js
import { useState, useEffect, useRef, useCallback } from "react";

function useScrollButtons(dependencies = []) {
	const scrollContainerRef = useRef(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScrollButtons = useCallback(() => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
		}
	}, []);

	useEffect(() => {
		checkScrollButtons();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	const scroll = (direction) => {
		if (scrollContainerRef.current) {
			const scrollAmount = 400;
			const newScrollLeft =
				direction === "left"
					? scrollContainerRef.current.scrollLeft - scrollAmount
					: scrollContainerRef.current.scrollLeft + scrollAmount;

			scrollContainerRef.current.scrollTo({
				left: newScrollLeft,
				behavior: "smooth",
			});

			setTimeout(checkScrollButtons, 300);
		}
	};

	return {
		scrollContainerRef,
		canScrollLeft,
		canScrollRight,
		scroll,
		checkScrollButtons,
	};
}

export default useScrollButtons;
