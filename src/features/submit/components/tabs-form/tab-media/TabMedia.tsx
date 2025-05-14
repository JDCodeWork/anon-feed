import { Github, Globe } from "lucide-react";

import { Button, Input, Label, TabsContent } from "@components/ui";
import { useFormContext } from "@features/submit/context/FormContext";
import clsx from "clsx";
import { ProjectScreenshots } from "./project-screenshots/ProjectScreenshots";

interface Props {
	onPrev: () => void;
	onNext: () => void;
}
export const TabMedia = ({ onPrev, onNext }: Props) => {
	const { register, formErrors } = useFormContext();

	return (
		<TabsContent value="media" className="mt-6 space-y-6">
			<ProjectScreenshots />

			<div className="grid gap-3">
				<Label htmlFor="github-repo">
					GitHub Repository
					{formErrors.githubRepo && <span className="text-red-600">*</span>}
				</Label>
				<div className="flex gap-2 group">
					<div
						className={clsx(
							"flex items-center gap-2 bg-muted px-3 rounded-l-md border-y border-l",
							formErrors.githubRepo &&
								"border-red-400 border-r bg-red-50 text-red-600 group-focus-within:bg-muted group-focus-within:borde-r-0 group-focus-within:border-gray-200 group-focus-within:text-black",
						)}
					>
						<Github className="h-4 w-4" />
						<span className="text-sm">github.com/</span>
					</div>
					<Input
						id="github-repo"
						placeholder="username/repository"
						className={clsx(
							"rounded-l-none",
							formErrors.githubRepo &&
								"not-focus:border-red-400 not-focus:*:text-red-400",
						)}
						{...register("githubRepo")}
					/>
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="live-demo">
					Live Demo URL
					{formErrors.liveDemo && <span className="text-red-600">*</span>}
				</Label>
				<div className="flex gap-2 group">
					<div
						className={clsx(
							"flex items-center gap-2 bg-muted px-3 rounded-l-md border-y border-l",
							formErrors.liveDemo &&
								"border-red-400 border-r bg-red-50 text-red-600 group-focus-within:bg-muted group-focus-within:borde-r-0 group-focus-within:border-gray-200 group-focus-within:text-black",
						)}
					>
						<Globe className="h-4 w-4" />
						<span className="text-sm">https://</span>
					</div>
					<Input
						id="live-demo"
						placeholder="your-project-demo.com"
						className={clsx(
							"rounded-l-none",
							formErrors.liveDemo &&
								"not-focus:border-red-400 not-focus:*:text-red-400",
						)}
						{...register("liveDemo")}
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
