import clsx from "clsx";
import { useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Input, Label } from "@components/ui";
import { Upload } from "lucide-react";

const dropzoneOptions: DropzoneOptions = {
	accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
	maxFiles: 5,
	maxSize: 1048576, // 1 mb
};

export const ImageDropzone = () => {
	const [screenshots, setScreenshots] = useState<string[]>([]);
	const [isErrorImages, setIsErrorImages] = useState(false);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		acceptedFiles,
		fileRejections,
	} = useDropzone(dropzoneOptions);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			for (const file of acceptedFiles) {
				screenshots.length < 5 &&
					setScreenshots((p) => [...p, URL.createObjectURL(file)]);
			}
		}
	}, [acceptedFiles]);

	useEffect(() => {
		setIsErrorImages(fileRejections.length != 0);
	}, [fileRejections.length]);

	return (
		<div className="grid gap-3">
			<Label>Project Screenshots</Label>
			<div
				className={clsx(
					"border-2 border-dashed rounded-lg p-8 text-center transition-colors ",
					isDragActive && "border-sky-400 bg-sky-50",
					fileRejections.length > 0 && "border-red-400 bg-red-50",
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
							isDragActive ? "text-sky-500" : "text-muted-foreground",
						)}
					/>
					<h3 className={isErrorImages ? "text-red-600" : "font-medium"}>
						{isErrorImages
							? "Only images smaller than 1 MB are allowed"
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
					<Input type="file" {...getInputProps()} />
				</div>
			</div>

			<ul>
				{screenshots.map((url) => (
					<img
						key={url}
						src={url}
						alt={url}
						onLoad={() => URL.revokeObjectURL(url)}
					/>
				))}
			</ul>
		</div>
	);
};
