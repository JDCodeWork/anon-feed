import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { createSupabase } from "@shared/lib/supabase";

interface Args {
	request: Request;
	userId: string;
	token: string;
}
export const createImgPreview = async ({ request, userId, token }: Args) => {
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
			error: "No valid screenshot file uploaded.",
		};
	}

	// Create a Blob from the uploaded bytes
	const fileBlob = new Blob([uploadedBytes], { type: uploadedFile.type });
	const tempProjectId = `temp-${userId}`;

	const supabase = createSupabase(token);

	// Check if the user already has 5 screenshots
	const { data } = await supabase.storage
		.from("screenshots")
		.list(`${userId}/${tempProjectId}`, { limit: 5 });

	if (data && data.length >= 5)
		return {
			error: "You can only upload up to 5 screenshots.",
		};

	const fileName = !(data || []).some((f) => f.name.startsWith("preview"))
		? `preview-${crypto.randomUUID()}.${uploadedFile.type.split("/")[1]}`
		: `${crypto.randomUUID()}-${uploadedFile.name}`;

	// Upload the file to Supabase storage
	const { error: screenshotError } = await supabase.storage
		.from("screenshots")
		.upload(`${userId}/${tempProjectId}/${fileName}`, fileBlob);

	if (screenshotError) {
		return {
			success: false,
			error: screenshotError.message,
		};
	}

	return {
		success: true,
	};
};
