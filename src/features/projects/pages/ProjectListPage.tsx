import { PROJECTS } from "@shared/data/projects.data";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ProjectsList } from "../components/ProjectsList";
import { ProjectsPagination } from "../components/ProjectsPagination";
import { SearchBar } from "../components/SearchBar";

export const ProjectListPage = () => {
	const [searchParams] = useSearchParams();
	const [filter, setFilter] = useState("all");

	const [totalPages, setTotalPages] = useState(1);

	const getTotalPages = () => PROJECTS.length % 6;

	useEffect(() => {
		if (searchParams.get("filter") ?? "all" !== filter) {
			setFilter(searchParams.get("filter")!);
		}
	}, [searchParams]);

	useEffect(() => {
		setTotalPages(getTotalPages());
	}, [filter]);

	useEffect(() => {
		console.log("totalPages", totalPages);
	}, [totalPages]);

	return (
		<div className="max-w-5xl w-full mx-auto my-8">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold">Projects</h1>
					<p className="text-muted-foreground">
						Browse and discover developer projects seeking feedback
					</p>
				</div>

				<SearchBar />

				<ProjectsList />

				<ProjectsPagination totalPages={totalPages} />
			</div>
		</div>
	);
};
