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
import { useFormContext } from "@features/submit/context/FormContext";
import { TagsSelect } from "./TagsSelect";

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

interface Props {
	onNext: () => void;
}
export const TabDetails = ({ onNext }: Props) => {
	const { register } = useFormContext();

	return (
		<TabsContent value="details" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label htmlFor="project-title">Project Title</Label>
				<Input
					id="project-title"
					placeholder="e.g., TaskFlow - Project Management App"
					{...register("title")}
				/>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-category">Category</Label>
				<Select {...register("category", { role: "select" })}>
					<SelectTrigger id="project-category">
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
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-description">Description</Label>
				<Textarea
					id="project-description"
					placeholder="Provide a brief overview of your project..."
					className="min-h-[120px]"
					{...register("description")}
				/>
			</div>

			<TagsSelect />

			<div className="flex justify-end">
				<Button onClick={onNext}>Next: Media & Links</Button>
			</div>
		</TabsContent>
	);
};
