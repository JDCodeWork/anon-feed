import { Badge, CardFooter } from "@shared/components/ui";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type Comment = {
	likes: number;
	dislikes: number;
	verified: boolean;
};

interface Props {
	comment: Comment;
}
export const MessageButtons = ({ comment }: Props) => {
	return (
		<CardFooter className="pt-2 flex justify-between">
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<ThumbsUp className="h-4 w-4 cursor-pointer hover:text-primary" />
					<span>{comment.likes}</span>
				</div>
				<div className="flex items-center gap-1">
					<ThumbsDown className="h-4 w-4 cursor-pointer hover:text-primary" />
					<span>{comment.dislikes}</span>
				</div>
				<button className="text-sm hover:text-primary">Reply</button>
			</div>
			<div className="flex items-center gap-2">
				{comment.verified && (
					<Badge variant="outline" className="text-green-500 border-green-500">
						Verified Feedback
					</Badge>
				)}
			</div>
		</CardFooter>
	);
};
