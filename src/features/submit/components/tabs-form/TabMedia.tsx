import { Github, Globe } from "lucide-react";

import { Button, Input, Label, TabsContent } from "@components/ui";
import { useFormContext } from "@features/submit/context/FormContext";
import { ProjectScreenshots } from "./tab-details/project-screenshots/ProjectScreenshots";

interface Props {
	onPrev: () => void;
	onNext: () => void;
}
export const TabMedia = ({ onPrev, onNext }: Props) => {
	const { register } = useFormContext();

	return (
		<TabsContent value="media" className="mt-6 space-y-6">
			<ProjectScreenshots />

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
						{...register("githubRepo")}
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
