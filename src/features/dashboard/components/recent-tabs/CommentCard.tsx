import { CATEGORIES } from "@features/submit/constants/project-creation.constant";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
} from "@shared/components/ui";
import type { ICommentResponse } from "@shared/interfaces";
import { timeAgo } from "@shared/lib/time-ago";

interface Props {
	comment: ICommentResponse;
	projectName: string;
}
export const CommentCard = ({ comment, projectName }: Props) => {
	return (
		<div className="flex items-start gap-4">
			<Avatar className="h-10 w-10">
				<AvatarImage
					src={comment.author.image || ""}
					alt={comment.author.name}
				/>
				<AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
			</Avatar>
			<div className="flex-1 space-y-1">
				<div className="flex items-center gap-2">
					<p className="font-medium">{comment.author.name}</p>
					<Badge variant="outline" className="ml-auto">
						{CATEGORIES.find((c) => c.value == comment.category)?.label ||
							comment.category}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">on {projectName}</p>
				<p className="text-sm">{comment.content}</p>
				<div className="flex items-center gap-4 pt-1">
					<p className="text-xs text-muted-foreground">
						{timeAgo(comment.created_at)}
					</p>
				</div>
			</div>
		</div>
	);
};
