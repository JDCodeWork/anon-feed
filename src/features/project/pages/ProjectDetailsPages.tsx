import { useQuery } from "@tanstack/react-query";
import { lazy, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { getProject } from "../actions/get-project";
import { ScreenshotsSlider } from "../components/ScreenshotsSlider";
import { ProjectHead } from "../components/project-head/ProjectHead";
import { ProjectInfo } from "../components/project-info/ProjectInfo";

const ProjectTabs = lazy(
	() => import("../components/project-tabs/ProjectTabs"),
);

const ProjectDetailPage = () => {
	const { id = "" } = useParams();
	const navigate = useNavigate();

	const { data: project } = useQuery({
		queryKey: ["project", id],
		queryFn: () => getProject({ id }),
		staleTime: 1000 * 60 * 2,
	});

	if (!project) navigate("/projects", { replace: true });

	useEffect(() => {
		if (project) document.title = project.title + " | AnonFeed";
	}, [project]);

	if (project)
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
};

export default ProjectDetailPage;
