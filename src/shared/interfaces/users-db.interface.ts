export type ISupabaseUser = {
	id: string;
	name: string;
	image: string | null;
	created_at: string;
};

export type UserWithToken = ISupabaseUser & { token: string | null };
