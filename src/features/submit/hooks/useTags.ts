import { useState } from "react";

interface Props {
	maxTags?: number;
	initialValues?: string[];
	handleChange: (tags: string[]) => void;
}

export function useTags({
	handleChange,
	maxTags = 5,
	initialValues = [],
}: Props) {
	const [selectedTags, setSelectedTags] = useState<string[]>(initialValues);

	const addTag = (tag: string) => {
		if (!selectedTags.includes(tag) && selectedTags.length < maxTags) {
			const newTags = [...selectedTags, tag];

			setSelectedTags(newTags);
			handleChange(newTags);
		}
	};

	const removeTag = (tag: string) => {
		const newTags = selectedTags.filter((t) => t !== tag);

		setSelectedTags(newTags);
		handleChange(newTags);
	};

	return { selectedTags, addTag, removeTag };
}
