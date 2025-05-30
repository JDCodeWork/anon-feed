import { ProjectsPagination } from "@features/projects/components/ProjectsPagination";
import { useProjectData } from "@features/projects/hooks/useProjectData";
import { Button } from "@shared/components/ui";
import { ArrowUp } from "lucide-react";
import { lazy, useEffect } from "react";

const ProjectsList = lazy(
	() => import("@features/projects/components/ProjectsList"),
);
const perPage = 6;

const ProjectsPage = () => {
	const {
		data: { totalPages },
	} = useProjectData({ perPage });

	useEffect(() => {
		document.title = "Projects | AnonFeed";
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 100, behavior: "smooth" });
	};

	return (
		<div className="max-w-5xl w-full mx-auto my-8">
			<div className="flex flex-col gap-6 relative">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold">Projects</h1>
					<p className="text-muted-foreground">
						Browse and discover developer projects seeking feedback
					</p>
				</div>

				{/*TODO: <SearchBar /> */}

				<ProjectsList perPage={perPage} />

				<ProjectsPagination totalPages={totalPages} />
				<Button
					size="icon"
					onClick={scrollToTop}
					className="absolute bottom-0 right-0"
				>
					<ArrowUp />
				</Button>
			</div>
		</div>
	);
};

export default ProjectsPage;
