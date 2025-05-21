import { useUserData } from "@features/dashboard/hooks/useUserData";
import { TabsContent } from "@shared/components/ui";
import { ProjectCard } from "./ProjectCard";

export const ProjectsTab = () => {
	const { projects, commentsCount } = useUserData();

	return (
		<TabsContent value="projects" className="space-y-4">
			{projects.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard project={project} commentsCount={commentsCount} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-gray-100 rounded-2xl">
					<span className="text-2xl mb-2">No projects found</span>
					<span className="text-sm">
						Start by creating a new project to see it here.
					</span>
				</div>
			)}
		</TabsContent>
	);
};
