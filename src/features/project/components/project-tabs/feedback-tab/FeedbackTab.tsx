import type { ProjectResponse } from "@features/projects/services/get-paginated-projects";
import { COMMENTS } from "@features/seed/data/comments.data";
import { TabsContent } from "@shared/components/ui";
import { AddFeedbackCard } from "./AddFeedbackCard";
import { CommentCard } from "./CommentCard";

const comments = COMMENTS;

interface Props {
	project: ProjectResponse;
}
export const FeedbackTab = ({ project: _ }: Props) => {
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
					{comments.map((comment) => (
						<CommentCard comment={comment} />
					))}
				</div>
			</div>
		</TabsContent>
	);
};
