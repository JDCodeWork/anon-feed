import type { IProjectDb } from "@features/projects";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@shared/components/ui";
import { ExternalLink, Github, Globe } from "lucide-react";
import { useState } from "react";
import { FeedbackTab } from "./feedback-tab/FeedbackTab";

interface Props {
	project: IProjectDb;
}
export const ProjectTabs = ({ project }: Props) => {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="feedback">
					Feedback ({project.commentCount})
				</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="mt-6">
				<div className="flex flex-col gap-6">
					<div>
						<h2 className="text-xl font-semibold mb-4">Project Description</h2>
						<div className="prose max-w-none">
							<p>
								{project.title} is a comprehensive solution designed to help
								developers streamline their workflow and improve productivity.
								This project was built using modern technologies and best
								practices to ensure scalability, performance, and
								maintainability.
							</p>
							<h3>Key Features</h3>
							<ul>
								<li>Intuitive user interface with responsive design</li>
								<li>Real-time collaboration capabilities</li>
								<li>Advanced search and filtering options</li>
								<li>Customizable workflows and templates</li>
								<li>Comprehensive analytics and reporting</li>
							</ul>
							<h3>Technical Stack</h3>
							<p>
								The application is built using React for the frontend, with
								TypeScript for type safety. The backend is powered by Node.js
								and Express, with a PostgreSQL database for data storage. The
								entire application is containerized using Docker and deployed on
								AWS.
							</p>
							<h3>Areas Seeking Feedback</h3>
							<p>
								I'm particularly interested in feedback on the following
								aspects:
							</p>
							<ul>
								<li>User experience and interface design</li>
								<li>Performance optimization strategies</li>
								<li>Code architecture and organization</li>
								<li>Accessibility compliance</li>
								<li>Security best practices</li>
							</ul>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-semibold">Project Links</h2>
						<div className="grid gap-2">
							<a
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm text-primary hover:underline"
							>
								<Globe className="h-4 w-4" />
								<span>Live Demo</span>
								<ExternalLink className="h-3 w-3" />
							</a>
							<a
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm text-primary hover:underline"
							>
								<Github className="h-4 w-4" />
								<span>GitHub Repository</span>
								<ExternalLink className="h-3 w-3" />
							</a>
						</div>
					</div>
				</div>
			</TabsContent>
			<FeedbackTab project={project} />
			{/*TODO <ActivityTab /> */}
		</Tabs>
	);
};
