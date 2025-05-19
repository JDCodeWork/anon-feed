import {
	type CreateCommentArgs,
	createComment,
} from "@features/project/actions/create-comment";
import { getProjectComments } from "@features/project/actions/get-project-comments";
import type { IProjectResponse } from "@features/projects";
import { TabsContent } from "@shared/components/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddFeedbackCard } from "./AddFeedbackCard";
import { CommentCard } from "./comment-card/CommentCard";

interface Props {
	project: IProjectResponse;
}
export const FeedbackTab = ({ project }: Props) => {
	const queryClient = useQueryClient();

	const { data: comments } = useQuery({
		queryKey: ["project", "comments", project.id],
		queryFn: () => getProjectComments({ projectId: project.id }),
	});

	const createCommentMutation = useMutation<void, unknown, CreateCommentArgs>({
		mutationFn: createComment,
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["project", "comments", project.id],
			});
		},
	});

	const { isPending, variables } = createCommentMutation;

	return (
		<TabsContent value="feedback" className="mt-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">Feedback</h2>
					<p className="text-sm text-muted-foreground">
						Provide constructive feedback to help improve this project
					</p>
				</div>

				<AddFeedbackCard
					projectId={project.id}
					createCommentMutation={createCommentMutation}
				/>

				<div className="space-y-6">
					{isPending && (
						<CommentCard
							comment={{
								category: variables.comment.category,
								content: variables.comment.content,
								project_id: variables.comment.projectId,
								author: variables.user,
								user_id: variables.user.id,
								id: 0,
								created_at: new Date(Date.now()).toISOString(),
							}}
							type="pending"
						/>
					)}
					{comments &&
						comments.map((comment) => (
							<CommentCard key={comment.id} comment={comment} />
						))}
				</div>
			</div>
		</TabsContent>
	);
};
