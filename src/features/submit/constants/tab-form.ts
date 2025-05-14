import type { ProjectFeedType } from "../schemas/project-feed-schema";

export const validTabs = ["details", "media", "feedback"] as const;

export const defaultTabFormInputs: ProjectFeedType = {
	category: "",
	description: "",
	featured: false,
	experienceLevel: "",
	feedbackArea: "",
	githubRepo: "",
	liveDemo: "",
	screenshots: [],
	specificQuestions: "",
	tags: [],
	title: "",
};
