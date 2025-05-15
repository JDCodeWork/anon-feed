import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@shared/components/ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { generatePagination } from "../lib/generate-pagination";

interface Props {
	totalPages: number;
}
export const ProjectsPagination = ({ totalPages }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);

	const currenPage = Number(searchParams.get("page") ?? 1);

	const updatePagination = (pageNumber: number) => {
		if (pageNumber == 0) return setSearchParams({ page: "1" });

		if (pageNumber < 0 || pageNumber > totalPages)
			return setSearchParams({ page: "1" });

		setSearchParams({ page: pageNumber.toString() });
	};

	useEffect(() => {
		setPaginationNumbers(generatePagination(currenPage, totalPages));
	}, [currenPage, totalPages]);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => updatePagination(currenPage - 1)}
						disabled={totalPages == 1}
					/>
				</PaginationItem>
				{paginationNumbers.map((page) => (
					<PaginationItem key={page}>
						{page === -1 ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								onClick={() => updatePagination(page)}
								isActive={page == currenPage}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						onClick={() => updatePagination(currenPage + 1)}
						disabled={totalPages == 1}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
