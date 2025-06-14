import { getFilteredProjects } from "@features/projects/actions/get-filtered-projects";
import { getTotalPages } from "@features/projects/actions/get-total-pages";
import { ProjectCard } from "@features/projects/components/ProjectCard";
import { ProjectCardSkeleton } from "@features/projects/components/ProjectCardSkeleton";
import {
	data,
	isRouteErrorResponse,
	useNavigation,
	useRouteError,
} from "react-router";
import type { Route } from "./+types/list";

export async function clientLoader({
	request,
	params,
}: Route.ClientLoaderArgs) {
	const url = new URL(request.url);

	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const filter = params.filter || "all";

	const { totalPages } = await getTotalPages({ limit: 6, filter });
	if (!totalPages) throw data("No projects found", { status: 404 });

	const currentPage = page > totalPages ? totalPages : page;

	const { data: projects } = await getFilteredProjects({
		limit: 6,
		page: currentPage,
		filter,
	});

	return {
		projects,
	};
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
	return Array.from({ length: 3 }).map((_, i) => (
		<ProjectCardSkeleton key={i} />
	));
}

export default function ProjectsList({ loaderData }: Route.ComponentProps) {
	const { projects = [] } = loaderData;

	const navigation = useNavigation();
	const isLoading =
		navigation.state === "loading" &&
		navigation.location.pathname.includes("/projects");

	return isLoading ? (
		<HydrateFallback />
	) : projects.length === 0 ? (
		<div className="flex items-center justify-center h-64">
			<p className="text-gray-500">No projects found</p>
		</div>
	) : (
		projects.map((project) => (
			<ProjectCard project={project} key={project.id} />
		))
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div className="flex flex-col items-center justify-center h-64 col-span-3 bg-stone-50 rounded">
				<h1 className="text-2xl font-bold text-stone-600 mb-2">
					{error.status} {error.statusText}
				</h1>
				<p className="text-stone-700">
					{error.data || "An unexpected error occurred."}
				</p>
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}
