import type {
	BaseInfoProject,
	DatabaseProject,
} from "@features/projects/interfaces/project.interface";

type Image = {
	id: string;
	url: string;
};

export interface ProjectFormInputs extends BaseInfoProject {
	tags: string[];
	screenshots: Image[];
	githubRepo: string;
	liveDemo: string;
	feedbackArea: string;
	specificQuestions: string;
	experienceLevel: string;
}

export interface ProjectFeedInfo extends DatabaseProject {}
