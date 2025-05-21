import { useUserData } from "@features/dashboard/hooks/useUserData";
import { CATEGORIES } from "@features/submit/constants/project-creation.constant";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	TabsContent,
} from "@shared/components/ui";
import { timeAgo } from "@shared/lib/time-ago";
import { Link } from "react-router";
import { CommentCard } from "./CommentCard";

export const CommentsTab = () => {
	const { comments } = useUserData();

	return (
		<TabsContent value="feedback" className="space-y-4">
			<div className="rounded-md border">
				<div className="p-4">
					<h2 className="text-xl font-semibold">Recent Feedback</h2>
					<p className="text-sm text-muted-foreground">
						The latest feedback received on your projects
					</p>
				</div>
				<div className="border-t">
					{comments.length > 0 ? (
						comments.map((comment, index) => (
							<div
								key={comment.id}
								className={`p-4 ${index !== comments.length - 1 ? "border-b" : ""}`}
							>
								<CommentCard comment={comment} />
							</div>
						))
					) : (
						<div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
							<p className="text-lg font-medium">No feedback yet</p>
							<p className="text-sm">
								You haven't received any feedback on your projects.
							</p>
						</div>
					)}
				</div>
			</div>
			<div className="flex justify-center">
				<Link to="/dashboard/feedback">
					<Button variant="outline">View All Feedback</Button>
				</Link>
			</div>
		</TabsContent>
	);
};
