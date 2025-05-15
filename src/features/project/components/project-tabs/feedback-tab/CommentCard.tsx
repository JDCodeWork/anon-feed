import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@shared/components/ui";
import type { IComment } from "@shared/data/comments.data";
import { CheckCircle, ThumbsDown, ThumbsUp } from "lucide-react";

interface Props {
	comment: IComment;
}
export const CommentCard = ({ comment }: Props) => {
	return (
		<Card key={comment.id}>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={comment.author.avatar || "/placeholder.svg"}
								alt={comment.author.name}
							/>
							<AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<div className="flex items-center gap-1">
								<span className="font-medium">{comment.author.name}</span>
								{comment.author.verified && (
									<CheckCircle className="h-3 w-3 text-green-500" />
								)}
								{comment.author.expertise && (
									<Badge variant="secondary" className="text-xs px-1 py-0 h-5">
										{comment.author.expertise}
									</Badge>
								)}
							</div>
							<p className="text-xs text-muted-foreground">{comment.date}</p>
						</div>
					</div>
					<Badge variant="outline">{comment.category}</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm">{comment.content}</p>
			</CardContent>
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
						<Badge
							variant="outline"
							className="text-green-500 border-green-500"
						>
							Verified Feedback
						</Badge>
					)}
				</div>
			</CardFooter>
		</Card>
	);
};
