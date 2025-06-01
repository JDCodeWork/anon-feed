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
			layout("layouts/submit.tsx", [
				index("routes/submit/redirect.ts"),

				route("details", "routes/submit/details.tsx"),
				route("media", "routes/submit/media.tsx"),
				route("feedback", "routes/submit/feedback.tsx"),

				// Actions
				...prefix("actions", [
					...prefix("preview-image", [
						route("create", "actions/submit/create-preview-image.ts"),
						route("delete", "actions/submit/delete-preview-image.ts"),
						route("get", "actions/submit/get-preview-images.ts"),
					]),
				]),
			]),
		]),
	]),
] satisfies RouteConfig;
