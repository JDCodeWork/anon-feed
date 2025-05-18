import type { IProject } from "@features/projects";
import type { UserWithToken } from "@shared/interfaces/users-db.interface";
import { createSupabase } from "@shared/lib/supabase";

export const createProject = async (
	user: UserWithToken,
	projectData: IProject,
) => {
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

		if (createUserError)
			return {
				ok: false,
				error: createUserError,
			};
	}

	// upload all screenshots and store links
	let formattedScreenshots: string[] = [];
	for (const screenshot of projectData.screenshots) {
		const { data: resScreenshot, error: screenshotError } =
			await supabase.storage
				.from("screenshots")
				.upload(`${user.id}/${Math.random()}_${screenshot.name}`, screenshot);

		if (screenshotError)
			return {
				ok: false,
				error: screenshotError,
			};

		formattedScreenshots.push(resScreenshot.path);
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

	if (data && data?.length > 0)
		return {
			ok: true,
			data: data[0],
		};

	return {
		ok: false,
		error,
	};
};
