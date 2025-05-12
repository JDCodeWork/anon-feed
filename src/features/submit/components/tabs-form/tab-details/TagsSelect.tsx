import { Badge, Label } from "@components/ui";
import { useFormContext } from "@features/submit/context/FormContext";
import { useTags } from "@features/submit/hooks/useTags";
import { X } from "lucide-react";

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

export const TagsSelect = () => {
	const { setFormValue } = useFormContext();

	const { addTag, removeTag, selectedTags } = useTags({
		handleChange: (tags) => setFormValue("tags", tags),
	});

	return (
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
	);
};
