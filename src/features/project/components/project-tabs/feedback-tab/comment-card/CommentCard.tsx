import { FEEDBACK_AREAS } from "@features/submit/constants/project-creation.constant";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Card,
	CardContent,
	CardHeader,
} from "@shared/components/ui";
import type { ICommentResponse } from "@shared/interfaces";
import { timeAgo } from "@shared/lib/time-ago";

interface Props {
	comment: ICommentResponse;
	type?: "pending" | "success";
}
export const CommentCard = ({ comment, type = "success" }: Props) => {
	return (
		<Card className={type == "pending" ? "opacity-75" : ""}>
			<CardHeader>
				<div className="flex justify-between items-start">
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={comment.author.image || "/placeholder.svg"}
								alt={comment.author.name}
							/>
							<AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<span className="font-medium">{comment.author.name}</span>
							<p className="text-xs text-muted-foreground">
								{timeAgo(comment.created_at)}
							</p>
						</div>
					</div>
					<Badge variant="outline">
						{FEEDBACK_AREAS.find((f) => f.value == comment.category)?.label ||
							comment.category}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm">{comment.content}</p>
			</CardContent>
			{/* <MessageButtons /> */}
		</Card>
	);
};
