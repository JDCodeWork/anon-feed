import { Input } from "@components/ui";
import { useFormContext } from "@features/submit/context/FormContext";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

const dropzoneOptions: DropzoneOptions = {
	accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
	maxFiles: 5,
	maxSize: 1048576, // 1 mb
};

export const ImageDropzone = () => {
	const {
		setFormValue,
		formValues: { screenshots },
	} = useFormContext();
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
			let images = [];

			for (const file of acceptedFiles) {
				if (images.length + screenshots.length < 5) {
					const image = {
						id: `${file.name}-${Date.now()}`,
						url: URL.createObjectURL(file),
					};
					images.push(image);
				} else {
					setIsErrorImages(true);
					setTimeout(() => {
						setIsErrorImages(false);
					}, 3000);
				}
			}

			setFormValue("screenshots", [...screenshots, ...images]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		setIsErrorImages(fileRejections.length != 0);
	}, [fileRejections.length]);

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
				<Input type="file" {...getInputProps()} />
			</div>
		</div>
	);
};
