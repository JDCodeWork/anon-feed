import { useEffect, useState } from "react";

interface Props {
	maxTags?: number;
	handleChange: (tags: string[]) => void;
}

export function useTags({ handleChange, maxTags = 5 }: Props) {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const addTag = (tag: string) => {
		if (!selectedTags.includes(tag) && selectedTags.length < maxTags) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const removeTag = (tag: string) => {
		setSelectedTags(selectedTags.filter((t) => t !== tag));
	};

	useEffect(() => {
		handleChange(selectedTags);
	}, [selectedTags]);

	return { selectedTags, addTag, removeTag };
}
