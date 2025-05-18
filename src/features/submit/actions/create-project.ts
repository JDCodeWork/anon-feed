import type { IProject, IProjectResponse } from "@features/projects";
import type { UserWithToken } from "@shared/interfaces";
import { createSupabase } from "@shared/lib/supabase";

type Args = {
	user: UserWithToken;
	projectData: IProject;
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

	// upload all screenshots and store links
	let formattedScreenshots: string[] = [];
	for (const screenshot of projectData.screenshots) {
		const { data: resScreenshot, error: screenshotError } =
			await supabase.storage
				.from("screenshots")
				.upload(`${user.id}/${Math.random()}_${screenshot.name}`, screenshot);

		if (screenshotError) throw new Error(screenshotError.message);

		const { data } = supabase.storage
			.from("screenshots")
			.getPublicUrl(resScreenshot?.path!);

		formattedScreenshots.push(data.publicUrl);
	}

	// creates the project with the user's id
	const { data, error } = await supabase
		.from("projects")
		.insert([
			{
				...projectData,
				screenshots: formattedScreenshots,
				user_id: user.id,
			},
		])
		.select();

	if (!data || data?.length == 0) throw new Error(error?.message);

	return {
		...data[0],
		author: user,
		comments: [],
	};
};
