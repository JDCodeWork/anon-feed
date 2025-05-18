export interface ISupabaseCreateProject {
	title: string;
	category: string;
	description: string;
	githubRepo: string;
	liveDemo: string;
	tags: string[];
	feedbackArea: string;
	specificQuestions: string;
	experienceLevel: string;
	screenshots: string[];
	user_id: string;
}

export interface ISupabaseProject extends ISupabaseCreateProject {
	id: string;
	created_at: string;
	featured: boolean;
	needsFeedback: boolean;
}
