import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/media";

import { getAuth } from "@clerk/react-router/ssr.server";
import clsx from "clsx";
import { Github, Globe } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

import { type FormErrors, ProjectMediaSchema } from "@features/submit";
import {
	createImgPreview,
	deleteImgPreview,
	getAllImgs,
} from "@features/submit/actions";
import { ImageDropzone, ImageSlider } from "@features/submit/components";
import { checkForm, saveToLocalStorage } from "@features/submit/utils";
import { Button, Input, Label } from "@shared/components/ui";

export async function loader(args: Route.LoaderArgs) {
	const { userId, getToken } = await getAuth(args);
	if (!userId) return redirect("/");

	const token = (await getToken()) || "";
	const res = await getAllImgs({ token, userId });

	return { screenshots: res.screenshots || [] };
}

export async function action(args: Route.ActionArgs) {
	const clonedRequest = args.request.clone();

	const { userId, getToken } = await getAuth(args);
	if (!userId) return;

	const intent = new URL(args.request.url).searchParams.get("intent");
	let formData: FormData;

	const token = (await getToken()) || "";

	switch (intent) {
		case "create/img-preview":
			const { error: createError, success: createSuccess } =
				await createImgPreview({
					request: clonedRequest,
					userId,
					token,
				});

			if (createError) {
				return {
					success: false,
					errors: {
						screenshots: createError,
					},
					message: "Failed to create image preview",
				};
			}

			return { success: createSuccess };
		case "delete/img-preview":
			formData = await args.request.formData();

			const { success: deleteSuccess, error: deleteError } =
				await deleteImgPreview({
					imageName: formData.get("imageName") as string,
					userId,
					token,
				});

			if (deleteError) {
				return {
					errors: {
						screenshots: deleteError,
					},
					message: "Failed to delete image preview",
				};
			}

			return { success: deleteSuccess };
		case "next":
			formData = await args.request.formData();

			const check = checkForm(formData, ProjectMediaSchema);

			if (!check.success) {
				return {
					errors: check.errors,
					message: check.message,
				};
			}

			return {
				success: true,
				data: check.data,
				intent: "next",
			};
		default:
			return {
				errors: {
					intent: "Invalid form submission intent",
				},
			};
	}
}

type MediaFormErrors = FormErrors<typeof ProjectMediaSchema>;
type MediaFormData = z.infer<typeof ProjectMediaSchema>;

const MediaTab = ({ loaderData, actionData }: Route.ComponentProps) => {
	const navigate = useNavigate();

	const { screenshots } = loaderData;
	const [initialData, setInitialData] = useState<Partial<MediaFormData>>({});

	const [errors, setErrors] = useState<MediaFormErrors | null>(null);

	// Load initial data from localStorage or set default values
	useEffect(() => {
		const savedData = JSON.parse(
			localStorage.getItem("submit-project") || "{}",
		);

		if (savedData.media) {
			setInitialData(savedData.media);
		} else {
			setInitialData({
				githubRepo: "",
				liveDemo: "",
			});
		}
	}, []);

	// Handle errors from the action data
	useEffect(() => {
		if (!actionData?.success && actionData?.errors) {
			setErrors(actionData.errors as any);
			toast.error(actionData.message);
		}
	}, [actionData]);

	// Handle successful form submission
	useEffect(() => {
		if (actionData?.success && actionData?.intent === "next") {
			saveToLocalStorage("submit-project", {
				media: actionData.data,
			});

			navigate("/submit/feedback");
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

	return (
		<Form
			className="mt-6 space-y-6"
			method="post"
			encType="multipart/form-data"
		>
			<div className="grid gap-3">
				<Label>
					Project Screenshots
					{errors?.screenshots && <span className="text-red-600">*</span>}
				</Label>
				<ImageDropzone
					error={(errors?.screenshots as unknown as string) || ""}
					screenshots={screenshots || []}
				/>
				<ImageSlider screenshots={screenshots || []} />
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
								"border-r border-red-400 bg-red-600/5 text-red-400 group-focus-within:bg-muted group-focus-within:border-r-0 group-focus-within:border-accent group-focus-within:text-accent-foreground",
						)}
					>
						<Github className="h-4 w-4" />
						<span className="text-sm">github.com/</span>
					</div>
					<Input
						name="githubRepo"
						placeholder="username/repository"
						defaultValue={initialData?.githubRepo || ""}
						onChange={() => handleErrorChange("githubRepo")}
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
								"border-r border-red-400 bg-red-600/5 text-red-400 group-focus-within:bg-muted group-focus-within:border-r-0 group-focus-within:border-accent group-focus-within:text-accent-foreground",
						)}
					>
						<Globe className="h-4 w-4" />
						<span className="text-sm">https://</span>
					</div>
					<Input
						name="liveDemo"
						placeholder="your-project-demo.com"
						defaultValue={initialData?.liveDemo?.slice(8) || ""}
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
				<Button formAction="/submit/media?intent=next" type="submit">
					Next: Feedback Goals
				</Button>
			</div>
		</Form>
	);
};

export default MediaTab;
