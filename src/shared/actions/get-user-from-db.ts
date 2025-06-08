import { createSupabase } from "@shared/lib/supabase";

export const getUserFromDb = async (userId: string, token: string | null) => {
	const supabase = createSupabase(token);

	// Looks to see if the user is in the database
	const { data: userDb, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) {
		return {
			success: false,
			message: `Error fetching user: ${error.message}`,
		};
	}

	if (!userDb) {
		return {
			success: false,
			message: "User not found in the database.",
		};
	}

	return {
		success: true,
		data: userDb,
	};
};
