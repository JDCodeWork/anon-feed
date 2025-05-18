import type { ProjectResponse } from "@features/projects/services/get-paginated-projects";
import { ProjectCreator } from "./ProjectCreator";

interface Props {
	project: ProjectResponse;
}
export const ProjectInfo = ({ project }: Props) => {
	return (
		<div className="space-y-6">
			<ProjectCreator author={project.author} />

			{/*TODO <ProjectStats project={project} /> */}

			{/*TODO <VerificationStatus /> */}

			{/*TODO <SimilarProjects /> */}
		</div>
	);
};
