import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { PROJECTS } from "@shared/data/projects.data";
import { Link } from "react-router";

const projects = PROJECTS.slice(0, 3);

export const SimilarProjects = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Similar Projects</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{projects.slice(0, 3).map((p) => (
						<Link
							to={`/projects/${p.id}`}
							key={p.id}
							className="flex gap-3 items-start"
						>
							<div className="w-16 h-12 rounded bg-muted overflow-hidden">
								<img
									src={"/placeholder.svg"}
									alt={p.title}
									className="object-cover w-full h-full"
								/>
							</div>
							<div className="flex-1">
								<h4 className="text-sm font-medium line-clamp-1">{p.title}</h4>
								<p className="text-xs text-muted-foreground line-clamp-1">
									{p.category}
								</p>
							</div>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
