import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
	layout("app.layout.tsx", [index("catchall.tsx")]),
] satisfies RouteConfig;
