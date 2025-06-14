import { useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { useNavigation, useSubmit } from "react-router";

import clsx from "clsx";
import { Upload } from "lucide-react";

import { Input } from "@shared/components/ui";

const styles = {
	uploadIcon: {
		base: "size-8",
		default: "text-muted-foreground",
		active: "text-sky-500",
		error: "text-red-400",
	},
	dropzone: {
		base: "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
		default:
			"border-foreground/25 bg-background/75 hover:border-foreground/35 hover:bg-background/5",
		active: "border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-600/15",
		uploading:
			"border-sky-200 bg-sky-50/25 dark:border-sky-600 dark:bg-sky-600/5",
		error: "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-600/5",
	},
};

const MAX_FILES = 5;
const MAX_SIZE = 1048576; // 1 MB
const UPLOAD_ACTION_URL = "/submit/media?intent=create/img-preview";

const dropzoneOptions: DropzoneOptions = {
	accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
	maxFiles: MAX_FILES,
	maxSize: MAX_SIZE,
};
export type Screenshot = { url: string; name: string };

interface Props {
	error: string;
	screenshots: Screenshot[];
}
export const ImageDropzone = ({ error, screenshots }: Props) => {
	const [showError, setShowError] = useState(false);

	const submit = useSubmit();
	const navigation = useNavigation();
	const isUploading = navigation.formAction === UPLOAD_ACTION_URL;

	// Handle uploading files
	const onDropAccepted = (acceptedFiles: File[]) => {
		if (acceptedFiles.length + screenshots.length > MAX_FILES) {
			setShowError(true);
			return;
		}
		setShowError(false);

		const formData = new FormData();
		acceptedFiles.forEach((file) => {
			if (file.size > MAX_SIZE) {
				setShowError(true);
				return;
			}
			formData.append("images", file);
		});
		submit(formData, {
			method: "post",
			action: UPLOAD_ACTION_URL,
			encType: "multipart/form-data",
		});
	};

	// Handle file input change
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files?.length === 0) return;

		if ((e.currentTarget.files?.length || 0) + screenshots.length > MAX_FILES) {
			setShowError(true);
			return;
		}

		setShowError(false);
		submit(e.currentTarget.form, {
			method: "post",
			action: UPLOAD_ACTION_URL,
		});
	};

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({ ...dropzoneOptions, onDropAccepted });

	// Error handling from the backend
	useEffect(() => {
		if (error.length > 0) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 3000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	// Error handling for rejected files
	useEffect(() => {
		setShowError(fileRejections.length > 0);
	}, [fileRejections.length]);

	return (
		<div
			className={clsx(styles.dropzone.base, {
				[styles.dropzone.uploading]: isUploading,
				[styles.dropzone.error]: showError,
				[styles.dropzone.active]: isDragActive && !isUploading,
				[styles.dropzone.default]: !isUploading && !isDragActive && !showError,
			})}
		>
			{isUploading ? (
				<div className="flex flex-col items-center gap-2">
					<div className="animate-spin rounded-full size-8 border-3 border-sky-600 border-l-transparent" />
					<h3 className="font-medium text-sky-500">Uploading...</h3>
					<p className="text-sm text-muted-foreground">
						Please wait while your images are being uploaded.
					</p>
				</div>
			) : (
				<div
					className="flex flex-col items-center gap-2 cursor-pointer"
					{...getRootProps()}
				>
					<Upload
						className={clsx(styles.uploadIcon.base, {
							[styles.uploadIcon.active]: isDragActive && !showError,
							[styles.uploadIcon.error]: showError,
							[styles.uploadIcon.default]: !isDragActive && !showError,
						})}
					/>
					<h3 className={clsx(showError ? "text-red-600" : "font-medium")}>
						{showError
							? `Only ${MAX_FILES} images smaller than 1 MB are allowed`
							: isDragActive
								? "Drop the files here..."
								: "Drag & drop files or click to upload"}
					</h3>
					<p
						className={clsx(
							"text-sm",
							showError ? "text-red-300" : "text-muted-foreground",
						)}
					>
						Upload up to {MAX_FILES} images (PNG, JPG, WebP)
					</p>
					<Input
						type="file"
						{...getInputProps()}
						name="images"
						multiple
						onChange={onInputChange}
					/>
				</div>
			)}
		</div>
	);
};
