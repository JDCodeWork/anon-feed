import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import type { ISupabaseProject } from "@shared/interfaces";
import { Globe, Heart, MessageSquare, Star } from "lucide-react";

type TodoProject = {
	rating: number;
	views: number;
	commentCount: number;
};

interface Props {
	project: ISupabaseProject & TodoProject;
}
export const ProjectStats = ({ project }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Project Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
						<Star className="h-5 w-5 text-yellow-500" />
						<span className="text-xl font-semibold">
							{project.rating.toFixed(1)}
						</span>
						<span className="text-xs text-muted-foreground">
							Average Rating
						</span>
					</div>
					<div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
						<MessageSquare className="h-5 w-5 text-primary" />
						<span className="text-xl font-semibold">
							{project.commentCount}
						</span>
						<span className="text-xs text-muted-foreground">Feedback</span>
					</div>
					<div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
						<Heart className="h-5 w-5 text-red-500" />
						<span className="text-xl font-semibold">42</span>
						<span className="text-xs text-muted-foreground">Saves</span>
					</div>
					<div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
						<Globe className="h-5 w-5 text-blue-500" />
						<span className="text-xl font-semibold">{project.views}</span>
						<span className="text-xs text-muted-foreground">Views</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
