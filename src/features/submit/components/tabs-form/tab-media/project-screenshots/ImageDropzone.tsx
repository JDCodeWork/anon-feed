import type { action } from "@app/actions/submit/create-preview-image";
import { useFormContext } from "@features/submit/context/FormContext";
import { Input } from "@shared/components/ui";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { useFetcher } from "react-router";

const dropzoneOptions: DropzoneOptions = {
	accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
	maxFiles: 1,
	maxSize: 1048576, // 1 mb
};

export type Screenshot = { url: string; name: string };

interface Props {
	errors: string[];
	screenshots: Screenshot[];
	onChange: (screenshots: Screenshot[]) => void;
}
export const ImageDropzone = ({ errors, screenshots, onChange }: Props) => {
	const fetcher = useFetcher<typeof action>();
	const [isErrorImages, setIsErrorImages] = useState(false);

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone(dropzoneOptions);

	useEffect(() => {
		setIsErrorImages(fileRejections.length != 0);
	}, [fileRejections.length]);

	useEffect(() => {
		if (errors.length > 0) setIsErrorImages(true);
		else if (fileRejections.length == 0) setIsErrorImages(false);
	}, [errors.length, fileRejections.length]);

	useEffect(() => {
		if (screenshots.length <= 5 && fetcher?.data?.screenshots) {
			onChange(fetcher?.data?.screenshots);
		}
	}, [screenshots, fetcher]);

	return (
		<div
			className={clsx(
				"border-2 border-dashed rounded-lg p-8 text-center transition-colors ",
				isDragActive && "border-sky-400 bg-sky-50",
				isErrorImages && "border-red-400 bg-red-50",
				!isDragActive &&
					!isErrorImages &&
					"hover:border-gray-300 hover:bg-gray-50",
			)}
		>
			<div
				className="flex flex-col items-center gap-2 cursor-pointer"
				{...getRootProps()}
			>
				<Upload
					className={clsx(
						"size-8",
						isDragActive && "text-sky-500",
						isErrorImages && "text-red-400",
						!isDragActive && !isErrorImages && "text-muted-foreground",
					)}
				/>
				<h3 className={isErrorImages ? "text-red-600" : "font-medium"}>
					{isErrorImages
						? "Only 5 images smaller than 1 MB are allowed"
						: isDragActive
							? "Drop the files here..."
							: "Drag & drop files or click to upload"}
				</h3>
				<p
					className={clsx(
						"text-sm",
						isErrorImages ? "text-red-300" : "text-muted-foreground",
					)}
				>
					Upload up to 5 images (PNG, JPG, WebP)
				</p>
				<fetcher.Form
					method="post"
					action="/submit/media/preview-image/create"
					encType="multipart/form-data"
				>
					<Input
						type="file"
						{...getInputProps()}
						name="screenshots"
						onChange={(e) => fetcher.submit(e.currentTarget.form)}
					/>
				</fetcher.Form>
			</div>
		</div>
	);
};
