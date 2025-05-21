import { createSupabase } from "@shared/lib/supabase";

type GetUserProjectArgs = {
	userId: string;
	userToken: string;
};
export const getUserProjects = async ({
	userId,
	userToken,
}: GetUserProjectArgs) => {
	const supabase = createSupabase(userToken);

	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("user_id", userId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
