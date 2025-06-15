import type { IProjectResponse } from "@features/projects";
import { createSupabase } from "@shared/lib/supabase";

type Args = {
	id: string;
};
export const getProject = async ({ id }: Args) => {
	const supabase = createSupabase(null);

	const { data, error } = await supabase
		.from("projects")
		.select(`
    *,
		users (*)
		`)
		.eq("id", id)
		.single();

	if (error)
		return {
			ok: false,
			error: error.message,
		};

	const { users, ...projectDetails } = data!;

	const formattedProject = {
		...projectDetails,
		author: users,
	};

	return {
		ok: true,
		data: formattedProject,
	};
};
