import { FeaturedProjects } from "@features/home/components/FeaturedProjects";
import { HeroSection } from "@features/home/components/HeroSection";
import { getFilteredProjects } from "@features/projects/actions/get-filtered-projects";
import { toast } from "sonner";
import type { Route } from "./+types/home";

export const meta = () => [
	{
		title: "AnonFeed",
	},
	{
		name: "description",
		content: "Discover and share innovative projects on AnonFeed.",
	},
];

export async function loader(args: Route.LoaderArgs) {
	try {
		const { data: projects } = await getFilteredProjects({
			limit: 6,
			filter: "featured",
			page: 1,
		});

		return { projects };
	} catch (error) {
		console.log("HomePage Loader Error: ", error);

		return { error: "Failed to load featured projects" };
	}
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
	if (loaderData.error) {
		toast.error(loaderData.error);
	}

	return (
		<>
			<HeroSection />
			<FeaturedProjects projects={loaderData.projects || []} />
		</>
	);
}
