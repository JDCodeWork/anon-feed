import { Input } from "@shared/components/ui";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { useFetcher, useSubmit } from "react-router";

const dropzoneOptions: DropzoneOptions = {
	accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
	maxFiles: 1,
	maxSize: 1048576, // 1 mb
};

export type Screenshot = { url: string; name: string };

interface Props {
	error: string[];
	screenshots: Screenshot[];
}
export const ImageDropzone = ({ error, screenshots }: Props) => {
	const [isErrorImages, setIsErrorImages] = useState(false);

	const fetcher = useFetcher();

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		fileRejections,
		acceptedFiles,
		inputRef,
	} = useDropzone(dropzoneOptions);

	useEffect(() => {
		setIsErrorImages(fileRejections.length != 0);
	}, [fileRejections.length]);

	useEffect(() => {
		if (error.length > 0) setIsErrorImages(true);
		else if (fileRejections.length == 0) setIsErrorImages(false);
	}, [error.length, fileRejections.length]);

	useEffect(() => {
		if (error.length > 0) {
			setIsErrorImages(true);
			setTimeout(() => {
				setIsErrorImages(false);
			}, 1000);
		}
	}, [error]);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			let images = [];

			for (const file of acceptedFiles) {
				if (images.length + screenshots.length < 5) {
					(file as any).preview = URL.createObjectURL(file);

					images.push(file);
				} else {
					setIsErrorImages(true);
					setTimeout(() => {
						setIsErrorImages(false);
					}, 3000);
				}
			}

			setTimeout(() => {
				fetcher.submit(inputRef.current?.form, {
					method: "post",
					action: "/submit/media?intent=create/img-preview",
				});
			}, 100);
		}
	}, [acceptedFiles]);

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
						!isDragActive && isErrorImages && "text-red-400",
						!isDragActive && !isErrorImages && "text-muted-foreground",
					)}
				/>
				<h3
					className={
						!isDragActive && isErrorImages ? "text-red-600" : "font-medium"
					}
				>
					{isErrorImages
						? "Only 5 images smaller than 1 MB are allowed"
						: isDragActive
							? "Drop the files here..."
							: "Drag & drop files or click to upload"}
				</h3>
				<p
					className={clsx(
						"text-sm",
						!isDragActive && isErrorImages
							? "text-red-300"
							: "text-muted-foreground",
					)}
				>
					Upload up to 5 images (PNG, JPG, WebP)
				</p>
				<Input
					type="file"
					{...getInputProps()}
					accept="image/png, image/jpeg, image/webp"
					name="screenshots"
					onChange={(e) =>
						fetcher.submit(e.currentTarget.form, {
							method: "post",
							action: "/submit/media?intent=create/img-preview",
						})
					}
				/>
			</div>
		</div>
	);
};
