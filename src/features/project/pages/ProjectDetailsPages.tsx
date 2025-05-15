import { PROJECTS } from "@shared/data/projects.data";

import { ProjectHead } from "../components/ProjectHead";
import { ProjectInfo } from "../components/project-info/ProjectInfo";
import { ProjectTabs } from "../components/project-tabs/ProjectTabs";

export const ProjectDetailPage = () => {
	const project = PROJECTS[0];

	return (
		<div className="container py-8">
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="flex flex-col gap-6">
						<ProjectHead project={project} />
						<div className="aspect-video overflow-hidden rounded-lg bg-muted">
							<img
								src={project.screenshots[0].url || "/placeholder.svg"}
								alt={project.title}
								className="object-cover w-full h-full"
							/>
						</div>

						<ProjectTabs project={project} />
					</div>
				</div>

				<ProjectInfo project={project} />
			</div>
		</div>
	);
};
