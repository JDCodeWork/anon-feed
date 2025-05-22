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
	const { projects, commentsCount, isLoading } = useUserData();

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
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{isLoading
						? [...Array(3)].map((_, idx) => (
								<div
									key={idx}
									className="animate-pulse rounded-xl border p-4 flex flex-col gap-4"
								>
									<div className="flex justify-between items-start">
										<div>
											<div className="h-6 w-32 bg-gray-200 rounded mb-2" />
											<div className="h-4 w-20 bg-gray-200 rounded" />
										</div>
										<div className="h-6 w-16 bg-gray-200 rounded" />
									</div>
									<div className="aspect-video bg-gray-200 rounded-md mb-4" />
									<div className="flex items-center justify-between w-full text-sm">
										<div className="flex items-center gap-1">
											<div className="h-4 w-4 bg-gray-200 rounded" />
											<div className="h-4 w-8 bg-gray-200 rounded" />
										</div>
									</div>
									<div className="flex gap-4 pt-0">
										<div className="h-10 w-full bg-gray-200 rounded" />
										<div className="h-10 w-full bg-gray-200 rounded" />
										<div className="h-10 w-full bg-gray-200 rounded" />
									</div>
								</div>
							))
						: projects.map((project) => (
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
