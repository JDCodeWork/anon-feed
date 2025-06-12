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
		route("project/:id", "routes/project.tsx"),

		...prefix("projects", [
			layout("layouts/projects.tsx", [
				route(":filter", "routes/projects/list.tsx"),

				route("*", "routes/projects/catch-all.ts"),
			]),
		]),

		...prefix("submit", [
			layout("layouts/submit.tsx", [
				route("details", "routes/submit/details.tsx"),
				route("media", "routes/submit/media.tsx"),
				route("feedback", "routes/submit/feedback.tsx"),

				route("*", "routes/submit/catch-all.ts"),
			]),
		]),
	]),
] satisfies RouteConfig;
