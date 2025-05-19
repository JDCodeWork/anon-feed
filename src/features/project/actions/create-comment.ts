import type { UserWithToken } from "@shared/interfaces";
import { createSupabase } from "@shared/lib/supabase";

type CreateCommentType = {
	content: string;
	category: string;
	projectId: string;
};

type Args = {
	user: UserWithToken;
	comment: CreateCommentType;
};
export const createComment = async ({ comment, user }: Args): Promise<void> => {
	const { token, ...userDetails } = user;

	const supabase = createSupabase(token);

	// Looks to see if the user is in the database
	const { data: userDb } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id);

	if (userDb?.length == 0) {
		// creates the user if not already stored
		const { error: createUserError } = await supabase
			.from("users")
			.insert([userDetails]);

		if (createUserError) throw new Error(createUserError.message);
	}

	const { projectId, ...commentDetails } = comment;

	const { error } = await supabase.from("comments").insert([
		{
			...commentDetails,
			project_id: projectId,
			user_id: user.id,
		},
	]);

	if (error) throw new Error(error.message);
};
