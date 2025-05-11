import type { Project } from "@features/projects/interfaces/project.interface";

export interface ProjectFeedInfo extends Project {
	tags: string[];
	screenshots: string[];
	githubRepo: string;
	liveDemo: string;
	feedbackArea: string;
	specificQuestions: string;
	experienceLevel: string;
}
