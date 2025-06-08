import type { UserWithToken } from "@shared/interfaces";
import { createSupabase } from "@shared/lib/supabase";
import { getAllImgs } from "./media/get-all-imgs";

type Args = {
	user: UserWithToken;
	projectId: string;
	imagesNames: string[];
};
export const renameTempImages = async ({
	user,
	projectId,
	imagesNames,
}: Args) => {
	const supabase = createSupabase(user.token);

	const imagesPromises = Promise.all(
		imagesNames.map((imageName) => {
			return supabase.storage
				.from("screenshots")
				.move(
					`${user.id}/temp-${user.id}/${imageName}`,
					`${user.id}/${projectId}/${imageName}`,
				);
		}),
	);

	try {
		await imagesPromises;

		const rawImagesData = await getAllImgs({
			token: user.token || "",
			userId: user.id,
			projectId,
		});
		if (rawImagesData.error) throw new Error();

		const imagesUrls = (rawImagesData.screenshots || []).map((img) => img.url);
		await supabase
			.from("projects")
			.update({ screenshots: imagesUrls })
			.eq("id", projectId)
			.select();
	} catch (error) {
		console.error("Error renaming temporary images:", error);
		return { success: false };
	}

	return { success: true };
};
