import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@shared/components/ui";
import { usePagination } from "../hooks/usePagination";

interface Props {
	totalPages: number;
}
export const ProjectsPagination = ({ totalPages }: Props) => {
	const { updatePagination, currentPage, paginationNumbers } = usePagination({
		totalPages,
	});

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => updatePagination(currentPage - 1)}
						disabled={currentPage - 1 < 1}
					/>
				</PaginationItem>
				{paginationNumbers.map((page) => (
					<PaginationItem key={page}>
						{page === -1 ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								onClick={() => updatePagination(page)}
								isActive={page == currentPage}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						onClick={() => updatePagination(currentPage + 1)}
						disabled={currentPage + 1 > totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
