import { useSession } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsRelatedProjects } from "../actions/get-comments-related-projects";
import { getUserProjects } from "../actions/get-user-projects";

export const useUserData = () => {
	const queryClient = useQueryClient();

	const { session } = useSession();

	const { data: projects = [] } = useQuery({
		queryKey: ["projects", "user", session?.user.id],
		queryFn: async () =>
			getUserProjects({
				userId: session?.user.id ?? "",
				userToken: (await session?.getToken()) ?? "",
			}),
	});

	const projectsId = projects.map((project) => project.id);

	const { data: comments = [] } = useQuery({
		queryKey: ["projects", "user", session?.user.id, "comments"],
		queryFn: async () =>
			getCommentsRelatedProjects({
				projectsId,
				userToken: (await session?.getToken()) ?? "",
			}),
	});

	const commentsCount = (comments || []).reduce(
		(prev, curr) => {
			prev[curr.project_id] = (prev[curr.project_id] || 0) + 1;

			return prev;
		},
		{} as Record<string, number>,
	);

	const refreshData = () => {
		queryClient.refetchQueries({
			queryKey: ["projects", "user", session?.user.id],
		});
		queryClient.refetchQueries({
			queryKey: ["projects", "user", session?.user.id, "comments"],
		});
	};

	return {
		commentsCount,
		comments,
		projects,
		refreshData,
	};
};
