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

import { CATEGORIES } from "@features/submit/constants/project-creation.constant";
import { useFormContext } from "@features/submit/context/FormContext";
import clsx from "clsx";
import { TagsSelect } from "./TagsSelect";

interface Props {
	onNext: () => void;
}
export const TabDetails = ({ onNext }: Props) => {
	const { register, formErrors } = useFormContext();

	const categories = CATEGORIES;

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
						<p className="text-sm pl-2 text-red-400 mt-0">
							{formErrors.title.replace("String", "Title")}
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-category">
					Category
					{formErrors.category && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Select {...register("category", { role: "select" })}>
						<SelectTrigger
							id="project-category"
							className={
								formErrors.category &&
								"not-focus:border-red-400 not-focus:*:text-red-400"
							}
						>
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

					{formErrors.category && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{formErrors.category}
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="project-description">
					Description
					{formErrors.description && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Textarea
						id="project-description"
						placeholder="Provide a brief overview of your project..."
						className={clsx(
							"min-h-[120px]",
							formErrors.description &&
								"not-focus:border-red-400 not-focus:text-red-600 not-focus:placeholder:text-red-300",
						)}
						{...register("description")}
					/>
					{formErrors.description && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{formErrors.description.replace("String", "Description")}
						</p>
					)}
				</div>
			</div>

			<TagsSelect />

			<div className="flex justify-end">
				<Button onClick={onNext}>Next: Media & Links</Button>
			</div>
		</TabsContent>
	);
};
