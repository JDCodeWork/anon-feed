import { FeaturedProjects } from "@features/home/components/FeaturedProjects";
import { HeroSection } from "@features/home/components/HeroSection";
import { getPaginatedProjects } from "@features/projects";
import { useEffect, useState } from "react";
import {
	Outlet,
	data,
	isRouteErrorResponse,
	useRouteError,
} from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/home";

export async function loader(args: Route.LoaderArgs) {
	try {
		throw new Error("This is a test error to demonstrate error handling in the loader function.");
		const { projects } = await getPaginatedProjects({
			filter: "featured",
			page: 1,
			limit: 6,
		});

		return { projects }
	} catch (error) {
		return { error: "Failed to load featured projects" }
	}
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
	if( loaderData.error ) {
		toast.error(loaderData.error);
	}

	return (
		<>
			<HeroSection />
			<FeaturedProjects projects={loaderData.projects || []} />
		</>
	);
}

