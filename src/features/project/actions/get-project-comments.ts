import type { ICommentResponse } from "@shared/interfaces";
import { createSupabase } from "@shared/lib/supabase";

type Args = {
	projectId: string;
};
export const getProjectComments = async ({
	projectId,
}: Args): Promise<ICommentResponse[]> => {
	const supabase = createSupabase(null);

	const { data, error } = await supabase
		.from("comments")
		.select(`
    *,
    users (*)
    `)
		.eq("project_id", projectId);

	if (!data && error) throw new Error(error.message);

	const formattedData: ICommentResponse[] = data.map((comment) => {
		const { users, ...commentDetails } = comment;

		return {
			...commentDetails,
			author: users,
		};
	});

	return formattedData;
};
