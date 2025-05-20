import { FEEDBACK_AREAS } from "@features/submit/constants/project-creation.constant";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@shared/components/ui";
import type { ICommentResponse } from "@shared/interfaces";
import { timeAgo } from "@shared/lib/time-ago";
import { Trash2 } from "lucide-react";

interface Props {
	comment: ICommentResponse;
	isOwned: boolean;
	onDelete: (commentId: number) => void;
}
export const CommentCard = ({ comment, isOwned, onDelete }: Props) => {
	return (
		<Card className={isOwned ? "gap-0 pb-2" : ""}>
			<CardHeader className={isOwned ? "mb-4" : ""}>
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
							<span className="font-medium">
								{isOwned ? "Me" : comment.author.name}{" "}
							</span>
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
			{isOwned ? (
				<CardFooter className="flex justify-end">
					<Button
						size="icon"
						variant="ghost"
						className="ml-2 text-gray-500 hover:bg-red-50 hover:text-red-400 size-8"
						onClick={() => onDelete(comment.id)}
					>
						<Trash2 className="size-4" />
					</Button>
				</CardFooter>
			) : (
				""
			)}
			{/* <MessageButtons /> */}
		</Card>
	);
};
