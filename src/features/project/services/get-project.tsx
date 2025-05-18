import type { ProjectResponse } from "@features/projects/services/get-paginated-projects";
import { supabase } from "@shared/lib/supabase";

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
    users (
      id,
      name,
      image 
    )
    `)
		.eq("id", id);

	let formattedData: ProjectResponse;

	if (data && data.length > 0) {
		formattedData = {
			...data[0],
			author: data[0].users,
		};

		return {
			ok: true,
			data: formattedData,
		};
	}

	return {
		ok: false,
		error,
	};
};
