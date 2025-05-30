import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes";

export default [
	layout("layouts/app.tsx", [
		index("routes/home.tsx"),

		route("dashboard", "routes/dashboard.tsx"),
		route("projects", "routes/projects.tsx"),
		route("project/:id", "routes/project.tsx"),

		...prefix("submit", [
			index("routes/submit/catch-all.ts"),

			route(":tab", "routes/submit/home.tsx"),
		]),
	]),
] satisfies RouteConfig;
