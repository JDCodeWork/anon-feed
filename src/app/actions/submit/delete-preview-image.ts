import { getAuth } from "@clerk/react-router/ssr.server";
import { createSupabase } from "@shared/lib/supabase";
import { redirect } from "react-router";
import type { Route } from "./+types/delete-preview-image";

// Action to delete a preview image
export const action = async (args: Route.ActionArgs) => {
	const { userId, getToken } = await getAuth(args);
	if (!userId) return redirect("/");

	const formData = await args.request.formData();

	const imageName = formData.get("imageName") as string;
	const projectId = `temp-${userId}`;

	const supabase = createSupabase(await getToken());
	const { error } = await supabase.storage
		.from("screenshots")
		.remove([`${userId}/${projectId}/${imageName}`]);

	if (error) {
		return {
			success: false,
			errors: {
				screenshots: `Failed to delete image: ${error.message}`,
			},
		};
	}

	return { success: true };
};
