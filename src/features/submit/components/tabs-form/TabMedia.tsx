import { Button, Input, Label, TabsContent } from "@components/ui";
import { Github, Globe, Upload } from "lucide-react";

interface Props {
	onPrev: () => void;
	onNext: () => void;
}
export const TabMedia = ({ onPrev, onNext }: Props) => {
	return (
		<TabsContent value="media" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label>Project Screenshots</Label>
				<div className="border-2 border-dashed rounded-lg p-8 text-center">
					<div className="flex flex-col items-center gap-2">
						<Upload className="h-8 w-8 text-muted-foreground" />
						<h3 className="font-medium">
							Drag & drop files or click to upload
						</h3>
						<p className="text-sm text-muted-foreground">
							Upload up to 5 images (PNG, JPG, WebP)
						</p>
						<Button variant="outline" size="sm" className="mt-2">
							Select Files
						</Button>
					</div>
				</div>
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
