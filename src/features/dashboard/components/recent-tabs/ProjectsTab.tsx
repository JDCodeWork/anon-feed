import { useSession } from "@clerk/clerk-react";
import { deleteProject } from "@features/dashboard/actions/delete-project";
import { useUserData } from "@features/dashboard/hooks/useUserData";
import type { IProjectResponse } from "@features/projects";
import { TabsContent } from "@shared/components/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProjectCard } from "./ProjectCard";

export const ProjectsTab = () => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	const { projects, commentsCount } = useUserData();

	const deleteProjectMutation = useMutation({
		mutationFn: deleteProject,
		onMutate: async ({ userId, projectId }) => {
			await queryClient.cancelQueries({
				queryKey: ["projects", "user", userId],
			});

			const previousProjects = queryClient.getQueryData([
				"project",
				"comments",
				projectId,
			]) as IProjectResponse[] | undefined;

			queryClient.setQueryData(
				["projects", "user", userId],
				(old: IProjectResponse[]) => old?.filter((p) => p.id !== projectId),
			);

			return { previousProjects, userId };
		},
		onError: (_err, _new, context) => {
			queryClient.setQueryData(
				["projects", "user", context?.userId],
				context?.previousProjects,
			);

			toast.error("An error occurred while deleting the project");
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				predicate: (query) => {
					const queryKey = query.queryKey;

					if (!Array.isArray(queryKey)) return false;

					const [prefix, params] = queryKey;

					return (
						prefix === "projects" &&
						typeof params === "object" &&
						params !== null &&
						"filter" in params &&
						"page" in params
					);
				},
			});
		},
	});

	const handleDelete = async (projectId: string) => {
		deleteProjectMutation.mutate({
			projectId,
			userId: session?.user.id || "",
			userToken: (await session?.getToken()) ?? "",
		});
	};

	return (
		<TabsContent value="projects" className="space-y-4">
			{projects.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard
							project={project}
							commentsCount={commentsCount}
							onDelete={handleDelete}
						/>
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
