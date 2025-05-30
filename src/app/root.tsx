import { ClerkProvider } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";

import stylesheet from "./index.css?url";

export async function loader(args: Route.LoaderArgs) {
	return rootAuthLoader(args);
}

export const links: Route.LinksFunction = () => [
	{
		rel: "icon",
		href: "/icon.svg",
		type: "image/svg+xml",
	},
	{
		rel: "stylesheet",
		href: stylesheet,
	},
];

export function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function Root({ loaderData }: Route.ComponentProps) {
	const queryClient = new QueryClient();

	return (
		<ClerkProvider
			loaderData={loaderData}
			signUpFallbackRedirectUrl="/"
			signInFallbackRedirectUrl="/"
		>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ClerkProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
