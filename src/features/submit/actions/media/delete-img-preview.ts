import { createSupabase } from "@shared/lib/supabase";

interface Args {
	userId: string;
	imageName: string;
	token: string;
}
export const deleteImgPreview = async ({ imageName, token, userId }: Args) => {
	const projectId = `temp-${userId}`;

	const supabase = createSupabase(token);
	const { error } = await supabase.storage
		.from("screenshots")
		.remove([`${userId}/${projectId}/${imageName}`]);

	if (error) {
		return {
			success: false,
			error: `Failed to delete image: ${error.message}`,
		};
	}

	return { success: true };
};
