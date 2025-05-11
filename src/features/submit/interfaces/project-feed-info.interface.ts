import type {
	BaseInfoProject,
	DatabaseProject,
} from "@features/projects/interfaces/project.interface";

export interface ProjectForm extends BaseInfoProject {
	tags: string[];
	screenshots: string[];
	githubRepo: string;
	liveDemo: string;
	feedbackArea: string;
	specificQuestions: string;
	experienceLevel: string;
}

export interface ProjectFeedInfo extends DatabaseProject {}
