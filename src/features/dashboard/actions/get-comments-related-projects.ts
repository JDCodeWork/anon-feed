import type { ICommentResponse } from "@shared/interfaces";
import { createSupabase } from "@shared/lib/supabase";

type GetCommentsRelatedProjectsArgs = {
	userToken: string;
	projectsId: string[];
};
export const getCommentsRelatedProjects = async ({
	userToken,
	projectsId,
}: GetCommentsRelatedProjectsArgs) => {
	const supabase = createSupabase(userToken);

	const { data, error } = await supabase
		.from("comments")
		.select(`
      *,
			users (*)
      `)
		.in("project_id", projectsId)
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	const formattedData: ICommentResponse[] = data.map((comment) => {
		const { users, ...commentDetails } = comment;

		return {
			...commentDetails,
			author: users,
		};
	});

	return formattedData;
};
