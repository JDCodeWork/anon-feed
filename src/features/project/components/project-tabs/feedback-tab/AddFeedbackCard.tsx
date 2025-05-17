import { FEEDBACK_AREAS } from "@features/submit/constants/project-creation.constant";
import { useForm } from "@features/submit/hooks/useForm";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@shared/components/ui";
import { useState } from "react";
import { toast } from "sonner";

export const AddFeedbackCard = () => {
	const feedbackAreas = FEEDBACK_AREAS;

	const [message, setMessage] = useState("");
	const [feedbackArea, setFeedbackArea] = useState<string | undefined>();

	const onSubmit = () => {
		if (message.length < 6 || feedbackArea === undefined) {
			toast.error("Some of the fields are incomplete or wrong");
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">Add Your Feedback</CardTitle>
				<CardDescription>
					Your feedback will be visible to the project creator and other users
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea
					placeholder="Share your thoughts, suggestions, or questions about this project..."
					className="min-h-[120px]"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Select value={feedbackArea} onValueChange={(v) => setFeedbackArea(v)}>
					<SelectTrigger>
						<SelectValue placeholder="Select a feedback area" />
					</SelectTrigger>
					<SelectContent>
						{feedbackAreas.map(({ value, label }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button onClick={onSubmit}>Submit Feedback</Button>
			</CardFooter>
		</Card>
	);
};
