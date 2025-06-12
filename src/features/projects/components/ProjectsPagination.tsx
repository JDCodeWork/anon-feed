import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@shared/components/ui";
import { generatePagination } from "../lib/generate-pagination";

interface Props {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}
export const ProjectsPagination = ({
	totalPages,
	currentPage,
	onPageChange,
}: Props) => {
	const paginationNumbers = generatePagination(currentPage, totalPages);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage - 1 < 1}
					/>
				</PaginationItem>
				{paginationNumbers.map((page) => (
					<PaginationItem key={page}>
						{page === -1 ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								onClick={() => onPageChange(page)}
								isActive={page == currentPage}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage + 1 > totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
