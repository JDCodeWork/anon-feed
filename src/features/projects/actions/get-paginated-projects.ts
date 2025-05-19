import { createSupabase } from "@shared/lib/supabase";
import type { FilterType } from "../hooks/useFilter";
import type { IProjectResponse } from "../interfaces/project.interface";

type ReturnType = {
	projects: IProjectResponse[];
	totalPages: number;
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

	const supabase = createSupabase(null);
	const query = supabase.from("projects").select(
		`
		*,
		users (*)
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

	let formattedData: IProjectResponse[] = [];

	if (!data && error) throw new Error(error.message);

	formattedData = data.map((d) => {
		const { users, ...rest } = d;
		return {
			...rest,
			author: users,
		};
	});

	return {
		totalPages,
		projects: formattedData,
	};
};
