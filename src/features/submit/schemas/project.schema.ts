import type { IProject } from "@features/projects";
import z from "zod";

const githubRepoRegex = {
	user: /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/,
	repo: /^[a-zA-Z0-9._-]{1,100}$/,
};
const validateGithubRepo = (val: string) => {
	const parts = val.split("/");
	if (parts.length !== 2) return false;
	const [user, repo] = parts;
	return githubRepoRegex.user.test(user) && githubRepoRegex.repo.test(repo);
};

export const ScreenshotsSchema = z
	.string()
	.transform((val) =>
		val
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean),
	)
	.refine((arr) => Array.isArray(arr) && arr.length >= 1 && arr.length <= 5, {
		message: "You must provide between 1 and 5 screenshots.",
	});

const liveDemoSchema = z.preprocess((val) => {
	if (typeof val === "string") {
		return val.startsWith("http://") || val.startsWith("https://")
			? val
			: `https://${val}`;
	}
	return val;
}, z.string().url()) as z.ZodEffects<z.ZodString, string>;

export const ProjectDetailSchema = z.object({
	title: z.string().min(6).max(36),
	category: z.string().nonempty({ message: "You must select a category" }),
	description: z.string().min(24).max(480),
	tags: z.array(z.string().nonempty()).min(1).max(5),
});

export const ProjectMediaSchema = z.object({
	screenshots: ScreenshotsSchema,
	githubRepo: z.string().min(1).refine(validateGithubRepo, {
		message: "The format '<user>/<repository>' is not met.",
	}),
	liveDemo: liveDemoSchema,
});

export const ProjectFeedbackSchema = z.object({
	feedbackArea: z.enum([
		"ui-ux",
		"code-quality",
		"performance",
		"architecture",
		"accessibility",
		"security",
	]),
	specificQuestions: z.string().min(24).max(480),
	experienceLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
});

export const ProjectSchema = z
	.object({
		featured: z.boolean(),
	})
	.merge(ProjectDetailSchema)
	.merge(ProjectMediaSchema)
	.merge(ProjectFeedbackSchema);

export type FormErrorsType = Partial<Record<keyof IProject, string>>;
