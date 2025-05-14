import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/components/ui";
import { Filter, Search } from "lucide-react";

export const SearchBar = () => {
	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div className="relative w-full md:w-96">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search projects..."
					className="w-full pl-8"
				/>
			</div>
			<div className="flex flex-col gap-2 sm:flex-row">
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<Select defaultValue="all">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="web">Web Application</SelectItem>
							<SelectItem value="mobile">Mobile App</SelectItem>
							<SelectItem value="desktop">Desktop App</SelectItem>
							<SelectItem value="library">Library/Package</SelectItem>
							<SelectItem value="tool">Developer Tool</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Select defaultValue="recent">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="recent">Most Recent</SelectItem>
						<SelectItem value="popular">Most Popular</SelectItem>
						<SelectItem value="rating">Highest Rated</SelectItem>
						<SelectItem value="comments">Most Comments</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};
