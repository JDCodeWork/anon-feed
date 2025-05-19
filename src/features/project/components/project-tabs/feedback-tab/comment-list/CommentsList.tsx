import { useSession } from "@clerk/clerk-react";
import { deleteComment } from "@features/project/actions/delete-comment";
import { getProjectComments } from "@features/project/actions/get-project-comments";
import type { ICommentResponse } from "@shared/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommentCard } from "./CommentCard";

interface Props {
	projectId: string;
}
export const CommentsList = ({ projectId }: Props) => {
	const queryClient = useQueryClient();
	const { session } = useSession();

	const { data: comments } = useQuery({
		queryKey: ["project", "comments", projectId],
		queryFn: () => getProjectComments({ projectId }),
	});

	const deleteCommentMutation = useMutation({
		mutationFn: deleteComment,
		onMutate: async ({ commentId }) => {
			await queryClient.cancelQueries({
				queryKey: ["project", "comments", projectId],
			});

			const previousComments = queryClient.getQueriesData({
				queryKey: ["project", "comments", projectId],
			});

			queryClient.setQueryData(
				["project", "comments", projectId],
				(old: ICommentResponse[]) => old?.filter((p) => p.id !== commentId),
			);

			return { previousComments };
		},
		onError: (_err, _new, context) => {
			queryClient.setQueryData(
				["project", "comments", projectId],
				context?.previousComments,
			);

			toast.error("An error occurred while deleting the comment");
		},
	});

	const onDeleteComment = async (commentId: number) =>
		deleteCommentMutation.mutate({
			commentId,
			userId: session?.user.id!,
			userToken: (await session?.getToken()) || "",
		});

	return (
		<div className="space-y-6">
			{comments &&
				comments.map((comment) => (
					<CommentCard
						key={comment?.id || "x"}
						comment={comment}
						isOwned={session?.user.id == comment.user_id}
						onDelete={onDeleteComment}
					/>
				))}
		</div>
	);
};
