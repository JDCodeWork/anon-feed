import { Badge, Label } from "@components/ui";
import { TAGS } from "@features/submit/constants/project-creation.constant";
import { useFormContext } from "@features/submit/context/FormContext";
import { useTags } from "@features/submit/hooks/useTags";
import { X } from "lucide-react";

export const TagsSelect = () => {
	const { formValues, setFormValue, formErrors, removeFormError } =
		useFormContext();

	const handleChange = (tags: string[]) => {
		tags.length > 0 && formErrors.tags && removeFormError("tags");
		setFormValue("tags", tags);
	};

	const { addTag, removeTag, selectedTags } = useTags({
		handleChange,
		initialValues: formValues.tags,
	});

	const tags = TAGS;

	return (
		<div className="grid gap-3">
			<div className="flex items-center justify-between">
				<Label>
					Tags
					{formErrors.tags && <span className="text-red-600">*</span>}
				</Label>
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
			{formErrors.tags && (
				<p className="text-sm pl-2 text-red-400 mt-0">
					{formErrors.tags.replace("Array", "Tags")}
				</p>
			)}
		</div>
	);
};
