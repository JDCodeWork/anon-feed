import type { IProjectDb } from "@features/projects";
import { TabsContent } from "@shared/components/ui";
import { COMMENTS } from "@shared/data/comments.data";
import { AddFeedbackCard } from "./AddFeedbackCard";
import { CommentCard } from "./CommentCard";

const comments = COMMENTS;

interface Props {
	project: IProjectDb;
}
export const FeedbackTab = ({ project }: Props) => {
	return (
		<TabsContent value="feedback" className="mt-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">
						Feedback ({project.commentCount})
					</h2>
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
