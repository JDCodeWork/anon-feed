import type { IProjectResponse } from "@features/projects";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	TabsContent,
} from "@shared/components/ui";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router";

export const ProjectsTab = () => {
	const projects: IProjectResponse[] = [];

	return (
		<TabsContent value="projects" className="space-y-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<Card key={project.id} className="overflow-hidden">
						<CardHeader className="p-4">
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="line-clamp-1">
										{project.title}
									</CardTitle>
									<CardDescription className="line-clamp-1">
										{project.category}
									</CardDescription>
								</div>
								<Badge
									variant={project.featured ? "default" : "outline"}
									className="ml-2"
								>
									{project.featured ? "Featured" : "New"}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="p-4 pt-0">
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
									<span>{0}</span>
								</div>
							</div>
						</CardContent>
						<div className="p-4 pt-0 flex gap-2">
							<Link to={`/dashboard/projects/${project.id}`} className="flex-1">
								<Button variant="outline" className="w-full">
									Manage
								</Button>
							</Link>
							<Link to={`/projects/${project.id}`} className="flex-1">
								<Button variant="secondary" className="w-full">
									View
								</Button>
							</Link>
						</div>
					</Card>
				))}
			</div>
			<div className="flex justify-center">
				<Link to="/dashboard/projects">
					<Button variant="outline">View All Projects</Button>
				</Link>
			</div>
		</TabsContent>
	);
};
