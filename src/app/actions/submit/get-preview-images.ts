import { getAuth } from "@clerk/react-router/ssr.server";
import { createSupabase } from "@shared/lib/supabase";
import { redirect } from "react-router";
import type { Route } from "./+types/get-preview-images";

// Loader to get preview images for a project submission
export const loader = async (args: Route.ActionArgs) => {
	const { userId, getToken } = await getAuth(args);
	if (!userId) return redirect("/");

	const projectId = `temp-${userId}`;

	const supabase = createSupabase(await getToken());
	const { data, error } = await supabase.storage
		.from("screenshots")
		.list(`${userId}/${projectId}`, { limit: 5 });

	if (error) {
		return {
			errors: {
				screenshots: "Failed to retrieve screenshots.",
			},
		};
	}

	// Map the file data to the expected screenshot format
	const screenshots =
		data?.map((file) => ({
			url: supabase.storage
				.from("screenshots")
				.getPublicUrl(`${userId}/${projectId}/${file.name}`).data.publicUrl,
			name: file.name,
		})) || [];

	return {
		screenshots,
	};
};
