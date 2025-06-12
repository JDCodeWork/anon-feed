import { createSupabase } from "@shared/lib/supabase";
import type { FilterType } from "../hooks/useFilter";

export const getTotalPages = async ({
	filter = "all",
	limit,
}: {
	filter?: string;
	limit: number;
}) => {
	const supabase = createSupabase(null);
	const query = supabase.from("projects").select("*", { count: "exact" });

	const filterMap: Record<string, { column: string; value: any } | undefined> =
		{
			featured: { column: "featured", value: true }, // TODO delete this filter
			new: { column: "featured", value: false },
			all: undefined,
		};

	const filterConfig = filterMap[filter];
	if (filterConfig) {
		query.eq(filterConfig.column, filterConfig.value);
	}

	const { count, error } = await query;

	if (error)
		return {
			ok: false,
			error: error.message,
		};

	const totalPages = Math.ceil(count! / limit);
	return {
		ok: true,
		totalPages,
	};
};
