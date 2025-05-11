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
} from "@components/ui";

interface Props {
	onPrev: () => void;
	onSubmit: () => void;
}
export const TabFeedback = ({ onPrev, onSubmit }: Props) => {
	return (
		<TabsContent value="feedback" className="mt-6 space-y-6">
			<div className="grid gap-3">
				<Label htmlFor="feedback-areas">Areas for Feedback</Label>
				<Select>
					<SelectTrigger id="feedback-areas">
						<SelectValue placeholder="Select primary area" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ui-ux">UI/UX Design</SelectItem>
						<SelectItem value="code-quality">Code Quality</SelectItem>
						<SelectItem value="performance">Performance</SelectItem>
						<SelectItem value="architecture">Architecture</SelectItem>
						<SelectItem value="accessibility">Accessibility</SelectItem>
						<SelectItem value="security">Security</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="specific-questions">Specific Questions</Label>
				<Textarea
					id="specific-questions"
					placeholder="What specific aspects of your project would you like feedback on?"
					className="min-h-[120px]"
				/>
				<p className="text-xs text-muted-foreground">
					Providing specific questions will help reviewers give you more
					targeted feedback
				</p>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="experience-level">Your Experience Level</Label>
				<Select>
					<SelectTrigger id="experience-level">
						<SelectValue placeholder="Select your experience level" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
						<SelectItem value="intermediate">
							Intermediate (1-3 years)
						</SelectItem>
						<SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
						<SelectItem value="expert">Expert (5+ years)</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={onPrev}>
					Previous: Media & Links
				</Button>
				<Button onClick={onSubmit}>Submit Project</Button>
			</div>
		</TabsContent>
	);
};
