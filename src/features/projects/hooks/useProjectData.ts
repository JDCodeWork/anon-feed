import { useEffect, useState } from "react";
import type { IProjectDb } from "../interfaces/project.interface";
import { getDataPaginated } from "../lib/get-data-paginated";
import { useFilter } from "./useFilter";
import { usePagination } from "./usePagination";

export const useProjectData = ({ perPage }: { perPage: number }) => {
	const { filter } = useFilter();
	const [projects, setProjects] = useState<IProjectDb[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);

	const { currentPage } = usePagination({ totalPages });

	useEffect(() => {
		const { data, pages } = getDataPaginated({
			filter,
			page: currentPage,
			limit: perPage,
		});
		setProjects(data);
		setTotalPages(pages);
	}, [filter, currentPage]);

	return {
		projects,
		totalPages,
	};
};
