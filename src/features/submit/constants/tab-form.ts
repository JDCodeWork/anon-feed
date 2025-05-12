import type { ProjectFormInputs } from "../interfaces/project-feed-info";

export const validTabs = ["details", "media", "feedback"] as const;

export const initialTabFormValues: ProjectFormInputs = {
	category: "",
	description: "",
	experienceLevel: "",
	feedbackArea: "",
	githubRepo: "",
	image: "",
	liveDemo: "",
	screenshots: [],
	specificQuestions: "",
	tags: [""],
	title: "",
};
