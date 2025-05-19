import type { IProjectResponse } from "@features/projects";
import { TabsContent } from "@shared/components/ui";
import { AddFeedbackCard } from "./AddFeedbackCard";
import { CommentsList } from "./comment-list/CommentsList";

interface Props {
	project: IProjectResponse;
}
export const FeedbackTab = ({ project }: Props) => {
	return (
		<TabsContent value="feedback" className="mt-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">Feedback</h2>
					<p className="text-sm text-muted-foreground">
						Provide constructive feedback to help improve this project
					</p>
				</div>

				<AddFeedbackCard projectId={project.id} />

				<CommentsList projectId={project.id} />
			</div>
		</TabsContent>
	);
};
