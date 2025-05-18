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
	userId: string;
}

export interface ISupabaseProject extends ISupabaseCreateProject {
	id: string;
	created_at: string;
	featured: boolean;
	needsFeedback: boolean;
}

export interface ISupabaseUser {
	id: string;
	name: string;
	image: string;
}
