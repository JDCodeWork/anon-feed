import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getPaginatedProjects, type ProjectResponse } from "../services/get-paginated-projects";
import { useFilter } from "./useFilter";
import { usePagination } from "./usePagination";

export const useProjectData = ({ perPage }: { perPage: number }) => {
	const { filter } = useFilter();
	const [projects, setProjects] = useState<ProjectResponse[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);

	const { currentPage } = usePagination({ totalPages });

	const fetchData = async () => {
		const { ok, count, data, error } = await getPaginatedProjects({
			filter,
			page: currentPage,
			limit: perPage - 1,
		});

		if (ok) {
			setProjects(data || []);
			setTotalPages(count ?? 0);
		}

		if (error) {
			toast.error("An error has occurred");
		}
	};

	useEffect(() => {
		fetchData();
	}, [filter, currentPage]);

	return {
		projects,
		totalPages,
	};
};
