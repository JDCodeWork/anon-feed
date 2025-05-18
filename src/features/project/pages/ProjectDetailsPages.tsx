import type { ProjectResponse } from "@features/projects/services/get-paginated-projects";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProjectHead } from "../components/project-head/ProjectHead";
import { ProjectInfo } from "../components/project-info/ProjectInfo";
import { ProjectTabs } from "../components/project-tabs/ProjectTabs";
import { getProject } from "../services/get-project";

export const ProjectDetailPage = () => {
	const { id = "" } = useParams();
	const [project, setProject] = useState<ProjectResponse | null>();

	const navigate = useNavigate();

	const fetchData = async () => {
		const { ok, data } = await getProject(id);

		if (ok) {
			setProject(data!);
		} else {
			navigate("/projects", { replace: true });
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	if (project)
		return (
			<div className="max-w-5xl w-full mx-auto mt-8 mb-16">
				<div className="grid gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div className="flex flex-col gap-6">
							<ProjectHead project={project} />
							<div className="aspect-video overflow-hidden rounded-lg bg-muted">
								<img
									src={project.screenshots[0] || "/placeholder.svg"}
									alt={project.title}
									className="object-cover w-full h-full"
								/>
							</div>

							<ProjectTabs project={project} />
						</div>
					</div>

					<ProjectInfo project={project} />
				</div>
			</div>
		);
};
