import type { ProjectResponse } from "@features/projects/services/get-paginated-projects";
/* import { supabase } from "@shared/lib/supabase"; */

type ReturnType = {
	ok: boolean;
	data?: ProjectResponse;
	error?: any;
};
export const getProject = async (id: string): Promise<ReturnType> => {
	const { data, error } = await supabase
		.from("projects")
		.select(`
    *,
    comments (
      id,
      content,
      created_at,
      userId,
      users (
        id,
        name,
        image
      )
    )
		`)
		.eq("id", id);

	if (data) {
		const user = await cler;

		return {
			ok: true,
			data,
		};
	}

	return {
		ok: false,
		error,
	};
};
