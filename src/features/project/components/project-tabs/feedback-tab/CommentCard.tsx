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

interface Props {
	comment: ICommentResponse;
}
export const CommentCard = ({ comment }: Props) => {
	return (
		<Card key={comment.id}>
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
								{comment.created_at}
							</p>
						</div>
					</div>
					<Badge variant="outline">{comment.category}</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm">{comment.content}</p>
			</CardContent>
			{/* <MessageButtons /> */}
		</Card>
	);
};
