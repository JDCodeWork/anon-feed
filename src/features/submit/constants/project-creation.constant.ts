import type { IPartialProject } from "@features/projects";

export const defaultFormValues: IPartialProject = {
	category: "",
	description: "",
	githubRepo: "",
	experienceLevel: undefined,
	feedbackArea: undefined,
	liveDemo: "",
	screenshots: "",
	specificQuestions: "",
	tags: "",
	title: "",
} as const;

type LabeledSelect = {
	value: string;
	label: string;
};

export const CATEGORIES: LabeledSelect[] = [
	{ value: "web", label: "Web Application" },
	{ value: "mobile", label: "Mobile App" },
	{ value: "desktop", label: "Desktop App" },
	{ value: "library", label: "Library/Package" },
	{ value: "tool", label: "Developer Tool" },
	{ value: "other", label: "Other" },
];

export const FEEDBACK_AREAS: LabeledSelect[] = [
	{ value: "ui-ux", label: "UI/UX Design" },
	{ value: "code-quality", label: "Code Quality" },
	{ value: "performance", label: "Performance" },
	{ value: "architecture", label: "Architecture" },
	{ value: "accessibility", label: "Accessibility" },
	{ value: "security", label: "Security" },
];

export const EXPERIENCE_LEVEL: LabeledSelect[] = [
	{ value: "beginner", label: "Beginner (0-1 years)" },
	{ value: "intermediate", label: "Intermediate (1-3 years)" },
	{ value: "advanced", label: "Advanced (3-5 years)" },
	{ value: "expert", label: "Expert (5+ years)" },
];

export const TAGS = [
	"React",
	"TypeScript",
	"Node.js",
	"Next.js",
	"Tailwind CSS",
	"GraphQL",
	"MongoDB",
	"PostgreSQL",
];
