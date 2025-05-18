import type { ProjectResponse } from "@features/projects/services/get-paginated-projects";
import { TabsContent } from "@shared/components/ui";
import { ExternalLink, Github, Globe } from "lucide-react";

interface Props {
	project: ProjectResponse;
}
export const OverViewTab = ({ project }: Props) => {
	return (
		<TabsContent value="overview" className="mt-6">
			<div className="flex flex-col gap-6">
				<div>
					<h2 className="text-xl font-semibold mb-4">Project Description</h2>
					<div className="prose max-w-none">
						<p className="mb-2"> {project.description} </p>
						<h3 className="font-semibold">Areas Seeking Feedback</h3>
						<p>
							I'm particularly interested in feedback on the{" "}
							{project.feedbackArea} aspect
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-semibold">Project Links</h2>
					<div className="grid gap-2">
						<a
							href={project.liveDemo}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm text-primary hover:underline"
						>
							<Globe className="h-4 w-4" />
							<span>Live Demo</span>
							<ExternalLink className="h-3 w-3" />
						</a>
						<a
							href={project.githubRepo}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm text-primary hover:underline"
						>
							<Github className="h-4 w-4" />
							<span>GitHub Repository</span>
							<ExternalLink className="h-3 w-3" />
						</a>
					</div>
				</div>
			</div>
		</TabsContent>
	);
};
