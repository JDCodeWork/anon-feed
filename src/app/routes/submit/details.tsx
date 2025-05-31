import { type IProject, ProjectDetailSchema } from "@features/projects";

import { TagSelector } from "@features/submit/components/TagSelector";
import { CATEGORIES } from "@features/submit/constants/project-creation.constant";
import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@shared/components/ui";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/details";

import type { FormErrors } from "@features/submit/interfaces/form-errors";

type DetailsFormErrors = FormErrors<typeof ProjectDetailSchema>;

// This clientLoader function retrieves the initial values for the form
export function clientLoader() {
	const projectData = JSON.parse(
		localStorage.getItem("submit-project") || "{}",
	);

	const details = projectData.details || {};

	return {
		initialValues: details,
	};
}

// This clientAction function handles the form submission
export async function clientAction({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const rawData = Object.fromEntries(formData.entries()) as Record<
		string,
		string
	>;

	// Convert tags from a comma-separated string to an array
	const tags = rawData.tags.split(",");
	const parsedData = ProjectDetailSchema.safeParse({ ...rawData, tags });

	// If the data is valid, save it to localStorage and redirect to the next step
	if (parsedData.success) {
		const projectData = JSON.parse(
			localStorage.getItem("submit-project") || "{}",
		);

		const projectDataSections = {
			...projectData,
			details: parsedData.data,
		};

		localStorage.setItem("submit-project", JSON.stringify(projectDataSections));
		return redirect("/submit/media");
	}

	// If the data is invalid, return the errors to be displayed in the form
	return {
		errors: parsedData.error.flatten().fieldErrors,
		message: "Please fix the errors in the form.",
	};
}

const DetailsTab = ({ actionData, loaderData }: Route.ComponentProps) => {
	const [errors, setErrors] = useState<DetailsFormErrors | null>(null);
	const { initialValues } = loaderData;

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
			delete updated[name as keyof DetailsFormErrors];
			return updated;
		});
	};

	const categories = CATEGORIES;

	return (
		<Form method="post" className="space-y-6 mt-4">
			<div className="grid gap-3">
				<Label htmlFor="project-title">
					Project Title
					{errors?.title && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Input
						name="title"
						placeholder="e.g., TaskFlow - Project Management App"
						defaultValue={initialValues?.title || ""}
						onChange={() => handleErrorChange("title")}
						className={
							errors?.title &&
							"not-focus:border-red-400 not-focus:text-red-600 not-focus:placeholder:text-red-300"
						}
					/>
					{errors?.title && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{errors?.title[0].replace("String", "Title")}
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-category">
					Category
					{errors?.category && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Select
						name="category"
						defaultValue={initialValues?.category || undefined}
						onValueChange={() => handleErrorChange("category")}
					>
						<SelectTrigger
							className={
								errors?.category &&
								"not-focus:border-red-400 not-focus:*:text-red-400"
							}
						>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{categories.map(({ value, label }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{errors?.category && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{errors.category[0]}
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-description">
					Description
					{errors?.description && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Textarea
						name="description"
						placeholder="Provide a brief overview of your project..."
						defaultValue={initialValues?.description || ""}
						onChange={() => handleErrorChange("description")}
						className={clsx(
							"min-h-[120px]",
							errors?.description &&
								"not-focus:border-red-400 not-focus:text-red-600 not-focus:placeholder:text-red-300",
						)}
					/>
					{errors?.description && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{errors.description[0].replace("String", "Description")}
						</p>
					)}
				</div>
			</div>

			<TagSelector
				hasError={!!errors?.tags}
				initialValues={initialValues?.tags || []}
			/>

			<div className="flex justify-end">
				<Button type="submit">Next: Media & Links</Button>
			</div>
		</Form>
	);
};

export default DetailsTab;
