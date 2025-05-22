import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getPaginatedProjects } from "../actions/get-paginated-projects";
import { useFilter } from "./useFilter";
import { usePagination } from "./usePagination";

const defaultData = {
	totalPages: 0,
	projects: [],
};

export const useProjectData = ({ perPage }: { perPage: number }) => {
	const { filter } = useFilter();

	const [totalPages, setTotalPages] = useState(0);

	const { currentPage } = usePagination({ totalPages });

	const {
		data: paginatedData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["projects", { page: currentPage, filter }],
		queryFn: () =>
			getPaginatedProjects({
				filter,
				page: currentPage,
				limit: perPage,
				orderBy: "created_at",
			}),
		staleTime: 1000 * 2,
	});

	if (!paginatedData && error) {
		toast.error("An error has occurred");
	}

	useEffect(() => {
		if (paginatedData?.totalPages != totalPages)
			setTotalPages(paginatedData?.totalPages || 0);
	}, [paginatedData]);

	return { data: paginatedData ?? defaultData, isLoading };
};
