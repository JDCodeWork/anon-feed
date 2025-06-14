import { getTotalPages } from "@features/projects/actions/get-total-pages";
import { ProjectsPagination } from "@features/projects/components/ProjectsPagination";
import { type TabElement, TabMenu } from "@shared/components/TabMenu";
import { Button } from "@shared/components/ui";
import { ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { Outlet, redirect, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/projects";

const filters: TabElement[] = [
	{ label: "All", value: "all", to: "/projects/all" },
	{ label: "New", value: "new", to: "/projects/new" },
	/*   { label: "Popular", value: "popular", to: "/projects/popular" },
		{ label: "Archived", value: "archived", to: "/projects/archived" }, */
];

export function meta() {
	return [
		{
			title: "Projects | AnonFeed",
		},
		{
			name: "description",
			content: "Browse and discover developer projects seeking feedback",
		},
	];
}

export async function loader(args: Route.LoaderArgs) {
	const { filter } = args.params;

	if (!filter || !filters.some((tab) => tab.value === filter)) {
		return redirect("/projects/all");
	}

	const { totalPages = 1 } = await getTotalPages({
		limit: 6,
		filter,
	});

	const url = new URL(args.request.url);
	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const currentPage = page > totalPages ? totalPages : page;
	if (currentPage !== page) {
		url.searchParams.set("page", currentPage.toString());
		redirect(url.toString());
	}

	return {
		activeTab: filter,
		totalPages,
		currentPage,
		page,
	};
}

export default function ProjectsLayout({ loaderData }: Route.ComponentProps) {
	const { activeTab, totalPages, currentPage, page } = loaderData;
	const navigate = useNavigate();
	const navigation = useNavigation();

	const isNavigating =
		navigation.state === "loading" &&
		!navigation.location.pathname.includes("/projects");

	useEffect(() => {
		if (page !== currentPage) {
			navigate(`/projects/${activeTab}?page=${currentPage}`);
		}
	}, [page, currentPage]);

	const scrollToTop = () => {
		window.scrollTo({ top: 100, behavior: "smooth" });
	};

	const onPageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		navigate(`/projects/${activeTab}?page=${page}`);
	};

	return isNavigating ? (
		<div className="flex flex-col justify-center items-center h-96 gap-4">
			<span className="text-lg text-muted-foreground flex items-center gap-2">
				<svg
					className="animate-spin h-5 w-5 text-muted-foreground"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					></path>
				</svg>
				Navigating to another section...
			</span>
			<p className="text-sm text-muted-foreground">
				You are being redirected outside of Projects. Please wait.
			</p>
		</div>
	) : (
		<div className="max-w-5xl w-full mx-auto my-8">
			<div className="flex flex-col gap-6 relative">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold">Projects</h1>
					<p className="text-muted-foreground">
						Browse and discover developer projects seeking feedback
					</p>
				</div>

				{/*TODO: <SearchBar /> */}
				<main>
					<TabMenu tabs={filters} activeTab={activeTab} />
					<div className="mt-8 grid grid-cols-3 gap-4">
						<Outlet />
					</div>
				</main>

				<ProjectsPagination
					totalPages={totalPages}
					currentPage={currentPage}
					onPageChange={onPageChange}
				/>

				<Button
					size="icon"
					onClick={scrollToTop}
					className="absolute bottom-0 right-0"
				>
					<ArrowUp />
				</Button>
			</div>
		</div>
	);
}
