import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { generatePagination } from "../lib/generate-pagination";

interface Args {
	totalPages: number;
}
export const usePagination = ({ totalPages }: Args) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [currentPage, setPage] = useState(1);
	const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);

	useEffect(() => {
		const searchPage = parseInt(searchParams.get("page") || "1", 10);

		if (searchPage != currentPage) setPage(searchPage);
	}, [searchParams]);

	const updatePagination = (pageNumber: number) => {
		if (pageNumber == 0)
			return setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set("page", "1");
				return newParams;
			});

		if (pageNumber < 0 || pageNumber > totalPages)
			return setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set("page", "1");
				return newParams;
			});

		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set("page", pageNumber.toString());
			return newParams;
		});
	};

	useEffect(() => {
		setPaginationNumbers(generatePagination(currentPage, totalPages));
	}, [currentPage, totalPages]);

	return {
		currentPage,
		updatePagination,
		paginationNumbers,
	};
};
