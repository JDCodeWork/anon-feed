import { ProjectFeedbackSchema } from "@features/projects";
import { SaveDataAlert } from "@features/submit/components/SaveDataAlert";
import {
	EXPERIENCE_LEVEL,
	FEEDBACK_AREAS,
} from "@features/submit/constants/project-creation.constant";
import type { FormErrors } from "@features/submit/interfaces/form-errors";
import { saveToLocalStorage } from "@features/submit/utils/save-to-local-storage";
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
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Form, useNavigate, useSubmit } from "react-router";
import { toast } from "sonner";
import z from "zod";
import type { Route } from "./+types/feedback";

type FeedbackFormErrors = FormErrors<typeof ProjectFeedbackSchema>;
type FeedbackFormData = z.infer<typeof ProjectFeedbackSchema>;

export function clientLoader() {
	const projectData = JSON.parse(
		localStorage.getItem("submit-project") || "{}",
	);

	const feedback = projectData.feedback || {};

	return {
		initialValues: feedback,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData.entries()) as FeedbackFormData;
	const parsedData = ProjectFeedbackSchema.safeParse(data);

	if (!parsedData.success) {
		const errors: FeedbackFormErrors = parsedData.error.flatten().fieldErrors;
		return {
			success: false,
			errors,
			message: "Please review the form fields and try again.",
		};
	}

	if (formData.get("intent") == "save-draft") {
		return {
			success: true,
			data: parsedData.data,
			intent: "save-draft",
		};
	}
}

const FeedbackTab = ({ loaderData, actionData }: Route.ComponentProps) => {
	const { initialValues } = loaderData;

	const [isOpenAlert, setIsOpenAlert] = useState(false);

	const navigate = useNavigate();
	const submit = useSubmit();
	const formRef = useRef<HTMLFormElement>(null);
	const [errors, setErrors] = useState<FeedbackFormErrors | null>(null);

	const feedbackAreas = FEEDBACK_AREAS;

	const handleErrorChange = (name: keyof FeedbackFormErrors) => {
		setErrors((prev) => {
			if (!prev) return null;
			const updated = { ...prev };
			delete updated[name];
			return updated;
		});
	};

	useEffect(() => {
		if (!actionData?.success && actionData?.errors) {
			setErrors(actionData.errors as any);
			toast.error(actionData.message);
		}
	}, [actionData]);

	useEffect(() => {
		if (actionData?.success && actionData?.intent === "save-draft") {
			saveToLocalStorage("submit-project", {
				feedback: actionData.data,
			});

			toast.success("Draft saved successfully!");
			navigate("/submit/media");
		}
	}, [actionData]);

	const onExitWithoutSaving = () => {
		navigate("/submit/media");
		setIsOpenAlert(false);
	};
	const onSaveDraft = () => {
		if (!formRef.current) return;

		const formData = new FormData(formRef.current);
		formData.append("intent", "save-draft");

		submit(formData, {
			method: "post",
		});
		setIsOpenAlert(false);
	};

	return (
		<Form className="mt-6 space-y-6" ref={formRef} method="post">
			<div className="grid gap-3">
				<Label>
					Areas for Feedback
					{errors?.feedbackArea && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
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

				<Button type="submit">Submit Project</Button>
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
