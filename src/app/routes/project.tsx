import { Button } from "@shared/components/ui";
import { isRouteErrorResponse, useRouteError } from "react-router";

import { getProject } from "@features/project/actions/get-project";
import { ScreenshotsSlider } from "@features/project/components/ScreenshotsSlider";
import { ProjectHead } from "@features/project/components/project-head/ProjectHead";
import { ProjectInfo } from "@features/project/components/project-info/ProjectInfo";
import ProjectTabs from "@features/project/components/project-tabs/ProjectTabs";
import { Link, data } from "react-router";
import type { Route } from "./+types/project";

export function meta({ data }: Route.MetaArgs) {
	if (!data) {
		return [
			{
				title: "AnonFeed - Project Details",
				description:
					"View details about a specific project, including screenshots, information, and more.",
			},
		];
	}

	return [
		{
			title: `${data.project.title} | AnonFeed`,
			description: data.project.description.slice(0, 150) + "...",
		},
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	const { id = "" } = params;

	const { ok, data: project } = await getProject({ id });

	if (!ok || !project) {
		throw data("Project not found", { status: 404 });
	}

	return {
		project,
	};
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
	const { project } = loaderData;

	return (
		<div className="max-w-5xl w-full mx-auto mt-8 mb-16">
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="flex flex-col gap-6">
						<ProjectHead project={project} />
						<ScreenshotsSlider screenshots={project.screenshots} />

						<ProjectTabs project={project} />
					</div>
				</div>

				<ProjectInfo project={project} />
			</div>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	return (
		<div className="my-auto flex-col items-center justify-center px-4 text-center">
			<h1 className="text-4xl font-extrabold mb-3 text-primary">
				Oops! An error occurred
			</h1>
			<p className="mb-3 text-lg text-muted-foreground">
				We couldn't find the project you're looking for or an unexpected problem
				has occurred.
			</p>
			{isRouteErrorResponse(error) && (
				<p className="text-base text-gray-500 mb-4">
					{error.status} - {error.data}
				</p>
			)}
			<Link to="/projects">
				<Button>Back to Home</Button>
			</Link>
		</div>
	);
}
