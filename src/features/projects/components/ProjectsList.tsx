import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@shared/components/ui";
import { PROJECTS } from "@shared/data/projects.data";
import { useSearchParams } from "react-router";
import type { IProjectDb } from "../interfaces/project.interface";
import { ProjectCard } from "./ProjectCard";

function getDataForPage<D>(fullData: D[], page: number, limit: number): D[] {
	const start = (page - 1) * limit;
	return fullData.slice(start, start + limit);
}

export const ProjectsList = () => {
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1", 10);

	const itemsPerPage = 6;

	const projects = getDataForPage<IProjectDb>(PROJECTS, page, itemsPerPage);

	return (
		<Tabs defaultValue="all" className="w-full">
			<TabsList className="mb-4">
				<TabsTrigger value="all">All Projects</TabsTrigger>
				<TabsTrigger value="featured">Featured</TabsTrigger>
				<TabsTrigger value="new">New</TabsTrigger>
			</TabsList>
			<TabsContent value="all" className="mt-0">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
					{projects.map((project) => (
						<ProjectCard project={project} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="featured" className="mt-0">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
					{projects
						.filter((p) => p.featured)
						.map((project) => (
							<ProjectCard project={project} />
						))}
				</div>
			</TabsContent>
			<TabsContent value="new" className="mt-0">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{projects
						.filter((p) => !p.featured)
						.map((project) => (
							<ProjectCard project={project} />
						))}
				</div>
			</TabsContent>
		</Tabs>
	);
};
