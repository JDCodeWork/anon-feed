import { X } from "lucide-react";
import { useState } from "react";

import { Badge, Input, Label } from "@shared/components/ui";
import { sanitizeTag } from "../utils/sanitize-tag";

interface Props {
	hasError?: boolean;
	initialValues?: string[];
}
export const TagSelector = ({ hasError, initialValues }: Props) => {
	const [selectedTags, setSelectedTags] = useState<string[]>(
		initialValues || [],
	);
	const [inputValue, setInputValue] = useState("");

	const removeTag = (tag: string) => {
		setSelectedTags((prev) => prev.filter((t) => t !== tag));
	};
	const addTag = (tag: string) => {
		const tagSanitized = sanitizeTag(tag);

		if (
			tagSanitized.length == 0 ||
			selectedTags.includes(tagSanitized) ||
			selectedTags.length >= 5
		)
			return;

		setSelectedTags((prev) => [...prev, tagSanitized]);
	};

	const handleAddTag = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			inputValue.trim() &&
			!selectedTags.includes(inputValue.trim()) &&
			selectedTags.length < 5
		) {
			addTag(inputValue.trim());
			setInputValue("");
		}
	};

	return (
		<div className="grid gap-3">
			<div className="flex items-center justify-between">
				<Label>
					Tags
					{hasError && <span className="text-red-600">*</span>}
				</Label>
				<span className="text-xs text-muted-foreground">
					{selectedTags?.length ?? 0}/5
				</span>
			</div>
			<Input
				placeholder="Add a tag and press Enter"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleAddTag(e);
					}
				}}
			/>
			<input type="hidden" name="tags" value={selectedTags.join(",")} />
			<div className="flex flex-wrap gap-2 mb-1">
				{selectedTags?.map((tag: string) => (
					<Badge
						key={tag}
						className="gap-2 py-2 bg-secondary text-secondary-foreground"
					>
						<button onClick={() => removeTag(tag)}>
							<X className="size-3 text-secondary-foreground/75 hover:text-red-600" />
							<span className="sr-only">Remove {tag}</span>
						</button>
						<span className="mr-1">{tag}</span>
					</Badge>
				))}
			</div>
		</div>
	);
};
