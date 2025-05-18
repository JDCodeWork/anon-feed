import { getProjectComments } from "@features/project/actions/get-project-comments";
import type { IProjectResponse } from "@features/projects";
import { TabsContent } from "@shared/components/ui";
import { useQuery } from "@tanstack/react-query";
import { AddFeedbackCard } from "./AddFeedbackCard";
import { CommentCard } from "./CommentCard";

interface Props {
	project: IProjectResponse;
}
export const FeedbackTab = ({ project }: Props) => {
	const { data: comments } = useQuery({
		queryKey: ["project", "comments", project.id],
		queryFn: () => getProjectComments({ projectId: project.id }),
	});

	return (
		<TabsContent value="feedback" className="mt-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">Feedback</h2>
					<p className="text-sm text-muted-foreground">
						Provide constructive feedback to help improve this project
					</p>
				</div>

				<AddFeedbackCard />

				<div className="space-y-6">
					{comments &&
						comments.map((comment) => <CommentCard comment={comment} />)}
				</div>
			</div>
		</TabsContent>
	);
};
