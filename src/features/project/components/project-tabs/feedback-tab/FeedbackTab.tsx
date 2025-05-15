import type { IProjectDb } from "@features/projects";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	TabsContent,
	Textarea,
} from "@shared/components/ui";
import { COMMENTS } from "@shared/data/comments.data";
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

				<Card>
					<CardHeader>
						<CardTitle className="text-base">Add Your Feedback</CardTitle>
						<CardDescription>
							Your feedback will be visible to the project creator and other
							users
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Textarea
							placeholder="Share your thoughts, suggestions, or questions about this project..."
							className="min-h-[120px]"
						/>
					</CardContent>
					<CardFooter className="flex justify-between">
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="cursor-pointer hover:bg-secondary"
							>
								UI/UX
							</Badge>
							<Badge
								variant="outline"
								className="cursor-pointer hover:bg-secondary"
							>
								Code Quality
							</Badge>
							<Badge
								variant="outline"
								className="cursor-pointer hover:bg-secondary"
							>
								Performance
							</Badge>
							<Badge
								variant="outline"
								className="cursor-pointer hover:bg-secondary"
							>
								+ Add Category
							</Badge>
						</div>
						<Button>Submit Feedback</Button>
					</CardFooter>
				</Card>

				<div className="space-y-6">
					{comments.map((comment) => (
						<CommentCard comment={comment} />
					))}
				</div>
			</div>
		</TabsContent>
	);
};
