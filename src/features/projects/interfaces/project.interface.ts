import type { z } from "zod";
import type { ProjectSchema } from "../schemas/project.schema";

import type { ISupabaseProject } from "@shared/interfaces/projects-db.interface";
import type { ISupabaseUser } from "@shared/interfaces/users-db.interface";

export type IProject = z.infer<typeof ProjectSchema>;

export interface IProjectResponse extends ISupabaseProject {
	author: ISupabaseUser;
}

export interface IPartialProject
	extends Omit<IProject, "experienceLevel" | "feedbackArea"> {
	experienceLevel: IProject["experienceLevel"] | undefined;
	feedbackArea: IProject["feedbackArea"] | undefined;
}
