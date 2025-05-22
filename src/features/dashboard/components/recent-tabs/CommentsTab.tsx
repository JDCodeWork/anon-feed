import { useUserData } from "@features/dashboard/hooks/useUserData";
import { TabsContent } from "@shared/components/ui";
import { CommentCard } from "./CommentCard";

export const CommentsTab = () => {
	const { comments, projects, isLoading } = useUserData();

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
					{isLoading ? (
						[...Array(3)].map((_, idx) => (
							<div
								key={idx}
								className={`p-4 ${idx !== comments.length - 1 ? "border-b" : ""}`}
							>
								<div className="flex items-start gap-4 animate-pulse">
									<div className="h-10 w-10 rounded-full bg-muted" />
									<div className="flex-1 space-y-2">
										<div className="h-4 w-1/4 bg-muted rounded" />
										<div className="h-3 w-1/3 bg-muted rounded" />
										<div className="h-3 w-3/4 bg-muted rounded" />
										<div className="h-3 w-1/2 bg-muted rounded" />
									</div>
								</div>
							</div>
						))
					) : comments.length > 0 ? (
						comments.map((comment, index) => (
							<div
								key={comment.id}
								className={`p-4 ${index !== comments.length - 1 ? "border-b" : ""}`}
							>
								<CommentCard
									comment={comment}
									projectName={
										projects.find((p) => p.id == comment.project_id)?.title ||
										""
									}
								/>
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
		</TabsContent>
	);
};
