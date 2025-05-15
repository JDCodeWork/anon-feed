import type { IProjectDb } from "@features/projects";
import { Badge, Button } from "@shared/components/ui";
import { Heart, Share2 } from "lucide-react";

interface Props {
	project: IProjectDb;
}
export const ProjectHead = ({ project }: Props) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-3xl font-bold">{project.title}</h1>
					{project.featured && <Badge>Featured</Badge>}
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="icon">
						<Heart className="h-4 w-4" />
						<span className="sr-only">Save</span>
					</Button>
					<Button variant="outline" size="icon">
						<Share2 className="h-4 w-4" />
						<span className="sr-only">Share</span>
					</Button>
				</div>
			</div>
			<p className="text-muted-foreground">{project.description}</p>
			<div className="flex flex-wrap gap-2">
				<Badge variant="outline">{project.category}</Badge>
				<Badge variant="outline">React</Badge>
				<Badge variant="outline">TypeScript</Badge>
				<Badge variant="outline">Tailwind CSS</Badge>
			</div>
		</div>
	);
};
