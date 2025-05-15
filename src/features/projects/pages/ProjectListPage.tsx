import { ProjectsList } from "../components/ProjectsList";
import { ProjectsPagination } from "../components/ProjectsPagination";
import { SearchBar } from "../components/SearchBar";
import { useProjectData } from "../hooks/useProjectData";

const perPage = 6;

export const ProjectListPage = () => {
	const { totalPages } = useProjectData({ perPage });

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

				<ProjectsList perPage={perPage} />

				<ProjectsPagination totalPages={totalPages} />
			</div>
		</div>
	);
};
