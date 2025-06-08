import { useEffect, useRef, useState } from "react";
import { Form, useNavigate, useNavigation, useSubmit } from "react-router";
import type { Route } from "./+types/feedback";

import { getAuth } from "@clerk/react-router/ssr.server";
import clsx from "clsx";
import { toast } from "sonner";
import z from "zod";

import {
	type FormErrors,
	ProjectFeedbackSchema,
	ProjectSchema,
} from "@features/submit";
import { createProject, renameTempImages } from "@features/submit/actions";
import { SaveDataAlert } from "@features/submit/components";
import { EXPERIENCE_LEVEL, FEEDBACK_AREAS } from "@features/submit/constants";
import { checkForm, saveToLocalStorage } from "@features/submit/utils";
import { getUserFromDb } from "@shared/actions";
import {
	Button,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@shared/components/ui";

type FeedbackFormErrors = FormErrors<typeof ProjectFeedbackSchema>;
export type ProjectFormData = z.infer<typeof ProjectSchema>;

export function clientLoader() {
	const projectData = JSON.parse(
		localStorage.getItem("submit-project") || "{}",
	);

	const feedback = projectData.feedback || {};

	return {
		initialValues: feedback,
	};
}

export async function action(args: Route.ActionArgs) {
	const { userId, getToken } = await getAuth(args);
	const token = await getToken();
	const formData = await args.request.formData();

	if (formData.get("intent") == "save-draft") {
		const parsedData = checkForm(formData, ProjectFeedbackSchema);

		if (!parsedData.success) {
			return {
				errors: parsedData.errors,
				message: parsedData.message,
			};
		}

		return {
			success: true,
			data: parsedData.data,
			intent: "save-draft",
		};
	}

	formData.delete("intent");
	if (!userId || !token) return;
	const { data: userDb } = await getUserFromDb(userId, token);

	const projectFormData = checkForm(formData, ProjectSchema);
	if (!projectFormData.success) {
		return {
			errors: projectFormData.errors,
			message: projectFormData.message,
		};
	}

	if (!userDb) {
		return {
			success: false,
			errors: { submit: "User not found. Please log in again." },
			message: "User not found. Please log in again.",
		};
	}

	try {
		const user = { ...userDb, token };

		const projectRes = await createProject({
			projectData: projectFormData.data,
			user,
		});

		const imagesNames = projectFormData.data.screenshots
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);
		await renameTempImages({ projectId: projectRes.id, user, imagesNames });

		return {
			success: true,
			intent: "submit",
			data: {
				projectId: projectRes.id,
			},
		};
	} catch (error) {
		console.log("error", error);
		return {
			success: false,
			errors: { submit: "An unexpected error occurred. Please try again." },
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

const FeedbackTab = ({ loaderData, actionData }: Route.ComponentProps) => {
	const { initialValues } = loaderData;

	const [isOpenAlert, setIsOpenAlert] = useState(false);

	const navigate = useNavigate();
	const navigation = useNavigation();
	const submit = useSubmit();
	const formRef = useRef<HTMLFormElement>(null);
	const [errors, setErrors] = useState<FeedbackFormErrors | null>(null);

	const feedbackAreas = FEEDBACK_AREAS;
	const isUploadingProject = navigation.formAction !== undefined;

	const handleErrorChange = (name: keyof FeedbackFormErrors) => {
		setErrors((prev) => {
			if (!prev) return null;
			const updated = { ...prev };
			delete updated[name];
			return updated;
		});
	};

	// Handle errors from the action
	useEffect(() => {
		if (!actionData?.success && actionData?.errors) {
			setErrors(actionData.errors as any);
			toast.error(actionData.message);
		}
	}, [actionData]);

	// Handle successful draft saving
	useEffect(() => {
		if (actionData?.success && actionData?.intent === "save-draft") {
			saveToLocalStorage("submit-project", {
				feedback: actionData.data,
			});

			toast.success("Draft saved successfully!");
			navigate("/submit/media");
		}
	}, [actionData]);

	// Handle successful project submission
	useEffect(() => {
		if (actionData?.success && actionData?.intent === "submit") {
			localStorage.removeItem("submit-project");

			toast.success("Project submitted successfully!");
			navigate(`/project/${(actionData.data as any)?.projectId}`);
		}
	}, [actionData]);

	const onExitWithoutSaving = () => {
		navigate("/submit/media");
		setIsOpenAlert(false);
	};

	// Function to handle saving the draft
	const onSaveDraft = () => {
		if (!formRef.current) return;

		const formData = new FormData(formRef.current);
		formData.append("intent", "save-draft");

		submit(formData, {
			method: "post",
		});
		setIsOpenAlert(false);
	};

	// Function to handle form submission
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if the form is valid
		const feedbackFormData = new FormData(e.currentTarget);
		const feedbackForm = checkForm(feedbackFormData, ProjectFeedbackSchema);

		if (!feedbackForm.success) {
			setErrors(feedbackForm.errors);
			toast.error(feedbackForm.message);
			return;
		}

		// Combine local storage data with form data
		const projectLocalStorageRawForm = JSON.parse(
			localStorage.getItem("submit-project") || "{}",
		) as Record<string, Record<string, any>>;
		const projectLocalStorageForm = Object.values(
			projectLocalStorageRawForm,
		).reduce(
			(acc, curr) => {
				for (const [key, value] of Object.entries(curr)) {
					if (value !== undefined) {
						acc[key] = value;
					}
				}
				return acc;
			},
			{} as Record<string, any>,
		);

		const formattedProjectData = {
			...projectLocalStorageForm,
			...feedbackForm.data,
		};

		// Validate the combined data
		const parsedData = ProjectSchema.safeParse(formattedProjectData);

		if (!parsedData.success) {
			toast.error("Please review the form fields and try again.");
			return;
		}

		// Prepare the form data for submission
		const formData = new FormData();
		Object.entries(parsedData.data).forEach(([key, value]) => {
			if (value !== undefined) {
				formData.append(key, value as string);
			}
		});
		formData.append("intent", "submit");

		submit(formData, {
			method: "post",
		});
	};

	return (
		<Form className="mt-6 space-y-6" ref={formRef} onSubmit={onSubmit}>
			<div className="grid gap-3">
				<Label>
					Areas for Feedback
					{errors?.feedbackArea && <span className="text-red-600">*</span>}
				</Label>
				<div>
					<Select
						name="feedbackArea"
						defaultValue={initialValues?.feedbackArea}
						onValueChange={() => handleErrorChange("feedbackArea")}
					>
						<SelectTrigger
							className={
								errors?.feedbackArea &&
								"not-focus:border-red-400 not-focus:*:text-red-400"
							}
						>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent defaultValue={undefined}>
							{feedbackAreas.map(({ value, label }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors?.feedbackArea && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							You must select an area you want to receive feedback on.
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="specific-questions">
					Specific Questions
					{errors?.specificQuestions && <span className="text-red-600">*</span>}
				</Label>
				<Textarea
					id="specific-questions"
					name="specificQuestions"
					placeholder="What specific aspects of your project would you like feedback on?"
					defaultValue={initialValues?.specificQuestions || ""}
					onChange={() => handleErrorChange("specificQuestions")}
					className={clsx(
						"min-h-[120px]",
						errors?.specificQuestions &&
							"not-focus:border-red-400 not-focus:text-red-600 not-focus:placeholder:text-red-300",
					)}
				/>
				{errors?.specificQuestions ? (
					<p className="text-sm pl-2 text-red-400 mt-0">
						{errors?.specificQuestions[0].replace(
							"String",
							"Specific questions",
						)}
					</p>
				) : (
					<p className="text-xs text-muted-foreground">
						Providing specific questions will help reviewers give you more
						targeted feedback
					</p>
				)}
			</div>

			<div className="grid gap-3">
				<Label>
					Your Experience Level
					{errors?.experienceLevel && <span className="text-red-600">*</span>}
				</Label>
				<div>
					<Select
						name="experienceLevel"
						defaultValue={initialValues?.experienceLevel}
						onValueChange={() => handleErrorChange("experienceLevel")}
					>
						<SelectTrigger
							className={
								errors?.experienceLevel &&
								"not-focus:border-red-400 not-focus:*:text-red-400"
							}
						>
							<SelectValue placeholder="Select your experience level" />
						</SelectTrigger>
						<SelectContent defaultValue={undefined}>
							{EXPERIENCE_LEVEL.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{errors?.experienceLevel && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							You must select an experience level.
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<Button
					type="button"
					variant="outline"
					onClick={() => setIsOpenAlert(true)}
				>
					Previous: Media & Links
				</Button>

				<Button type="submit" disabled={isUploadingProject}>
					{isUploadingProject ? "Submitting..." : "Submit Project"}
				</Button>
			</div>
			<SaveDataAlert
				isOpen={isOpenAlert}
				onExitWithoutSaving={onExitWithoutSaving}
				onSaveDraft={onSaveDraft}
			/>
		</Form>
	);
};

export default FeedbackTab;
