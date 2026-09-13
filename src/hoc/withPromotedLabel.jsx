function withPromotedLabel(WrappedComponent) {
	const WithPromotedLabel = ({ restaurant, ...rest }) => {
		const isPromoted = Boolean(restaurant?.promoted);

		return (
			<WrappedComponent
				restaurant={restaurant}
				isPromoted={isPromoted}
				{...rest}
			/>
		);
	};

	const wrappedName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";
	WithPromotedLabel.displayName = `WithPromotedLabel(${wrappedName})`;

	return WithPromotedLabel;
}

export default withPromotedLabel;
