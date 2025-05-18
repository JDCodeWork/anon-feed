import type { IProjectResponse } from "@features/projects";
import { createSupabase } from "@shared/lib/supabase";

type Args = {
	id: string;
};
export const getProject = async ({ id }: Args): Promise<IProjectResponse> => {
	const supabase = createSupabase(null);

	const { data, error } = await supabase
		.from("projects")
		.select(`
    *,
		users (*)
		`)
		.eq("id", id)
		.single();

	if (error) throw new Error(error.message);

	const { users, ...projectDetails } = data!;

	return {
		...projectDetails,
		author: users,
	};
};
