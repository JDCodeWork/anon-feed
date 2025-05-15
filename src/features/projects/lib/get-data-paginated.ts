import { PROJECTS } from "@shared/data/projects.data";

type Filters = "all" | "featured" | "new";
const getDataByFilter = (filter: Filters) => {
	if (filter == "all") return PROJECTS;

	if (filter == "featured") return PROJECTS.filter((p) => p.featured);

	return PROJECTS.filter((p) => !p.featured);
};

interface Args {
	limit: number;
	filter: string;
	page: number;
}
export const getDataPaginated = ({ filter, limit, page }: Args) => {
	const start = (page - 1) * limit;
	const data = getDataByFilter(filter as Filters);

	const pages = Math.ceil(data.length / limit);
	const paginatedData = data.slice(start, start + limit);

	return {
		data: paginatedData,
		pages,
	};
};
