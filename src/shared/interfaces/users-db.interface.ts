export type ISupabaseUser = {
	id: string;
	name: string;
	image: string | null;
};

export type UserWithToken = ISupabaseUser & { token: string | null };
