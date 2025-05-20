import React from "react";
import { Navigate } from "react-router";

class ErrorBoundary extends React.Component {
	state: { hasError: boolean };

	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, _: any) {
		console.error("Error:", error);
	}

	render() {
		if (this.state.hasError) {
			return <Navigate to="/" replace />;
		}

		return (this.props as any).children;
	}
}

export default ErrorBoundary;
