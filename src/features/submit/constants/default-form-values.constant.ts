import type { IPartialProject } from "@features/projects";

export const defaultFormValues: IPartialProject = {
	category: "",
	description: "",
	featured: false,
	githubRepo: "",
	experienceLevel: undefined,
	feedbackArea: undefined,
	liveDemo: "",
	screenshots: [],
	specificQuestions: "",
	tags: [],
	title: "",
} as const;
