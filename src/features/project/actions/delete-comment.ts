import { createSupabase } from "@shared/lib/supabase";

export type DeleteCommentArgs = {
	userId: string;
	userToken: string;
	commentId: number;
};
export const deleteComment = async ({
	commentId,
	userId,
	userToken,
}: DeleteCommentArgs): Promise<void> => {
	const supabase = createSupabase(userToken);

	// Looks to see if the user is in the database
	const { data: userDb } = await supabase
		.from("users")
		.select("*")
		.eq("id", userId);

	if (userDb?.length == 0) throw new Error("Not user found");

	const { error } = await supabase
		.from("comments")
		.delete()
		.eq("id", commentId)
		.eq("user_id", userId);

	if (error) throw new Error(error.message);
};
