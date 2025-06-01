import { getAuth } from "@clerk/react-router/ssr.server";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { createSupabase } from "@shared/lib/supabase";
import { redirect } from "react-router";
import type { Route } from "./+types/create-preview-image";

// Action to handle the upload of a preview image for a project submission
export const action = async (args: Route.ActionArgs) => {
	const { userId, getToken } = await getAuth(args);
	if (!userId) return redirect("/");

	const { request } = args;

	let uploadedFile: FileUpload | undefined;
	let uploadedBytes;

	const uploadHandler = async (fileUpload: FileUpload) => {
		if (fileUpload.fieldName === "screenshots") {
			if (["image/png", "image/jpeg", "image/webp"].includes(fileUpload.type)) {
				const bytes = await fileUpload.bytes();
				const size = bytes.byteLength;

				if (size <= 1_000_000) {
					uploadedFile = fileUpload;
					uploadedBytes = bytes;
					return;
				} else {
					throw new Error("File too large");
				}
			} else {
				throw new Error("Invalid file type");
			}
		}
	};

	await parseFormData(request, uploadHandler);

	if (!uploadedFile || !uploadedBytes) {
		return {
			errors: {
				screenshots: "No valid screenshot file uploaded.",
			},
		};
	}

	// Create a Blob from the uploaded bytes
	const fileBlob = new Blob([uploadedBytes], { type: uploadedFile.type });
	const tempProjectId = `temp-${userId}`;

	const supabase = createSupabase(await getToken());

	// Check if the user already has 5 screenshots
	const { data } = await supabase.storage
		.from("screenshots")
		.list(`${userId}/${tempProjectId}`, { limit: 5 });

	if (data && data.length >= 5)
		return {
			errors: {
				screenshots: "You can only upload up to 5 screenshots.",
			},
		};

	const fileName = !(data || []).some((f) => f.name.startsWith("preview"))
		? `preview-${crypto.randomUUID()}.${uploadedFile.type.split("/")[1]}`
		: `${crypto.randomUUID()}-${uploadedFile.name}`;

	// Upload the file to Supabase storage
	const { data: uploadData, error: screenshotError } = await supabase.storage
		.from("screenshots")
		.upload(`${userId}/${tempProjectId}/${fileName}`, fileBlob);

	if (screenshotError) {
		return {
			errors: {
				screenshots: screenshotError.message,
			},
		};
	}

	// Format the list of screenshots to include the newly uploaded one
	const screenshots =
		data?.map((file) => ({
			name: file.name,
			url: supabase.storage
				.from("screenshots")
				.getPublicUrl(`${userId}/${tempProjectId}/${file.name}`).data.publicUrl,
		})) || [];

	screenshots.push({
		name: uploadData.path.split("/").pop() || "screenshot.png",
		url: supabase.storage.from("screenshots").getPublicUrl(uploadData.path).data
			.publicUrl,
	});

	return {
		screenshots,
	};
};
