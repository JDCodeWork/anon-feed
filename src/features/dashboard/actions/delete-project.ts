import { createSupabase } from "@shared/lib/supabase";

type DeleteProjectArgs = {
	projectId: string;
	userToken: string;
	userId: string;
};
export const deleteProject = async ({
	projectId,
	userToken,
	userId,
}: DeleteProjectArgs) => {
	const supabase = createSupabase(userToken);

	const { error } = await supabase
		.from("projects")
		.delete()
		.eq("id", projectId)
		.eq("user_id", userId);

	/* TODO: Delete projectImages */

	if (error) {
		throw new Error(error.message);
	}
};
