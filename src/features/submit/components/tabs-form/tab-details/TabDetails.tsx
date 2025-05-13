import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	TabsContent,
	Textarea,
} from "@components/ui";

import { useFormContext } from "@features/submit/context/FormContext";
import clsx from "clsx";
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
	const { register, formErrors } = useFormContext();

	return (
		<TabsContent value="details" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label htmlFor="project-title">
					Project Title
					{formErrors.title && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Input
						id="project-title"
						placeholder="e.g., TaskFlow - Project Management App"
						className={
							formErrors.title &&
							"not-focus:border-red-400 not-focus:text-red-600 not-focus:placeholder:text-red-300"
						}
						{...register("title")}
					/>
					{formErrors.title && (
						<p className="text-sm pl-2 text-red-400 mt-0">{formErrors.title}</p>
					)}
				</div>
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
