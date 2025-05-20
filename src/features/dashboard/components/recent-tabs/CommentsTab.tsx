import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	TabsContent,
} from "@shared/components/ui";
import type { ICommentResponse } from "@shared/interfaces";
import { Link } from "react-router";

export const CommentsTab = () => {
	const comments: ICommentResponse[] = [];
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
					{comments.map((comment, index) => (
						<div
							key={comment.id}
							className={`p-4 ${index !== comments.length - 1 ? "border-b" : ""}`}
						>
							<div className="flex items-start gap-4">
								<Avatar className="h-10 w-10">
									<AvatarImage
										src={comment.author.image || ""}
										alt={comment.author.name}
									/>
									<AvatarFallback>
										{comment.author.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-1">
									<div className="flex items-center gap-2">
										<p className="font-medium">{comment.author.name}</p>
										<Badge variant="outline" className="ml-auto">
											{comment.category}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground">on {"todo"}</p>
									<p className="text-sm">{comment.content}</p>
									<div className="flex items-center gap-4 pt-1">
										<p className="text-xs text-muted-foreground">
											{comment.created_at}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
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
