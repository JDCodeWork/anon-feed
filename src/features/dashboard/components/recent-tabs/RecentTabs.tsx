import { Tabs, TabsList, TabsTrigger } from "@shared/components/ui";
import { CommentsTab } from "./CommentsTab";
import { ProjectsTab } from "./ProjectsTab";

export const RecentTabs = () => {
	return (
		<Tabs defaultValue="projects" className="space-y-4">
			<TabsList>
				<TabsTrigger value="projects">Recent Projects</TabsTrigger>
				<TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
			</TabsList>
			<ProjectsTab />
			<CommentsTab />
		</Tabs>
	);
};
