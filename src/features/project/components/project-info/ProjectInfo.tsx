import type { IProjectResponse } from "@features/projects";
import { ProjectCreator } from "./ProjectCreator";

interface Props {
	project: IProjectResponse;
}
export const ProjectInfo = ({ project }: Props) => {
	return (
		<div className="space-y-6">
			<ProjectCreator
				author={project?.author}
				experience={project.experienceLevel}
			/>

			{/*TODO <ProjectStats project={project} /> */}

			{/*TODO <VerificationStatus /> */}

			{/*TODO <SimilarProjects /> */}
		</div>
	);
};
