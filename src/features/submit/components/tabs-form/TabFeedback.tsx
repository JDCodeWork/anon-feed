import {
	EXPERIENCE_LEVEL,
	FEEDBACK_AREAS,
} from "@features/submit/constants/project-creation.constant";
import { useFormContext } from "@features/submit/context/FormContext";
import {
	Button,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	TabsContent,
	Textarea,
} from "@shared/components/ui";
import clsx from "clsx";

interface Props {
	onPrev: () => void;
}
export const TabFeedback = ({ onPrev }: Props) => {
	const { handleSubmit, register, formErrors } = useFormContext();

	const feedbackAreas = FEEDBACK_AREAS;

	return (
		<TabsContent value="feedback" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label htmlFor="feedback-areas">
					Areas for Feedback
					{formErrors.feedbackArea && <span className="text-red-600">*</span>}
				</Label>
				<div className="">
					<Select {...register("feedbackArea", { role: "select" })}>
						<SelectTrigger
							className={
								formErrors.feedbackArea &&
								"not-focus:border-red-400 not-focus:*:text-red-400"
							}
						>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{feedbackAreas.map(({ value, label }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{formErrors.feedbackArea && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{formErrors.feedbackArea}
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="specific-questions">
					Specific Questions
					{formErrors.specificQuestions && (
						<span className="text-red-600">*</span>
					)}
				</Label>
				<Textarea
					id="specific-questions"
					placeholder="What specific aspects of your project would you like feedback on?"
					className={clsx(
						"min-h-[120px]",
						formErrors.specificQuestions &&
							"not-focus:border-red-400 not-focus:text-red-600 not-focus:placeholder:text-red-300",
					)}
					{...register("specificQuestions")}
				/>
				{formErrors.specificQuestions && (
					<p className="text-sm pl-2 text-red-400 mt-0">
						{formErrors.specificQuestions.replace(
							"String",
							"Specific questions",
						)}
					</p>
				)}
				<p className="text-xs text-muted-foreground">
					Providing specific questions will help reviewers give you more
					targeted feedback
				</p>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="experience-level">
					Your Experience Level
					{formErrors.experienceLevel && (
						<span className="text-red-600">*</span>
					)}
				</Label>
				<div className="">
					<Select {...register("experienceLevel", { role: "select" })}>
						<SelectTrigger
							className={
								formErrors.experienceLevel &&
								"not-focus:border-red-400 not-focus:*:text-red-400"
							}
						>
							<SelectValue placeholder="Select your experience level" />
						</SelectTrigger>
						<SelectContent>
							{EXPERIENCE_LEVEL.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{formErrors.feedbackArea && (
						<p className="text-sm pl-2 text-red-400 mt-0">
							{formErrors.feedbackArea}
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={onPrev}>
					Previous: Media & Links
				</Button>

				<Button onClick={handleSubmit}>Submit Project</Button>
			</div>
		</TabsContent>
	);
};
