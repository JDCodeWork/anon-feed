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

export const ScreenshotSchema = z.object({
	id: z.string(),
	url: z.string(),
});

const liveDemoSchema = z.preprocess((val) => {
	if (typeof val === "string") {
		return val.startsWith("http://") || val.startsWith("https://")
			? val
			: `https://${val}`;
	}
	return val;
}, z.string().url()) as z.ZodEffects<z.ZodString, string>;

export const ProjectSchema = z.object({
	title: z.string().min(6).max(36),
	category: z.string().nonempty({ message: "You must select a category" }),
	description: z.string().min(24).max(480),
	featured: z.boolean(),
	tags: z.array(z.string().nonempty()).min(1).max(5),
	screenshots: z.array(ScreenshotSchema).min(1).max(5),
	githubRepo: z.string().refine(validateGithubRepo, {
		message: "The format '<user>/<repository>' is not met.",
	}),
	liveDemo: liveDemoSchema,
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
