import { Label } from "@components/ui";
import { useFormContext } from "@features/submit/context/FormContext";
import { ImageDropzone } from "./ImageDropzone";
import { ImageSlider } from "./ImageSlider";

export const ProjectScreenshots = () => {
	const { formErrors } = useFormContext();

	return (
		<div className="grid gap-3">
			<Label>
				Project Screenshots
				{formErrors.screenshots && <span className="text-red-600">*</span>}
			</Label>
			<ImageDropzone />
			<ImageSlider />
		</div>
	);
};
