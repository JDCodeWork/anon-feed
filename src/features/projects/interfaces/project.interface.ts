import type { z } from "zod";
import type { ProjectSchema } from "../schemas/project.schema";

type Author = { name: string; verified: boolean };

export type IProject = z.infer<typeof ProjectSchema>;

export interface IProjectDb extends IProject {
	id: string;
	needsFeedback: boolean;
	author: Author;
	commentCount: number;
}

export interface IPartialProject
	extends Omit<IProject, "experienceLevel" | "feedbackArea"> {
	experienceLevel: IProject["experienceLevel"] | undefined;
	feedbackArea: IProject["feedbackArea"] | undefined;
}
