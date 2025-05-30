import type { IProjectResponse } from "@features/projects";
import { CATEGORIES } from "@features/submit/constants/project-creation.constant";
import { Badge } from "@shared/components/ui";

interface Props {
	project: IProjectResponse;
}
export const ProjectHead = ({ project }: Props) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-3xl font-bold">{project.title}</h1>
					{project.featured && <Badge>Featured</Badge>}
				</div>
				{/* <SocialButtons /> */}
			</div>
			<p className="text-muted-foreground">{project.description}</p>
			<div className="grid grid-cols-2 flex-wrap gap-2">
				<Badge variant="outline">
					{CATEGORIES.find((c) => c.value == project.category)?.label ||
						project.category}
				</Badge>
			</div>
		</div>
	);
};
