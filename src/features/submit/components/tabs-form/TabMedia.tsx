import clsx from "clsx";
import { Github, Globe, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Button, Input, Label, TabsContent } from "@components/ui";

const dropzoneOptions: DropzoneOptions = {
	accept: { "image/png": [], "image/jpg": [], "image/webp": [] },
	maxFiles: 5,
	maxSize: 1048576, // 1 mb
};

interface Props {
	onPrev: () => void;
	onNext: () => void;
}
export const TabMedia = ({ onPrev, onNext }: Props) => {
	const [screenshots, setScreenshots] = useState<string[]>([]);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
		useDropzone(dropzoneOptions);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			for (const file of acceptedFiles) {
				file.path &&
					!screenshots.includes(file.path) &&
					screenshots.length < 5 &&
					setScreenshots((p) => [...p, file.path!]);
			}
		}
	}, [acceptedFiles]);

	return (
		<TabsContent value="media" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label>Project Screenshots</Label>
				<div
					className={clsx(
						"border-2 border-dashed rounded-lg p-8 text-center transition-colors",
						isDragActive
							? "border-sky-400 bg-sky-50"
							: "hover:border-gray-300 hover:bg-gray-50",
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
						<h3 className="font-medium">
							{isDragActive
								? "Drop the files here..."
								: "Drag & drop files or click to upload"}
						</h3>
						<p className="text-sm text-muted-foreground">
							Upload up to 5 images (PNG, JPG, WebP)
						</p>
						<Input type="file" {...getInputProps()} />
					</div>
				</div>

				<ul>
					{screenshots.map((url) => (
						<li>{url}</li>
					))}
				</ul>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="github-repo">GitHub Repository</Label>
				<div className="flex gap-2">
					<div className="flex items-center gap-2 bg-muted px-3 rounded-l-md border-y border-l">
						<Github className="h-4 w-4" />
						<span className="text-sm">github.com/</span>
					</div>
					<Input
						id="github-repo"
						placeholder="username/repository"
						className="rounded-l-none"
					/>
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="live-demo">Live Demo URL</Label>
				<div className="flex gap-2">
					<div className="flex items-center gap-2 bg-muted px-3 rounded-l-md border-y border-l">
						<Globe className="h-4 w-4" />
						<span className="text-sm">https://</span>
					</div>
					<Input
						id="live-demo"
						placeholder="your-project-demo.com"
						className="rounded-l-none"
					/>
				</div>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={onPrev}>
					Previous: Details
				</Button>
				<Button onClick={onNext}>Next: Feedback Goals</Button>
			</div>
		</TabsContent>
	);
};
