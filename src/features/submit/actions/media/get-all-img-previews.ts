import { createSupabase } from "@shared/lib/supabase";

interface Args {
	userId: string;
	token: string;
}
export const getAllImgPreviews = async ({ token, userId }: Args) => {
	const projectId = `temp-${userId}`;

	const supabase = createSupabase(token);
	const { data, error } = await supabase.storage
		.from("screenshots")
		.list(`${userId}/${projectId}`, { limit: 5 });

	if (error) {
		return {
			error: "Failed to retrieve screenshots.",
		};
	}

	// Map the file data to the expected screenshot format
	const screenshots =
		data
			?.sort((a, b) =>
				b.created_at && a.created_at
					? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
					: 0,
			)
			.map((file) => ({
				url: supabase.storage
					.from("screenshots")
					.getPublicUrl(`${userId}/${projectId}/${file.name}`).data.publicUrl,
				name: file.name,
			})) || [];

	return {
		screenshots,
	};
};
