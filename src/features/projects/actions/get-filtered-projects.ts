import { createSupabase } from "@shared/lib/supabase";

type Args = {
	filter?: string;
	limit: number;
	page: number;
};
export const getFilteredProjects = async ({ filter, limit, page }: Args) => {
	const offset = (page - 1) * limit;

	const supabase = createSupabase(null);
	const query = supabase.from("projects").select(
		`
    *,
    users (*)
    `,
	);

	if (filter === "new") query.eq("featured", false);
	else if (filter === "featured") query.eq("featured", true);
	// TODO: refactor this to use a more generic filter system

	const { data, error } = await query.range(offset, offset + limit - 1);

	if (!data && error)
		return {
			ok: false,
			error: error.message,
		};

	const formattedData = data.map((d) => {
		const { users, ...rest } = d;
		return {
			...rest,
			author: users,
		};
	});

	return {
		ok: true,
		data: formattedData,
	};
};
