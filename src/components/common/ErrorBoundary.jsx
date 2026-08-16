import React from "react";
import NotFound from "../../pages/NotFound";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error, errorInfo) {
		console.error("Application Error:", error);
		console.error("Error Info:", errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <NotFound />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;