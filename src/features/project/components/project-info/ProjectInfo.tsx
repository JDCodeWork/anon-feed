import type { IProjectDb } from "@features/projects";
import { ProjectCreator } from "./ProjectCreator";
import { ProjectStats } from "./ProjectStats";

interface Props {
	project: IProjectDb;
}
export const ProjectInfo = ({ project }: Props) => {
	return (
		<div className="space-y-6">
			<ProjectCreator author={project.author} />

			<ProjectStats project={project} />

			{/*TODO <VerificationStatus /> */}

			{/*TODO <SimilarProjects /> */}
		</div>
	);
};
