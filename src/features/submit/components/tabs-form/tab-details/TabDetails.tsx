import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { TabsContent } from "@components/ui/tabs";
import { Textarea } from "@components/ui/textarea";
import { useTags } from "@features/submit/hooks/useTags";
import type { ProjectForm } from "@features/submit/interfaces/project-feed-info.interface";
import { X } from "lucide-react";

type ProjectCategories = {
	value: string;
	label: string;
};

const categories: ProjectCategories[] = [
	{ value: "web", label: "Web Application" },
	{ value: "mobile", label: "Mobile App" },
	{ value: "desktop", label: "Desktop App" },
	{ value: "library", label: "Library/Package" },
	{ value: "tool", label: "Developer Tool" },
	{ value: "other", label: "Other" },
];

const tags = [
	"React",
	"TypeScript",
	"Node.js",
	"Next.js",
	"Tailwind CSS",
	"GraphQL",
	"MongoDB",
	"PostgreSQL",
];

interface Props {
	formValues: ProjectForm;
	onChange: (e: any) => void;
	onNext: () => void;
}
export const TabDetails = ({ onNext, onChange, formValues }: Props) => {
	const { addTag, removeTag, selectedTags } = useTags({
		handleChange: (tags) => onChange({ target: { name: "tags", value: tags } }),
	});

	return (
		<TabsContent value="details" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label htmlFor="project-title">Project Title</Label>
				<Input
					id="project-title"
					placeholder="e.g., TaskFlow - Project Management App"
					name="title"
					value={formValues.title}
					onChange={onChange}
				/>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-category">Category</Label>
				<Select
					value={formValues.category}
					onValueChange={(value) =>
						onChange({ target: { name: "category", value } })
					}
				>
					<SelectTrigger id="project-category">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						{categories.map(({ value, label }) => (
							<SelectItem value={value}>{label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-description">Description</Label>
				<Textarea
					id="project-description"
					placeholder="Provide a brief overview of your project..."
					className="min-h-[120px]"
					name="description"
					value={formValues.description}
					onChange={onChange}
				/>
			</div>

			<div className="grid gap-3">
				<div className="flex items-center justify-between">
					<Label>Tags</Label>
					<span className="text-xs text-muted-foreground">
						{selectedTags.length}/5
					</span>
				</div>
				<div className="flex flex-wrap gap-2 mb-2">
					{selectedTags.map((tag) => (
						<Badge key={tag} className="gap-1">
							{tag}
							<button onClick={() => removeTag(tag)}>
								<X className="h-3 w-3" />
								<span className="sr-only">Remove {tag}</span>
							</button>
						</Badge>
					))}
				</div>
				<div className="flex flex-wrap gap-2">
					{tags
						.filter((t) => !selectedTags.includes(t))
						.map((tag) => (
							<Badge
								key={tag}
								variant="outline"
								className="cursor-pointer hover:bg-secondary"
								onClick={() => addTag(tag)}
							>
								{tag}
							</Badge>
						))}
				</div>
			</div>

			<div className="flex justify-end">
				<Button onClick={onNext}>Next: Media & Links</Button>
			</div>
		</TabsContent>
	);
};
