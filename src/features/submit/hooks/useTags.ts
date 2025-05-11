import { useState } from "react";

export function useTags(maxTags = 5) {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const addTag = (tag: string) => {
		if (!selectedTags.includes(tag) && selectedTags.length < maxTags) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const removeTag = (tag: string) => {
		setSelectedTags(selectedTags.filter((t) => t !== tag));
	};

	return { selectedTags, addTag, removeTag };
}
