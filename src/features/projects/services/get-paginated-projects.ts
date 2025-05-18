import type { ISupabaseProject } from "@shared/interfaces/projects-db.interface";
import type { ISupabaseUser } from "@shared/interfaces/users-db.interface";
import { supabase } from "@shared/lib/supabase";
import type { FilterType } from "../hooks/useFilter";

export interface ProjectResponse extends ISupabaseProject {
	author: ISupabaseUser;
}

type ReturnType = {
	ok: boolean;
	data?: ProjectResponse[];
	count?: number | null;
	error?: any;
};

interface Args {
	filter?: FilterType;
	limit: number;
	page: number;
}
export const getPaginatedProjects = async ({
	filter = "all",
	limit,
	page,
}: Args): Promise<ReturnType> => {
	const offset = (page - 1) * limit;

	const query = supabase.from("projects").select(
		`
		*,
		users (
			id,
			name,
			image
		)
		`,
		{ count: "exact" },
	);

	if (filter == "featured") query.eq("featured", true);
	else if (filter == "new") query.eq("featured", false);

	const {
		count: dataCount,
		data,
		error,
	} = await query.range(offset, offset + limit);

	const totalPages = Math.ceil(dataCount! / limit);

	let formattedData: ProjectResponse[] = [];

	if (data) {
		formattedData = data.map((d) => {
			const { users, ...rest } = d;
			return {
				...rest,
				author: users,
			};
		});
	}

	if (error)
		return {
			ok: false,
			error,
		};

	return {
		ok: true,
		data: formattedData,
		count: totalPages,
	};
};

getPaginatedProjects({ limit: 9, page: 1, filter: "all" });
