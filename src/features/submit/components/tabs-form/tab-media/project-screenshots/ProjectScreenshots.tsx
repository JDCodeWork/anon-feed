import { Label } from "@components/ui";
import { ImageDropzone } from "./ImageDropzone";
import { ImageSlider } from "./ImageSlider";

export const ProjectScreenshots = () => {
	return (
		<div className="grid gap-3">
			<Label>Project Screenshots</Label>
			<ImageDropzone />
			<ImageSlider />
		</div>
	);
};
