import { Button, Input, Label } from "@shared/components/ui";
import clsx from "clsx";
import { Github, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Form,
	redirect,
	useActionData,
	useFetcher,
	useLoaderData,
	useNavigate,
} from "react-router";
import type { Route } from "./+types/media";

import { getAuth } from "@clerk/react-router/ssr.server";
import { createImgPreview } from "@features/submit/actions/media/create-img-preview";
import { deleteImgPreview } from "@features/submit/actions/media/delete-img-preview";
import { getAllImgPreviews } from "@features/submit/actions/media/get-all-img-previews";
import { ImageDropzone, ImageSlider } from "@features/submit/components/";
import type { FormErrors } from "@features/submit/interfaces/form-errors";
import { ProjectMediaSchema } from "@features/submit/schemas/project.schema";
import { checkForm } from "@features/submit/utils/check-form";
import { saveToLocalStorage } from "@features/submit/utils/save-to-local-storage";
import { toast } from "sonner";

export async function loader(args: Route.LoaderArgs) {
	const { userId, getToken } = await getAuth(args);
	if (!userId) return redirect("/");

	const token = (await getToken()) || "";
	const res = await getAllImgPreviews({ token, userId });

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

			console.log("createError", createError);

			if (createError) {
				console.log("a");

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

// TODO: loaderData and actionData not found
const MediaTab = ({ loaderData, actionData }: Route.ComponentProps) => {
	const navigate = useNavigate();

	const { screenshots } = loaderData;

	const [errors, setErrors] = useState<MediaFormErrors | null>(null);

	useEffect(() => {
		if (!actionData?.success && actionData?.errors) {
			setErrors(actionData.errors as any);
			toast.error(actionData.message);
		}
	}, [actionData]);

	useEffect(() => {
		if (actionData?.success && actionData?.data) {
			saveToLocalStorage("submit-project", {
				media: actionData.data,
			});
			toast.success("Media details saved successfully!");
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
					error={errors?.screenshots || []}
					screenshots={screenshots}
				/>
				<ImageSlider screenshots={screenshots} />
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
						/* 						defaultValue={initialValues?.githubRepo || ""} */
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
						/* 						defaultValue={initialValues?.liveDemo || ""} */
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
