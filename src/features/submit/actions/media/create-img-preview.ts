import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { createSupabase } from "@shared/lib/supabase";

interface Args {
	request: Request;
	userId: string;
	token: string;
}
export const createImgPreview = async ({ request, userId, token }: Args) => {
	const uploadedFiles: FileUpload[] = [];
	const uploadedBytes: Array<Uint8Array> = [];

	const uploadHandler = async (fileUpload: FileUpload) => {
		if (fileUpload.fieldName === "images") {
			if (["image/png", "image/jpeg", "image/webp"].includes(fileUpload.type)) {
				const bytes = await fileUpload.bytes();
				const size = bytes.byteLength;

				if (size > 1_000_000) {
					throw new Error("File too large");
				}
				if (uploadedFiles.length >= 5) {
					throw new Error("You can only upload up to 5 screenshots.");
				}
				uploadedFiles.push(fileUpload);
				uploadedBytes.push(bytes);
			} else {
				throw new Error("Invalid file type");
			}
		}
	};

	try {
		await parseFormData(request, uploadHandler);
	} catch (error) {
		return {
			error,
		};
	}

	if (uploadedFiles.length === 0) {
		return {
			error: "No valid screenshot file uploaded.",
		};
	}

	const tempProjectId = `temp-${userId}`;
	const supabase = createSupabase(token);

	// Check how many screenshots already exist
	const { data } = await supabase.storage
		.from("screenshots")
		.list(`${userId}/${tempProjectId}`, { limit: 5 });

	const existingCount = data?.length ?? 0;
	if (existingCount + uploadedFiles.length > 5) {
		return {
			error: "You can only upload up to 5 screenshots.",
		};
	}

	// Upload each file
	for (let i = 0; i < uploadedFiles.length; i++) {
		const file = uploadedFiles[i];
		const bytes = uploadedBytes[i] as BlobPart;
		const fileBlob = new Blob([bytes], { type: file.type });

		const fileName =
			!(data || []).some((f) => f.name.startsWith("preview")) &&
			((uploadedFiles.length > 1 && i === 0) || uploadedFiles.length === 1)
				? `preview-${crypto.randomUUID()}.${file.type.split("/")[1]}`
				: `${crypto.randomUUID()}-${file.name}`;

		const { error: screenshotError } = await supabase.storage
			.from("screenshots")
			.upload(`${userId}/${tempProjectId}/${fileName}`, fileBlob);

		if (screenshotError) {
			return {
				success: false,
				error: screenshotError.message,
			};
		}
	}

	return {
		success: true,
	};
};
