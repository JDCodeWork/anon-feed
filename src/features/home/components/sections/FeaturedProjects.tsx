import { Button } from "@components/ui/button";
import { featuredProjects } from "@features/home/data/featured-projects";
import { Link } from "react-router";
import { ProjectCard } from "../ProjectCard";

export const FeaturedProjects = () => (
	<section className="w-full py-12 md:py-24 lg:py-32">
		<div className="container px-4 md:px-6">
			<div className="flex flex-col items-center justify-center space-y-4 text-center">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
						Featured Projects
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground">
						Discover trending projects that are receiving quality feedback from
						our community.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
					{featuredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
				<Link to="/projects">
					<Button variant="outline">View All Projects</Button>
				</Link>
			</div>
		</div>
	</section>
);
