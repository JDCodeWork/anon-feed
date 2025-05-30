import type { IProjectResponse } from "@features/projects";
import { Tabs, TabsList, TabsTrigger } from "@shared/components/ui";
import { useState } from "react";
import { OverViewTab } from "./OverViewTab";
import { FeedbackTab } from "./feedback-tab/FeedbackTab";

interface Props {
	project: IProjectResponse;
}
const ProjectTabs = ({ project }: Props) => {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="feedback">Feedback</TabsTrigger>
			</TabsList>
			<OverViewTab project={project} />
			<FeedbackTab project={project} />
			{/*TODO <ActivityTab /> */}
		</Tabs>
	);
};

export default ProjectTabs;
