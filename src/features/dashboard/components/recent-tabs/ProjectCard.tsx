import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import type { ISupabaseProject } from "@shared/interfaces";
import { ArrowUpRight, Edit, MessageSquare, Trash2 } from "lucide-react";
import { Link } from "react-router";

interface Props {
	project: ISupabaseProject;
	commentsCount: Record<string, number>;
}
export const ProjectCard = ({ commentsCount, project }: Props) => {
	return (
		<Card key={project.id} className="overflow-hidden">
			<CardHeader>
				<div className="flex justify-between items-start">
					<div>
						<CardTitle className="text-2xl font-medium">
							{project.title}
						</CardTitle>
						<CardDescription className="">{project.category}</CardDescription>
					</div>
					<Badge
						variant={project.featured ? "default" : "outline"}
						className="ml-2"
					>
						{project.featured ? "Featured" : "New"}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="aspect-video overflow-hidden rounded-md bg-muted mb-4">
					<img
						src={project.screenshots[0] || ""}
						alt={project.title}
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="flex items-center justify-between w-full text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<MessageSquare className="h-4 w-4" />
						<span>{commentsCount[project.id] || 0}</span>
					</div>
				</div>
			</CardContent>
			<div className="p-4 pt-0 flex gap-4">
				<Button variant="outline" className="flex-1" disabled>
					<Edit />
				</Button>
				<Button
					variant="outline"
					className="flex-1 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
				>
					<Trash2 />
				</Button>
				<Link to={`/project/${project.id}`} className="flex-1">
					<Button variant="secondary" className="w-full">
						<ArrowUpRight />
					</Button>
				</Link>
			</div>
		</Card>
	);
};
