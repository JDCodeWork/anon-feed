import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@shared/components/ui";
import { useFilter } from "../hooks/useFilter";
import { useProjectData } from "../hooks/useProjectData";
import { ProjectCard } from "./ProjectCard";

interface Props {
	perPage: number;
}
const ProjectsList = ({ perPage }: Props) => {
	const { handleFilterTab } = useFilter();
	const { projects } = useProjectData({ perPage });

	return (
		<Tabs defaultValue="all" className="w-full" {...handleFilterTab()}>
			<TabsList className="mb-4">
				<TabsTrigger value="all">All Projects</TabsTrigger>
				<TabsTrigger value="featured">Featured</TabsTrigger>
				<TabsTrigger value="new">New</TabsTrigger>
			</TabsList>
			<TabsContent value="all" className="mt-0">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
					{projects.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="featured" className="mt-0">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
					{projects
						.filter((p) => p.featured)
						.map((project) => (
							<ProjectCard project={project} key={project.id} />
						))}
				</div>
			</TabsContent>
			<TabsContent value="new" className="mt-0">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{projects
						.filter((p) => !p.featured)
						.map((project) => (
							<ProjectCard project={project} key={project.id} />
						))}
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default ProjectsList;
