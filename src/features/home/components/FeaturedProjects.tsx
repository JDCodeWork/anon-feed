import { Button } from "@components/ui/button";
import { ProjectCard } from "@features/projects/components/ProjectCard";
import { Link } from "react-router";

import { getPaginatedProjects } from "@features/projects";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const FeaturedProjects = () => {
	const { data: paginatedData, error } = useQuery({
		queryKey: ["projects", "featured"],
		queryFn: () =>
			getPaginatedProjects({
				filter: "featured",
				page: 1,
				limit: 3,
			}),
		staleTime: 1000 * 2,
	});

	if (error) toast.error("An error has occurred");

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="px-4 md:px-6 lg:px-8 xl:px-12">
				<div className="flex flex-col items-center justify-center space-y-8 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
							Featured Projects
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground">
							Discover trending projects that are receiving quality feedback
							from our community.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 w-full max-w-7xl">
						{paginatedData?.projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
					<Link to="/projects">
						<Button variant="outline" className="cursor-pointer">
							View All Projects
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
