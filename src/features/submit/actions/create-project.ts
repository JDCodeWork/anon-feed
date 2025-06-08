import type { ProjectFormData } from "@app/routes/submit/feedback";
import type { IProjectResponse } from "@features/projects";
import type { UserWithToken } from "@shared/interfaces";
import { createSupabase } from "@shared/lib/supabase";

interface IProjectData
	extends Omit<
		ProjectFormData,
		"feedbackArea" | "experienceLevel" | "screenshots"
	> {
	feedbackArea: string;
	experienceLevel: string;
}

type Args = {
	user: UserWithToken;
	projectData: IProjectData;
};

export const createProject = async ({
	projectData,
	user,
}: Args): Promise<IProjectResponse> => {
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

	// creates the project with the user's id
	const formattedTags: string[] = projectData.tags
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);
	const { data, error } = await supabase
		.from("projects")
		.insert([
			{
				...projectData,
				screenshots: [],
				user_id: user.id,
				tags: formattedTags,
			},
		])
		.select();

	if (!data || data?.length == 0) throw new Error(error?.message);

	return {
		...data[0],
		author: user,
	};
};
