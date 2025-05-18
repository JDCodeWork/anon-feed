import type { ISupabaseUser } from "./users-db.interface";

export interface ISupabaseComment {
	id: number;
	content: string;
	category: string;
	user_id: string;
	project_id: string;
	created_at: string;
}

export type ICommentResponse = ISupabaseComment & { author: ISupabaseUser };
