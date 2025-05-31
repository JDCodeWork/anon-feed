import { Button, Input, Label } from "@shared/components/ui";
import clsx from "clsx";
import { Github, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/media";

import type { IProject } from "@features/projects";
import { ImageDropzone } from "@features/submit/components/tabs-form/tab-media/project-screenshots/ImageDropzone";
import { ImageSlider } from "@features/submit/components/tabs-form/tab-media/project-screenshots/ImageSlider";
import type { FormErrors } from "@features/submit/interfaces/form-errors";
import { ProjectMediaSchema } from "@features/submit/schemas/project.schema";
import { toast } from "sonner";

// This clientLoader function retrieves the initial values for the form
export function clientLoader() {
	const projectData = JSON.parse(
		localStorage.getItem("submit-project") || "{}",
	);

	const media = projectData.media || {};

	return {
		initialValues: media,
	};
}

// This clientAction function handles the form submission
export async function clientAction({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const rawData = Object.fromEntries(formData.entries()) as Record<
		string,
		string
	>;

	console.log("rawData", rawData);

	const parsedData = ProjectMediaSchema.safeParse(rawData);

	// If the data is valid, save it to localStorage and redirect to the next step
	if (parsedData.success) {
		const projectData = JSON.parse(
			localStorage.getItem("submit-project") || "{}",
		);

		const projectDataSections = {
			...projectData,
			media: parsedData.data,
		};

		localStorage.setItem("submit-project", JSON.stringify(projectDataSections));
		return redirect("/submit/feedback");
	}

	// If the data is invalid, return the errors to be displayed in the form
	return {
		errors: parsedData.error.flatten().fieldErrors,
		message: "Please fix the errors in the form.",
	};
}

type MediaFormErrors = FormErrors<typeof ProjectMediaSchema>;

const MediaTab = ({ loaderData, actionData }: Route.ComponentProps) => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState<MediaFormErrors | null>(null);
	const { initialValues } = loaderData;

	const [images, setImages] = useState<File[]>([]);

	useEffect(() => {
		if (actionData?.errors) {
			setErrors(actionData.errors);
			toast.error(actionData.message);
		}
	}, [actionData]);

	const handleErrorChange = (name: string) => {
		setErrors((prev) => {
			if (!prev) return null;
			const updated = { ...prev };
			delete updated[name as keyof MediaFormErrors];
			return updated;
		});
	};

	const handleAddImage = (files: File[]) => {
		setImages((prev) => [...prev, ...files]);
		handleErrorChange("screenshots");
	};
	const handleDeleteImage = (name: string) => {
		setImages((prev) => prev.filter((file) => file.name !== name));
		handleErrorChange("screenshots");
	};

	return (
		<Form className="mt-6 space-y-6" method="post">
			<div className="grid gap-3">
				<Label>
					Project Screenshots
					{errors?.screenshots && <span className="text-red-600">*</span>}
				</Label>
				{/* TODO: Send image to clientAction */}
				<ImageDropzone
					errors={errors?.screenshots || []}
					screenshots={images}
					onAdd={handleAddImage}
				/>
				<ImageSlider screenshots={images} onDelete={handleDeleteImage} />
			</div>

			<div className="grid gap-3">
				<Label htmlFor="github-repo">
					GitHub Repository
					{errors?.githubRepo && <span className="text-red-600">*</span>}
				</Label>
				<div className="flex gap-2 group">
					<div
						className={clsx(
							"flex items-center gap-2 bg-muted px-3 rounded-l-md border-y border-l",
							errors?.githubRepo &&
								"border-red-400 border-r bg-red-50 text-red-600 group-focus-within:bg-muted group-focus-within:borde-r-0 group-focus-within:border-gray-200 group-focus-within:text-black",
						)}
					>
						<Github className="h-4 w-4" />
						<span className="text-sm">github.com/</span>
					</div>
					<Input
						name="githubRepo"
						placeholder="username/repository"
						defaultValue={initialValues.githubRepo || ""}
						onChange={(e) => handleErrorChange("githubRepo")}
						className={clsx(
							"rounded-l-none",
							errors?.githubRepo &&
								"not-focus:border-red-400 not-focus:*:text-red-400",
						)}
					/>
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="live-demo">
					Live Demo URL
					{errors?.liveDemo && <span className="text-red-600">*</span>}
				</Label>
				<div className="flex gap-2 group">
					<div
						className={clsx(
							"flex items-center gap-2 bg-muted px-3 rounded-l-md border-y border-l",
							errors?.liveDemo &&
								"border-red-400 border-r bg-red-50 text-red-600 group-focus-within:bg-muted group-focus-within:borde-r-0 group-focus-within:border-gray-200 group-focus-within:text-black",
						)}
					>
						<Globe className="h-4 w-4" />
						<span className="text-sm">https://</span>
					</div>
					<Input
						name="liveDemo"
						placeholder="your-project-demo.com"
						defaultValue={initialValues.liveDemo || ""}
						onChange={(e) => handleErrorChange("liveDemo")}
						className={clsx(
							"rounded-l-none",
							errors?.liveDemo &&
								"not-focus:border-red-400 not-focus:*:text-red-400",
						)}
					/>
				</div>
			</div>

			<div className="flex justify-between">
				<Button
					type="button"
					variant="outline"
					onClick={() => navigate("/submit/details")}
				>
					Previous: Details
				</Button>
				<Button type="submit">Next: Feedback Goals</Button>
			</div>
		</Form>
	);
};

export default MediaTab;
